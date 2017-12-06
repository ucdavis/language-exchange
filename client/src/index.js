import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducers from "./reducers/index";
import { Provider } from "react-redux";

const store = createStore(reducers);

ReactDOM.render(    
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>    
, document.getElementById('root'));
registerServiceWorker();
