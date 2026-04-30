/* ==========================================================================
   CivicPath AI — Core TypeScript Interfaces
   Maps to spec sections 2 (Personas), 7 (Data Model), 8 (API Contracts)
   ========================================================================== */

// ── Persona Types ────────────────────────────────────────────────────────
export type VoterPersona = 'first-time' | 'returning' | 'absentee';

// ── User Entity (Spec §7.1) ─────────────────────────────────────────────
export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  state: string;
  county: string;
  persona: VoterPersona;
  readinessScore: number; // 0–100
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Journey Milestone (Spec §7.2) ────────────────────────────────────────
export type MilestoneCategory =
  | 'registration'
  | 'research'
  | 'ballot-prep'
  | 'voting-plan';

export type MilestoneStatus = 'todo' | 'in-progress' | 'complete';

export interface JourneyMilestone {
  id: string;
  userId: string;
  category: MilestoneCategory;
  title: string;
  description: string;
  status: MilestoneStatus;
  deadline: string | null;
  actionUrl: string | null;
  completedAt: string | null;
}

// ── Election Timeline ────────────────────────────────────────────────────
export type DeadlineUrgency = 'normal' | 'approaching' | 'urgent' | 'passed';

export interface ElectionDeadline {
  id: string;
  title: string;
  date: string;
  description: string;
  urgency: DeadlineUrgency;
  icon: string; // Material Symbol name
  category: MilestoneCategory;
}

// ── Chat / Guidance Session (Spec §8) ────────────────────────────────────
export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  sources?: CitationSource[];
  actions?: ActionCard[];
}

export interface CitationSource {
  title: string;
  url: string;
  domain: string;
}

export interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionLabel: string;
  actionUrl?: string;
  onClick?: () => void;
}

// ── API Contracts (Spec §8) ──────────────────────────────────────────────
export interface ChatRequest {
  message: string;
  contextId: string;
}

export interface ElectionDetailsResponse {
  state: string;
  electionName: string;
  electionDate: string;
  deadlines: ElectionDeadline[];
  registrationUrl: string;
  pollingPlaceUrl: string;
}

// ── App State ────────────────────────────────────────────────────────────
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  milestones: JourneyMilestone[];
  deadlines: ElectionDeadline[];
  chatMessages: ChatMessage[];
  chatContextId: string;
}

// ── Navigation ───────────────────────────────────────────────────────────
export interface NavItem {
  path: string;
  label: string;
  icon: string;
  ariaLabel: string;
}
