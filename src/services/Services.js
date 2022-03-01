// import {_refreshToken} from './auth/AuthServices';
import { store } from '../index';
// import GetBodyFromToken from '../components/getBodyFromToken';

/*---- Token Refresher ----*/
// async function refresher() {
//   let stringHttpStatus;
//   // console.log('refresher start');
//   const token = sessionStorage.getItem('token');
//   const bodyFromToken = GetBodyFromToken(token);
//   // console.log('bodyFromToken', bodyFromToken);
//   let dataBody = {
//     ref: bodyFromToken.ref,
//   };
//   let body = {};
//   let response = {};
//   let swapToken

//   try {
//       body.method = 'POST';
//       body.body = JSON.stringify(dataBody);
//       body.headers = {
//         'apiToken': token,
//         'Content-Type': 'application/json',
//       };
//       response = await _refreshToken(body);
//       // console.log('resfresh response', response);
//       stringHttpStatus = response?.httpstatus.toString();
//       if (stringHttpStatus.charAt(0) === '2') {
//         swapToken = response.token;
//         sessionStorage.setItem('token', swapToken);
//       } else {
//         // force redirect user back
//         document.location.href = bodyFromToken.failUrl;
//       }
//   } catch (err) {
//     console.log(
//       new Date().toISOString(),
//       '[Services.refresher]',
//       'Error:',
//       err,
//     );
//     response.httpstatus = 400;
//     return response;
//   }
// }

/*---- Attempt ----*/
async function Attempt(method, api, props, dataBody) {
  // console.log('Attempt start')
  const token = localStorage.getItem('token');
  let body = {};
  let response = {};

  try {
    if (method === 'GET') {
      body.method = method;
      body.headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
      response = api(body, props);
      return response;
    } else if (method === 'POST' || method === 'DELETE' || method === 'PUT') {
      body.method = method;
      body.body = JSON.stringify(dataBody);
      body.headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
      response = api(body, props);
      return response;
    } else if (method === 'HANDSHAKE') {
      body.method = 'POST';
      body.body = JSON.stringify(dataBody);
      response = await api(body, props);
      return response;
    } else if (method === 'IO') {
      response = await api(token);
      response.httpstatus = 200;
      // console.log('IO response', response);
      return response;
    } else if (method === 'LOGIN') {
      body.method = 'POST';
      body.body = JSON.stringify(dataBody);
      body.headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
      response = await api(body, props);
      return response;
    } 
  } catch (err) {
    // console.log(new Date().toISOString(), '[Services.Attempt]', 'Error:', err);
    response.error.errorCode = 9;
    return response;
  }
}

/*---- Services ----*/
async function Services(method, api, props, dataBody) {
  let response = {};
  let refreshStatus = {};
  let stringHttpStatus;
  
  try {
    response = await Attempt(method, api, props, dataBody);
    // console.log('first response', response);

    stringHttpStatus = response?.httpstatus.toString();
    if (stringHttpStatus.charAt(0) === '2') {
      return response;
    } else {
        // refreshStatus = await refresher();
        response = await Attempt(method, api, props, dataBody);
        // console.log('second response', response);
        return response;
    }
  } catch (err) {
    console.log(new Date().toISOString(), '[Services]', 'Error:', err);
    response.httpstatus = 400;
    return response;
  }
}

export default Services;
