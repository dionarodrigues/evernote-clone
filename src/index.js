import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyDdY5NZk-HT-e4nGa9P_L64bLsywBsMqX4",
  authDomain: "evernote-clone-749a8.firebaseapp.com",
  databaseURL: "https://evernote-clone-749a8.firebaseio.com",
  projectId: "evernote-clone-749a8",
  storageBucket: "evernote-clone-749a8.appspot.com",
  messagingSenderId: "67497143951",
  appId: "1:67497143951:web:628d8d5a5bf587bc"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
