/* ==========================================================================
   ChatInterface — CivicPath AI
   Main conversational UI for interacting with Gemini.
   ========================================================================== */

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../../types';
import Button from '../../common/Button/Button';
import './ChatInterface.css';

interface ChatInterfaceProps {
  initialMessages: ChatMessage[];
  onSendMessage?: (msg: string) => void; // Mocked for Phase 1
}

import { type ChatSession } from '@google/generative-ai';
import { startCivicChat, getGeminiResponseStream } from '../../../services/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatInterface({
  initialMessages,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatRef = useRef<ChatSession | null>(null);

  useEffect(() => {
    chatRef.current = startCivicChat(initialMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsgText = input;
    const userMsgId = Date.now().toString();
    
    setMessages((prev) => [...prev, {
      id: userMsgId,
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toISOString(),
    }]);
    
    setInput('');
    setIsTyping(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    }]);

    try {
      const stream = await getGeminiResponseStream(chatRef.current, userMsgText);
      let fullContent = '';
      
      for await (const chunk of stream) {
        const chunkText = chunk.text();
        fullContent += chunkText;
        
        setMessages((prev) => prev.map(msg => 
          msg.id === assistantMsgId ? { ...msg, content: fullContent } : msg
        ));
      }
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages((prev) => prev.map(msg => 
        msg.id === assistantMsgId ? { ...msg, content: "I'm having trouble connecting. Please try again." } : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat">
      <div className="chat__messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat__bubble chat__bubble--${msg.role}`}
          >
            {msg.role === 'assistant' && (
              <div className="chat__avatar" aria-hidden="true">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
            )}
            <div className="chat__content">
              {msg.role === 'assistant' ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <p className="text-body-lg">{msg.content}</p>
              )}
              
              {/* Action Cards (if provided) */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="chat__actions">
                  {msg.actions.map((action) => (
                    <div key={action.id} className="chat__action-card">
                      <div className="chat__action-header">
                        <span className="material-symbols-outlined chat__action-icon">
                          {action.icon}
                        </span>
                        <h4 className="text-label-md">{action.title}</h4>
                      </div>
                      <p className="text-caption">{action.description}</p>
                      <Button variant="secondary" size="sm">
                        {action.actionLabel}
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="chat__sources">
                  <span className="text-caption chat__sources-label">
                    Sources:
                  </span>
                  {msg.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chat__source-link text-caption"
                    >
                      {source.domain}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat__bubble chat__bubble--assistant">
             <div className="chat__avatar" aria-hidden="true">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
            <div className="chat__typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat__input-form" onSubmit={handleSubmit}>
        <div className="chat__input-container">
          <input
            type="text"
            className="chat__input"
            placeholder="Ask a question about voting..."
            value={input}
            maxLength={500}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Chat input message"
          />
          <div className="chat__input-footer">
            <span className="text-caption">{input.length}/500</span>
            <span className="text-caption chat__privacy-note">
              <span className="material-symbols-outlined">info</span>
              Answers are AI-synthesized from official sources.
            </span>
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          icon="send"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
