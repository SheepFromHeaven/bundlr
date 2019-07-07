import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import Bundles from './Bundles';

const config: any = {
  apiKey: "AIzaSyAPwLTStBI9g3l815K-f0iaGVhkPMQGtq8",
  authDomain: "bundlr-db.firebaseapp.com",
  databaseURL: "https://bundlr-db.firebaseio.com",
  projectId: "bundlr-db",
  storageBucket: "bundlr-db.appspot.com",
  messagingSenderId: "191696947521"
};

firebase.initializeApp(config);
firebase.firestore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}




var initUser = function () {
  return firebase.auth().signInWithEmailAndPassword('marcwissler@gmail.com', '123456').catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    debugger;
  });
};




const App = () =>
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Bundles />
    </ReactReduxFirebaseProvider>
  </Provider>

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
