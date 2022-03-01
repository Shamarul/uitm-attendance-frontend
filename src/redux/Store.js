import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import InitReducer from './ducks/reducers/InitReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  init: InitReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(sagaMiddleware));
};

export {sagaMiddleware};
export default configureStore;
