import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

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
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function logInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
}

export async function registerWithEmailAndPassword(
  name: string,
  email: string,
  password: string
) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
}

export function logout() {
  signOut(auth);
}
