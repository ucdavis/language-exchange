import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import reducers from "./reducers";
import { Provider } from "react-redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from "redux-promise-middleware";
// Persisting the State to the Local Storage
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(thunk,logger, promiseMiddleware());
const store = createStore(persistedReducer, undefined,middleware );
const persistor = persistStore(store);


ReactDOM.render(  
    <Provider store={store}> 
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PersistGate>    
    </Provider>   
, document.getElementById('root'));
// registerServiceWorker();