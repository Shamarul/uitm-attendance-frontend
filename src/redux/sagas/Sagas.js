import {
    /*---- Saga ---*/
    INITIALISING,
    /*---- InitReducer ----*/
    UPDATE_PARTICIPANTS,
    SEARCH_PARTICIPANT,
    LOGIN,
    GLOBAL_LOAD,
    LOGIN_SUCCESS,
    INFO_SUCCESS,
    GET_INFO,
    CHECK_OUT,
    CHECKING_OUT,
    CHECKOUT_SUCCESS,
} from '../ducks/actions/ActionTypes';
import {eventChannel, END} from 'redux-saga';
import {
  takeEvery,
  put,
  all,
  take,
  call,
  select,
  takeLatest,
  takeLeading,
  cancelled,
  delay
} from 'redux-saga/effects';
import * as selectors from '../Selectors';
import Services from '../../services/Services';
import {_login, _getParticipant, _getInfo, _checkout} from '../../services/init/InitServices'
import { toast } from 'react-toastify';

/*---- Auth ----*/
function* logout() {

}

function* initiate(params) {
    console.log('Saga is here')
}

function* searchParticipant(params) {
    let props = {};
    let dataBody = {};
    try {
        params.setIsLoading(true)
        let response
        props.name = params.name;
        /*---- Get Profiling Questions-----*/
        yield delay(600);
        response = yield Services('GET', _getParticipant, props, dataBody);
        console.log(response);
        const autoCompleteObj = response.participants.map((data) => {
            return {
              value: data.name,
              uid: data.uid,
            };
          })


        yield put({type: UPDATE_PARTICIPANTS, participants: autoCompleteObj})

        if(autoCompleteObj) {
            let filtered = autoCompleteObj.filter(
              obj =>
                obj.value
                  .toString()
                  .toLowerCase()
                  .includes(params.name.toLowerCase())
            );
            if(params.name.toLowerCase() === filtered[0]?.value.toLowerCase()) {
              params.setUid(filtered[0].uid);
            } else {
              params.setUid('');
            }
            params.setOptions(filtered);
          }

          params.setIsLoading(false)
    } catch(err) {
        console.log('err', err);
        // alert('Something went wrong. please close or refresh the browser and try again..')
        // document.location.href = decoded.failUrl;
    }
}

function* login(params) {
    yield put({type: GLOBAL_LOAD, globalLoad: true})
    const id = toast.loading("Please wait...");
    let props = {};
    let dataBody = {};
    try {
        let response
        dataBody.uid = params.uid;
        dataBody.key = params.password;
        /*---- Login -----*/
        response = yield Services('POST', _login, props, dataBody);
        
        if(response.httpstatus === 200) {
            yield localStorage.setItem('token', response.accessToken);
            yield put({type: LOGIN_SUCCESS, loginData: response.accessToken})
            yield getInfo();
            yield params.navigate("/dashboard");
            toast.update(id, { render: "Login Success", type: "success", isLoading: false, autoClose: 3000, closeButton: true });
        } else {
            toast.update(id, { render: "Login Failed", type: "error", isLoading: false, autoClose: 3000, closeButton: true });
        }
    } catch(err) {
        console.log('err', err);
        toast.update(id, { render: "Server Error(Check your internet)", type: "error", isLoading: false, closeButton: true });
        // alert('Something went wrong. please close or refresh the browser and try again..')
    }
    yield put({type: GLOBAL_LOAD, globalLoad: false})
}

function* getInfo() {
    let response
    let props = {};
    let dataBody = {};
    response = yield Services('GET', _getInfo, props, dataBody);
    yield put({type: INFO_SUCCESS, infoData: response.participant})
}

function sameOrigin(uri1, uri2=false){
    if(!uri2) uri2 = window.location.href;
    uri1 = new URL(uri1);
    uri2 = new URL(uri2);
    if(uri1.host !== uri2.host) return false;
    if(uri1.port !== uri2.port) return false;
    if(uri1.protocol !== uri2.protocol) return false;
    return true;
  }
  
function checkOut(params) {
    const id = toast.loading("Please wait...");

    if(sameOrigin(params?.result?.text)) {
        window.open(params?.result?.text, "_self");
    } else {
        toast.update(id, { render: "Not a valid QR Code", type: "error", isLoading: false, autoClose: 3000, closeButton: true });
    }
}

function* checkingOut(params) {
    const id = toast.loading("Checking out...");
    let response
    let props = {};
    let dataBody = {};
    dataBody.id = params.id
    response = yield Services('POST', _checkout, props, dataBody);
    console.log(response);
    if(response.httpstatus === 200) {
        // yield put({type: LOGIN_SUCCESS, infoData: response.participant})
        toast.update(id, { render: "Checkout successed", type: "success", isLoading: false, autoClose: 3000, closeButton: true });
        yield getInfo();
    } else {
        if(response?.error) {
            toast.update(id, { render: response?.error, type: "error", isLoading: false, autoClose: 3000, closeButton: true });
        } else {
            toast.update(id, { render: "Checkout failed", type: "error", isLoading: false, autoClose: 3000, closeButton: true });
        }
    }

    yield delay(600);

    window.history.replaceState({}, document.title, "/" , window.location.href+'/dashboard');
}
  
function* actionWatcher() {
    try {
      yield takeLeading(INITIALISING, initiate);
      yield takeLatest(SEARCH_PARTICIPANT, searchParticipant);
      yield takeLeading(LOGIN, login);
      yield takeLeading(GET_INFO, getInfo);
      yield takeLeading(CHECK_OUT, checkOut);
      yield takeLeading(CHECKING_OUT, checkingOut);
    } catch (err) {
      console.log('actionWatcher error: ', err);
      logout();
    }
}
  
export default function* mySaga() {
    yield all([actionWatcher()]);
}