import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyAPwLTStBI9g3l815K-f0iaGVhkPMQGtq8",
  authDomain: "bundlr-db.firebaseapp.com",
  databaseURL: "https://bundlr-db.firebaseio.com",
  projectId: "bundlr-db",
  storageBucket: "bundlr-db.appspot.com",
  messagingSenderId: "191696947521"
};

firebase.initializeApp(config);

var initUser = function () {
  return firebase.auth().signInWithEmailAndPassword('marcwissler@gmail.com', '123456').catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    debugger;
  });
};

initUser().then(() => {
  firebase.firestore().collection('bundles').doc('test').set({
    ownerId: firebase.auth().currentUser.uid,
    title: 'another',
    links: []
  })
  firebase.firestore().collection('bundles').where("ownerId", "==", firebase.auth().currentUser.uid).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(firebase.firestore().collection('bundles').doc());

      console.log(doc.id, " => ", doc.data());
    });
  })
});


