# CivicPath AI

Navigating the modern election landscape is a complex, often overwhelming process. Voters face a fragmented information environment with varying deadlines, registration rules, and mail-in ballot procedures across different jurisdictions. 

**CivicPath AI** provides a centralized, non-partisan, and interactive "Voter Readiness" dashboard powered by Google Gemini. It transforms the administrative overhead of voting into a personalized, gamified action plan.

## Phase 1 MVP — Frontend Scaffold

This repository currently contains the **Phase 1 MVP**, which includes:
- React + Vite + TypeScript frontend scaffolding.
- The **Stitch Design System** implementation (colors, typography, spacing).
- Responsive mobile-first layout with Sidebar navigation.
- Key views: Landing Onboarding, Interactive Chat Assistant (Mocked), and Personalized Dashboard.
- Strict accessibility defaults (`aria` attributes, focus visibility, keyboard navigation).

### Running Locally

```bash
npm install
npm run dev
```

### Next Steps (Phase 2)
- Firebase Authentication integration.
- Firestore persistence for user state and readiness scores.
- Live Gemini 1.5 Flash integration via Google Cloud Run backend.
- Google Civic Information API binding for live deadlines.
