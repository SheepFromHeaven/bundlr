import React from 'react';
import { withFirestore } from 'react-redux-firebase';
import firebase from 'firebase';

const getCurrentUser = () => {
  const currentUser = firebase.auth().currentUser;
  return currentUser ? currentUser.uid : '';
}

const Bundles = (props) => {
  const sampleBundle = {
    ownerId: getCurrentUser(),
    title: 'react',
    links: []
  }
  const pushSample = () => props.fb.push('bundles', sampleBundle)
  return (
    <div>
      <h1>Todos</h1>
      <ul>

      </ul>
      <input type="text" ref="newTodo" />
      <button onClick={pushSample}>
        Add
      </button>
    </div>
  )
}

export default withFirestore(Bundles)
