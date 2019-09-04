import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import Footer from './ui/globalComponent/Footer';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common['Authorization'] = "token";
axios.defaults.headers.post['Content-Type'] = "application/json; charset=utf-8";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
        <Footer />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
