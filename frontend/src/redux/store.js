import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { thunk } from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers.js/authReducer';
import courseReducer from './reducers.js/courseReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;