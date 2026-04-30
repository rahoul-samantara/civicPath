import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// ── Auth Helpers ────────────────────────────────────────────────────────
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// ── Firestore Helpers ───────────────────────────────────────────────────
export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

import type { User } from '../types';

export const saveUserProfile = async (uid: string, profileData: Partial<User>) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { ...profileData, updatedAt: new Date().toISOString() }, { merge: true });
};

export const getMilestones = async (uid: string) => {
  const milestonesRef = collection(db, 'milestones');
  const q = query(milestonesRef, where('userId', '==', uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateMilestoneStatus = async (milestoneId: string, status: string) => {
  const milestoneRef = doc(db, 'milestones', milestoneId);
  await updateDoc(milestoneRef, { status, updatedAt: new Date().toISOString() });
};
