import { initializeApp } from 'firebase/app';
import {
  APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} from '@env';
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
  apiKey: 'AIzaSyAnTViUmOgDrdZ31CBL3AwO2DvvVn3_i7M',
  authDomain: 'grownby-takehome-18273.firebaseapp.com',
  projectId: 'grownby-takehome-18273',
  storageBucket: 'grownby-takehome-18273.appspot.com',
  messagingSenderId: '747948422374',
  appId: '1:747948422374:web:c5816b929f64a1c733f727',
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
