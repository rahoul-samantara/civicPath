# System Architecture — CivicPath AI

## 1. Overview
CivicPath AI is a modern web application built on a decoupled, modular architecture designed for security, scalability, and accessibility.

## 2. Tech Stack
- **Frontend**: React 19 + Vite (TypeScript)
- **Styling**: Vanilla CSS with CSS Variables (Stitch Design System)
- **Auth & Database**: Firebase (Auth / Firestore)
- **Intelligence**: Gemini 1.5 Flash (Google AI SDK)
- **Data Source**: Google Civic Information API

## 3. Core Modules
- **Auth Context**: Global state provider managing user identity and profile synchronization between Firebase Auth and Firestore.
- **Guidance Orchestrator**: Manages the conversational flow with Gemini 1.5 Flash, injecting system instructions and safety guardrails.
- **Voter Readiness Engine**: Business logic that calculates a "Readiness Score" based on completed milestones in Firestore.

## 4. Data Flow
1. **Input**: User interacts with Chat or Dashboard.
2. **Persistence**: State changes (persona selection, milestone completion) are written to Firestore.
3. **Intelligence**: Conversational queries are grounded with user context (State/Persona) and sent to Gemini.
4. **Presentation**: Results are rendered using accessible Material Design components.

## 5. Security Guardrails
- Environment variables for all API keys.
- Firebase Security Rules (Least Privilege).
- LLM Safety filters.
