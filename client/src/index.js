import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import reducers from "./reducers";
import { Provider } from "react-redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from "redux-promise-middleware";
import axios from 'axios';
const middleware = applyMiddleware(thunk,logger, promiseMiddleware());
const store = createStore(reducers, middleware);

store.dispatch({
    type:"FETCH_LANGUAGE",
    payload: axios.get('http://localhost:3000/api/languages')
})

ReactDOM.render(  
    <Provider store={store}>  
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </Provider>   
, document.getElementById('root'));
registerServiceWorker();
