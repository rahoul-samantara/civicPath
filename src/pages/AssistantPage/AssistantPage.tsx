/* ==========================================================================
   AssistantPage — CivicPath AI
   Maps to: Interactive Election Assistant (Spec P2)
   ========================================================================== */

import { mockChatMessages } from '../../data/mockData';
import ChatInterface from '../../components/assistant/ChatInterface/ChatInterface';
import './AssistantPage.css';

export default function AssistantPage() {
  return (
    <div className="assistant-page">
      <header className="assistant-page__header">
        <h1 className="text-headline-lg">Election Assistant</h1>
        <p className="text-body-md assistant-page__subtitle">
          Your secure, non-partisan AI guide for understanding local policies and tracking deadlines.
        </p>
      </header>

      <main className="assistant-page__main">
        <ChatInterface initialMessages={mockChatMessages} />
      </main>
    </div>
  );
}
