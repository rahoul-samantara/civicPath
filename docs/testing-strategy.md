# Testing Strategy — CivicPath AI

## 1. Unit Testing
- **Tool**: Vitest
- **Scope**: Business logic, readiness score calculations, date formatting, and input validation helpers.

## 2. Component Testing
- **Tool**: React Testing Library
- **Scope**: Verification of accessibility semantics (ARIA roles), button interactions, and loading states.

## 3. Integration Testing
- **Scope**: Firebase Auth lifecycle and Gemini service connectivity.

## 4. LLM Quality Assurance
- **"Trick Questions"**: A suite of test prompts designed to check if the AI breaks non-partisan guardrails.
- **Grounding Checks**: Verifying that AI responses include links to official .gov sources.

## 5. Accessibility Audit
- Manual WCAG 2.1 AA checklist traversal.
- Screen reader (VO/NVDA) testing for the chat interface.
- Keyboard-only navigation verification.
