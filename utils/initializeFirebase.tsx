import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBflAsWjkuzhgcgQZ2GPJvb7W0fOanXEg4',
  authDomain: 'grownby-takehome.firebaseapp.com',
  projectId: 'grownby-takehome',
  storageBucket: 'grownby-takehome.appspot.com',
  messagingSenderId: '572181010002',
  appId: '1:572181010002:web:8e9d6d45b052bdac5af18b',
};

initializeApp(firebaseConfig);

const auth = getAuth();

export async function signUp(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password);
}
