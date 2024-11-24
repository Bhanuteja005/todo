import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    let errorMessage = "Failed to sign up";
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email already exists';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      default:
        errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error('Invalid email or password');
  }
};

export const logOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return Promise.resolve();
};