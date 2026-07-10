"use client";

import { create } from "zustand";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  AuthError,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

function getFirebaseErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed. Please try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return error.message || "An unexpected error occurred.";
  }
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearError: () => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, displayName: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
}

export const useAuth = create<AuthStore>()((set) => ({
  user: null,
  loading: false,
  initialized: false,
  error: null,

  setUser: (user) => set({ user }),
  setInitialized: (initialized) => set({ initialized }),
  clearError: () => set({ error: null }),

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      set({ loading: false });
      return true;
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      set({ loading: false, error: message });
      return false;
    }
  },

  signUp: async (email, password, displayName) => {
    set({ loading: true, error: null });
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName });
      set({ loading: false });
      return true;
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      set({ loading: false, error: message });
      return false;
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      await signInWithPopup(auth, googleProvider);
      set({ loading: false });
      return true;
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      set({ loading: false, error: message });
      return false;
    }
  },

  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },

  resetPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      await sendPasswordResetEmail(auth, email);
      set({ loading: false });
      return true;
    } catch (err) {
      const message = getFirebaseErrorMessage(err as AuthError);
      set({ loading: false, error: message });
      return false;
    }
  },
}));

export function initAuthListener(onUser?: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    useAuth.getState().setUser(user);
    useAuth.getState().setInitialized(true);
    onUser?.(user);
  });
}
