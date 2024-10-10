'use client'
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  AuthError,
  Persistence
} from 'firebase/auth';
import { auth } from '@/lib/auth/firebase';

const getDefaultPersistence = (): Persistence => {
  // return process.env.NEXT_PUBLIC_DEFAULT_AUTH_PERSISTENCE === 'local'
  //   ? browserLocalPersistence
  //   : browserSessionPersistence;
  return browserLocalPersistence
};

const authenticateUser = async (
  email: string,
  password: string,
  persistenceType: Persistence,
  authFunction: typeof signInWithEmailAndPassword | typeof createUserWithEmailAndPassword
) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    await setPersistence(auth, persistenceType);
    return await authFunction(auth, email, password);
  } catch (error) {
    const authError = error as AuthError;
    console.error('Authentication Error:', authError.code, authError.message);
    throw authError;
  }
};

export const signInUser = async (
  email: string, 
  password: string,
  rememberMe?: boolean
) => {
  const persistenceType = rememberMe !== undefined
    ? (rememberMe ? browserLocalPersistence : browserSessionPersistence)
    : getDefaultPersistence();
  const userCredential = await authenticateUser(email, password, persistenceType, signInWithEmailAndPassword);
  localStorage.setItem("authUser", JSON.stringify(userCredential.user));
  return userCredential;
};

export const signUpUser = async (
  email: string, 
  password: string,
  rememberMe?: boolean
) => {
  const persistenceType = rememberMe !== undefined
    ? (rememberMe ? browserLocalPersistence : browserSessionPersistence)
    : getDefaultPersistence();
  return authenticateUser(email, password, persistenceType, createUserWithEmailAndPassword);
};

export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};