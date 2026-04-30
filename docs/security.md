# Security Review — CivicPath AI

## 1. Authentication
- **Provider**: Firebase Auth (Google Sign-In).
- **Session Management**: Handled securely by the Firebase SDK with automatic token refreshing.
- **PII Protection**: We avoid storing full residential addresses or SSNs. Localization is performed at the State/County/Zip level only.

## 2. API Security
- **Secret Handling**: All API keys (Gemini, Civic, Firebase) are stored in `.env` files and accessed via `import.meta.env`.
- **Client-Side Protection**: Rate-limiting logic is implemented on conversational inputs to prevent API abuse.

## 3. LLM Safety & Prompt Engineering
- **System Instructions**: Strictly defined persona that refuses to engage in partisan politics or provide opinions.
- **Safety Settings**: Gemini safety filters are enabled for Harassment, Hate Speech, and Dangerous Content at the `BLOCK_MEDIUM_AND_ABOVE` threshold.
- **Input Sanitization**: User inputs are sanitized before being passed to the Generative Model.

## 4. Data Integrity
- **Firestore Rules**: Strict security rules ensure users can only read/write their own profiles and milestones.
- **Input Validation**: TypeScript interfaces enforce strict typing on all incoming API responses.
