import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter as Router} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
, document.getElementById('root'));
registerServiceWorker();
