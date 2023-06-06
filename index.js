
// created actions types 
export const LOGIN_USER_REQ = 'LOGIN_USER_REQ';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILIER = 'LOGIN_USER_FAILIER';
export const USER_REQ = 'USER_REQ';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILIER = 'USER_FAILIER';


// define actions 
// Login \
import {
    LOGIN_USER_FAILIER,
    LOGIN_USER_REQ,
    LOGIN_USER_SUCCESS,
    LOGOUT,
  } from '../Actionstypes';
  
  export const loginreq = payload => {
    return {
      data: payload,
      type: LOGIN_USER_REQ,
    };
  };
  export const loginsuccess = payload => {
    return {
      data: payload,
      type: LOGIN_USER_SUCCESS,
    };
  };
  export const loginfailier = payload => {
    return {
      data: payload,
      type: LOGIN_USER_FAILIER,
    };
  };

//   signup 
import {LOGOUT, USER_FAILIER, USER_REQ, USER_SUCCESS} from '../Actionstypes';

export const signinnreq = payload => {
  return {
    data: payload,
    type: USER_REQ,
  };
};
export const signinsuccess = payload => {
  return {
    data: payload,
    type: USER_SUCCESS,
  };
};
export const signinfail = payload => {
  return {
    data: payload,
    type: USER_FAILIER,
  };
};
 

// create reducers 
// login reducers 
import * as types from '../Actionstypes/index';
const initialState = {
  isFetching: false,
  isError: null,
  data: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQ:
      return {
        data: state,
        isFetching: true,
      };
    case types.LOGIN_USER_SUCCESS:
      console.log(action.type);
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };

    case types.LOGIN_USER_FAILIER:
      return {
        isFetching: false,
      };

    default:
      return state;
  }
};
// signup reducers 
import * as types from '../Actionstypes/index';
const initialState = {
  isFetching: false,
  isError: null,
  data: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_REQ:
      return {
        data: state,
        isFetching: true,
      };
    case types.USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };

    case types.USER_FAILIER:
      return {
        isFetching: false,
        isError: actions.err,
      };

    default:
      return state;
  }
};
//  complete store setup with redux ,redux-thunk ,redux-persist, redux-logger,AsyncStorage,Flatted 
import {combineReducers} from 'redux';
import Login from './Login';
import Signup from './Signup';
const rootReducer = combineReducers({
  Login,
  Signup,
});
export default rootReducer;
///
import {createStore, applyMiddleware} from 'redux';
import createThunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './Reducers/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flatted from 'flatted';
export const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState),
);

const loggerMiddleWare = createLogger();
const reducers = rootReducer;

const ThunkMiddleware = createThunkMiddleware;
const middlewares = [ThunkMiddleware];

middlewares.push(loggerMiddleWare);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['firebase'],
  transforms: [transformCircular],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const createStoreWithMiddleware = applyMiddleware(...middlewares);
export const store = createStore(persistedReducer, createStoreWithMiddleware);
export const configureStore = () => {
  return store;
};
export const presistor = persistStore(store);
