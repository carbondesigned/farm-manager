import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBflAsWjkuzhgcgQZ2GPJvb7W0fOanXEg4',
  authDomain: 'grownby-takehome.firebaseapp.com',
  projectId: 'grownby-takehome',
  storageBucket: 'grownby-takehome.appspot.com',
  messagingSenderId: '572181010002',
  appId: '1:572181010002:web:8e9d6d45b052bdac5af18b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

export async function signUp(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email: string, password: string) {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function signOutUtil() {
  signOut(auth);
}
