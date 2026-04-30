/* ==========================================================================
   CivicPath AI — Mock Data
   Placeholder data matching the Stitch screen content for Phase 1.
   Replaced with live Firebase/Civic API data in Phase 2.
   ========================================================================== */

import type {
  User,
  JourneyMilestone,
  ElectionDeadline,
  ChatMessage,
  NavItem,
} from '../types';

// ── Mock User (Stitch: "registered in Franklin County") ──────────────────
export const mockUser: User = {
  uid: 'mock-user-001',
  displayName: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  photoURL: null,
  state: 'Ohio',
  county: 'Franklin',
  persona: 'first-time',
  readinessScore: 62,
  createdAt: '2026-09-15T10:00:00Z',
  updatedAt: '2026-10-01T08:30:00Z',
};

// ── Mock Milestones (Stitch: 4-step stepper) ─────────────────────────────
export const mockMilestones: JourneyMilestone[] = [
  {
    id: 'ms-001',
    userId: 'mock-user-001',
    category: 'registration',
    title: 'Voter Registration',
    description:
      'Verify your voter registration status or register for the first time.',
    status: 'complete',
    deadline: '2026-10-07T23:59:59Z',
    actionUrl: 'https://www.sos.state.oh.us/elections/voters/',
    completedAt: '2026-09-20T14:22:00Z',
  },
  {
    id: 'ms-002',
    userId: 'mock-user-001',
    category: 'research',
    title: 'Review Sample Ballot',
    description:
      'Research candidates and ballot measures for your district. Available starting Oct 20.',
    status: 'in-progress',
    deadline: '2026-10-20T00:00:00Z',
    actionUrl: null,
    completedAt: null,
  },
  {
    id: 'ms-003',
    userId: 'mock-user-001',
    category: 'ballot-prep',
    title: 'Request Mail-In Ballot',
    description:
      'Submit your absentee ballot request before the deadline.',
    status: 'todo',
    deadline: '2026-10-15T23:59:59Z',
    actionUrl: 'https://www.sos.state.oh.us/elections/voters/absentee-ballot/',
    completedAt: null,
  },
  {
    id: 'ms-004',
    userId: 'mock-user-001',
    category: 'voting-plan',
    title: 'Create Voting Plan',
    description:
      'Set your voting method, time, and transportation plan for Election Day.',
    status: 'todo',
    deadline: '2026-11-05T20:00:00Z',
    actionUrl: null,
    completedAt: null,
  },
];

// ── Mock Deadlines (Stitch: Timeline sidebar) ────────────────────────────
export const mockDeadlines: ElectionDeadline[] = [
  {
    id: 'dl-001',
    title: 'Voter Registration Deadline',
    date: '2026-10-07T23:59:59Z',
    description: 'Last day to register or update your address for the General Election.',
    urgency: 'passed',
    icon: 'how_to_reg',
    category: 'registration',
  },
  {
    id: 'dl-002',
    title: 'Mail-In Ballot Request Due',
    date: '2026-10-15T23:59:59Z',
    description: 'Deadline to request an absentee/mail-in ballot.',
    urgency: 'urgent',
    icon: 'mail',
    category: 'ballot-prep',
  },
  {
    id: 'dl-003',
    title: 'Early Voting Begins',
    date: '2026-10-22T07:00:00Z',
    description: 'In-person early voting opens at your county board of elections.',
    urgency: 'approaching',
    icon: 'how_to_vote',
    category: 'voting-plan',
  },
  {
    id: 'dl-004',
    title: 'Election Day',
    date: '2026-11-05T06:30:00Z',
    description: 'Polls open 6:30 AM – 7:30 PM. Bring valid photo ID.',
    urgency: 'normal',
    icon: 'ballot',
    category: 'voting-plan',
  },
];

// ── Mock Chat (Stitch: AI conversation about address change) ─────────────
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'assistant',
    content:
      'Hello again! I see you successfully registered to vote in Franklin County. Based on your profile, you are eligible for several voting methods in the upcoming general election.\n\nHow would you prefer to cast your ballot this year?',
    timestamp: '2026-10-01T10:00:00Z',
  },
  {
    id: 'msg-002',
    role: 'user',
    content:
      'I think I want to vote by mail, but I recently moved to a new apartment across town. Does that complicate things?',
    timestamp: '2026-10-01T10:01:00Z',
  },
  {
    id: 'msg-003',
    role: 'assistant',
    content:
      'Voting by mail is a great option! Since you recently moved, your next steps depend on whether you stayed within Franklin County or moved to a new county.',
    timestamp: '2026-10-01T10:01:30Z',
    sources: [
      {
        title: 'Ohio Secretary of State — Address Changes',
        url: 'https://www.sos.state.oh.us/elections/voters/',
        domain: 'sos.state.oh.us',
      },
    ],
    actions: [
      {
        id: 'action-same-county',
        title: 'I moved within the county',
        description:
          "We'll guide you through a quick 2-minute form to update your address and submit your mail ballot request simultaneously.",
        icon: 'check_circle',
        actionLabel: 'Update Address',
      },
      {
        id: 'action-new-county',
        title: 'I moved to a new county',
        description:
          "You'll need to submit a new voter registration application. We have the forms ready for your new jurisdiction.",
        icon: 'info',
        actionLabel: 'Re-Register',
      },
    ],
  },
];

// ── Navigation Items (Stitch: Sidebar nav) ───────────────────────────────
export const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', ariaLabel: 'Voter Dashboard' },
  { path: '/assistant', label: 'Assistant', icon: 'smart_toy', ariaLabel: 'Election Assistant' },
  { path: '/research', label: 'Election Calendar', icon: 'event_upcoming', ariaLabel: 'Election Deadlines' },
  { path: '/profile', label: 'My Profile', icon: 'person_check', ariaLabel: 'My Voter Profile' },
  { path: '/settings', label: 'Settings', icon: 'settings', ariaLabel: 'Application Settings' },
];

// ── Persona Options (Stitch: Landing page cards) ─────────────────────────
export const personaOptions = [
  {
    id: 'first-time' as const,
    title: 'First-Time Voter',
    description:
      'Step-by-step guidance on registration, finding your polling place, and understanding exactly how the voting process works.',
    icon: 'school',
  },
  {
    id: 'returning' as const,
    title: 'Policy Deep-Diver',
    description:
      'Detailed breakdowns of ballot measures, comprehensive candidate histories, and comparative voting records.',
    icon: 'policy',
  },
  {
    id: 'absentee' as const,
    title: 'Local Issues Focus',
    description:
      'Prioritize municipal elections, school board races, zoning referendums, and immediate community impact issues.',
    icon: 'location_city',
  },
];
