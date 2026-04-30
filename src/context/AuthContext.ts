import { createContext } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import type { User, VoterPersona } from '../types';

export interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updatePersona: (persona: VoterPersona) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
