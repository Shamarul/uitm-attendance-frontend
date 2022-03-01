import {
    UPDATE_PARTICIPANTS,
    LOGIN_SUCCESS,
    GLOBAL_LOAD,
    INFO_SUCCESS,
  } from '../actions/ActionTypes';
  
  const initialState = {
    participants: null,
    loginData: null,
    globalLoad: false,
    infoData: null,
  };
  
const InitReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PARTICIPANTS:
        return {
          ...state,
          participants: action.participants,
        }
      case LOGIN_SUCCESS:
        return {
            ...state,
            loginData: action.loginData,
        }
      case GLOBAL_LOAD:
        return {
            ...state,
            globalLoad: action.globalLoad,
        }
    case INFO_SUCCESS:
        return {
            ...state,
            infoData: action.infoData,
        }
      default:
        return state;
    }
};
  
export default InitReducer;
  