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
  apiKey: "AIzaSyDTuSpdZU2J20nKt1SAlDvzbGrcETMwv2c",
  authDomain: "grownby-takehome-96778.firebaseapp.com",
  projectId: "grownby-takehome-96778",
  storageBucket: "grownby-takehome-96778.appspot.com",
  messagingSenderId: "209861784160",
  appId: "1:209861784160:web:f3d6fea7dae7b4a3e6c905"
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
