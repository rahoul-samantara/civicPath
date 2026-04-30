import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, getUserProfile, saveUserProfile } from '../services/firebase';
import type { User, VoterPersona } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updatePersona: (persona: VoterPersona) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        // Fetch or create profile
        let profile = await getUserProfile(fUser.uid);
        if (!profile) {
          const newProfile: Partial<User> = {
            uid: fUser.uid,
            displayName: fUser.displayName || 'Voter',
            email: fUser.email || '',
            photoURL: fUser.photoURL,
            persona: 'first-time',
            readinessScore: 0,
            state: '',
            county: '',
          };
          await saveUserProfile(fUser.uid, newProfile);
          profile = newProfile;
        }
        setUser(profile as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
     const { signInWithGoogle } = await import('../services/firebase');
     await signInWithGoogle();
  };

  const logout = () => auth.signOut();

  const updatePersona = async (persona: VoterPersona) => {
    if (!user) return;
    const updated = { ...user, persona };
    await saveUserProfile(user.uid, updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, login, logout, updatePersona }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
