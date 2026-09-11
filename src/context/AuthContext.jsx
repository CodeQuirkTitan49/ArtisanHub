import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { auth, db, isFirebaseConfigured } from '@/config/firebase';

const AuthContext = createContext(null);

async function fetchUserProfile(uid, attempts = 4) {
  let lastError = null;

  for (let i = 0; i < attempts; i += 1) {
    try {
      const snapshot = await getDoc(doc(db, 'users', uid));
      if (snapshot.exists()) {
        return { uid, ...snapshot.data() };
      }
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 250 * (i + 1)));
  }

  if (lastError) {
    throw lastError;
  }

  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authError, setAuthError] = useState(null);
  const signingUp = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthError(null);

      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setInitializing(false);
        return;
      }

      setUser(firebaseUser);

      if (signingUp.current) {
        return;
      }

      try {
        const nextProfile = await fetchUserProfile(firebaseUser.uid);
        setProfile(nextProfile);
      } catch (error) {
        setProfile(null);
        setAuthError(error?.message ?? 'Could not load your profile.');
      } finally {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      role: profile?.role ?? null,
      initializing,
      authError,
      isConfigured: isFirebaseConfigured(),
      signUp: async ({ name, email, password, role }) => {
        if (!isFirebaseConfigured()) {
          throw new Error('Add your Firebase keys to a .env file before signing up.');
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        signingUp.current = true;

        try {
          const credential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);

          await setDoc(doc(db, 'users', credential.user.uid), {
            name: trimmedName,
            email: trimmedEmail,
            role,
            createdAt: serverTimestamp(),
          });

          await updateProfile(credential.user, { displayName: trimmedName });

          const nextProfile = {
            uid: credential.user.uid,
            name: trimmedName,
            email: trimmedEmail,
            role,
          };

          setUser(credential.user);
          setProfile(nextProfile);
          setInitializing(false);
          return nextProfile;
        } catch (error) {
          setInitializing(false);
          throw error;
        } finally {
          signingUp.current = false;
        }
      },
      login: async ({ email, password }) => {
        if (!isFirebaseConfigured()) {
          throw new Error('Add your Firebase keys to a .env file before logging in.');
        }

        const credential = await signInWithEmailAndPassword(
          auth,
          email.trim().toLowerCase(),
          password,
        );
        const nextProfile = await fetchUserProfile(credential.user.uid);

        if (!nextProfile?.role) {
          await signOut(auth);
          throw new Error('No marketplace profile found for this account.');
        }

        setUser(credential.user);
        setProfile(nextProfile);
        return nextProfile;
      },
      logout: () => signOut(auth),
    }),
    [authError, initializing, profile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
