import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyBflAsWjkuzhgcgQZ2GPJvb7W0fOanXEg4',
  authDomain: 'grownby-takehome.firebaseapp.com',
  projectId: 'grownby-takehome',
  storageBucket: 'grownby-takehome.appspot.com',
  messagingSenderId: '572181010002',
  appId: '1:572181010002:web:8e9d6d45b052bdac5af18b',
};

const app = initializeApp(fbConfig);

attachCustomCommands({ app, Cypress, cy, firebase });
