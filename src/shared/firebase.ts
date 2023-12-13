import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUSKET,
  messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
  appId: env.VITE_APP_ID,
  measurementId: env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function registerWithEmailAndPassword(name: string, email: string, password: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email,
  });
}

export async function logInWithEmailAndPassword(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export function logout() {
  signOut(auth);
}
