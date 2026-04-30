import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReadinessGauge from '../components/dashboard/ReadinessGauge/ReadinessGauge';
import ChatInterface from '../components/assistant/ChatInterface/ChatInterface';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import type { User } from '../types';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock dependencies
vi.mock('../services/gemini', () => ({
  startCivicChat: vi.fn(() => ({
    sendMessageStream: vi.fn(() => Promise.resolve({ 
        stream: (async function* () { yield { text: () => 'Mocked response' }; })() 
    })),
  })),
  getGeminiResponseStream: vi.fn(() => Promise.resolve((async function* () { yield { text: () => 'Mocked response' }; })())),
}));

const mockAuthContext = {
  user: { uid: '123', displayName: 'Test User' } as User,
  firebaseUser: null,
  loading: false,
  login: vi.fn(),
  logout: vi.fn(),
  updatePersona: vi.fn(),
};

describe('ReadinessGauge Component', () => {
  it('renders correctly with 0% progress', async () => {
    render(<ReadinessGauge score={0} />);
    expect(await screen.findByText('0%')).toBeInTheDocument();
  });

  it('renders correctly with 100% progress', async () => {
    render(<ReadinessGauge score={100} />);
    expect(await screen.findByText('100%')).toBeInTheDocument();
  });
});

describe('ChatInterface Component', () => {
  it('allows user to type and send a message', async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <ChatInterface initialMessages={[]} />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Ask a question about voting/i);
    const sendButton = screen.getByLabelText(/Send message/i);

    fireEvent.change(input, { target: { value: 'How do I register?' } });
    expect(input).toHaveValue('How do I register?');

    fireEvent.click(sendButton);
    
    await waitFor(() => expect(input).toHaveValue(''));
  });
});
