import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

//reducers
import AlertReducer from './store/reducers/alert'
import AuthReducer from './store/reducers/auth'
import BranchReducer from './store/reducers/branch'
import AdminReducer from './store/reducers/admin'

import App from './App';

const rootReducer = combineReducers({
  alert: AlertReducer,
  auth: AuthReducer,
  branch: BranchReducer,
  admin: AdminReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);
