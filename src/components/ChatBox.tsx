import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  Phone,
  RefreshCw,
  ExternalLink,
  Bot,
  User,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'assistant',
  content: `Hello! I am the **Croyance Auto Lease Program Assistant**.\n\nI answer questions strictly based on the official Croyance Lease-to-Own Program document:\n• **4 Vehicle Tiers & Pricing** (2005–2013 Toyota Corolla & Camry)\n• **30% Deposit Requirements** (payable within 7 business days)\n• **Required Documents & Information**\n• **24-Month Installment Terms**\n\n*Note: To prevent errors, I will never assume or guess information. If a question is outside the official document, I will connect you directly to our WhatsApp support team.*`,
  timestamp: 'Just now',
};

const QUICK_PROMPTS = [
  'What documents must I attach?',
  'Where is the head office address?',
  'How much is the deposit for 2005-2006 Corolla/Camry?',
  'What is the payment period and monthly cost?',
  'What is your telephone number?',
  'How many days to provide the 30% deposit?',
];

export const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assist-${Date.now()}`,
        role: 'assistant',
        content:
          data.reply ||
          'For further support with questions not answered here, please message us on WhatsApp at 07062343398.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `I could not connect to the underwriting server right now. To ensure you receive verified answers without assumptions or delays, please contact our support team on WhatsApp at **07062343398** (https://wa.me/2347062343398).`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* Floating Toggle Button (Always visible bottom-right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <div
            id="chat-tooltip-badge"
            className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-lg border border-[#E2E5E8] text-[12px] text-[#501087] font-semibold animate-bounce cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#19B496]" />
            <span>Ask me any questions?</span>
          </div>
        )}

        <button
          type="button"
          id="btn-open-chatbox"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Program Chat' : 'Open Program Chat'}
          className="w-14 h-14 rounded-full bg-[#501087] hover:bg-[#35005f] text-white shadow-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer relative border-2 border-white"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#19B496] border-2 border-white rounded-full"></span>
            </>
          )}
        </button>
      </div>

      {/* Slide-in Chatbox Modal/Card */}
      {isOpen && (
        <div
          id="program-chatbox-window"
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[420px] max-w-full h-[540px] sm:h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-[#E2E5E8] flex flex-col z-50 overflow-hidden animate-fadeIn"
        >
          {/* Header */}
          <div className="bg-[#501087] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#19B496] border border-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold tracking-tight leading-tight flex items-center gap-1.5">
                  <span>Croyance Document Assistant</span>
                </h4>
                <span className="text-[11px] text-white/80 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19B496] inline-block animate-pulse"></span>
                  Grounded • No Hallucinations
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                id="btn-chat-reset"
                onClick={resetChat}
                title="Restart conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="btn-chat-close"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#F5F5F5]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#501087] text-white flex items-center justify-center shrink-0 text-[11px] font-bold mt-1">
                    <Bot className="w-4 h-4 text-[#19B496]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-[13px] leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-[#501087] text-white rounded-br-xs'
                      : 'bg-white text-[#191919] border border-[#E2E5E8] rounded-bl-xs'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none text-[#191919]">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}

                  {/* Render WhatsApp Direct Action Button if response directs user to WhatsApp */}
                  {msg.role === 'assistant' &&
                    (msg.content.includes('07062343398') ||
                      msg.content.includes('WhatsApp')) && (
                      <div className="mt-3 pt-2 border-t border-[#E2E5E8]/80">
                        <a
                          href="https://wa.me/2347062343398"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1ebd5a] text-white text-[11px] font-bold rounded-lg shadow-xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Chat Support on WhatsApp (07062343398)</span>
                        </a>
                      </div>
                    )}

                  <span
                    className={`block text-[10px] mt-1.5 ${
                      msg.role === 'user' ? 'text-white/70 text-right' : 'text-[#8C96A0]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#1F272D] text-white flex items-center justify-center shrink-0 text-[11px] font-bold mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#501087] text-white flex items-center justify-center shrink-0 text-[11px]">
                  <Bot className="w-4 h-4 text-[#19B496]" />
                </div>
                <div className="bg-white border border-[#E2E5E8] rounded-2xl rounded-bl-xs p-3.5 shadow-xs flex items-center gap-2 text-[12px] text-[#4A5560]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#501087]" />
                  <span>Checking official Lease document...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (visible if conversation is short) */}
          {messages.length <= 2 && (
            <div className="p-2.5 bg-white border-t border-[#E2E5E8] overflow-x-auto whitespace-nowrap custom-scrollbar flex gap-1.5">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-[#F5F5F5] hover:bg-[#f0dbff]/40 text-[#501087] text-[11px] font-semibold rounded-full border border-[#E2E5E8] transition-colors shrink-0 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-[#E2E5E8]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                id="input-chat-query"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me any questions..."
                disabled={loading}
                className="flex-1 h-11 px-3.5 rounded-xl border border-[#E2E5E8] focus:border-[#501087] focus:ring-2 focus:ring-[#501087]/20 text-[16px] sm:text-[13px] text-[#191919] outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                id="btn-chat-send"
                disabled={!input.trim() || loading}
                className="h-11 w-11 rounded-xl bg-[#501087] hover:bg-[#35005f] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 text-[10px] text-[#8C96A0]">
              <span>Grounding: Official Croyance Document</span>
              <span>Direct Underwriting Inquiries</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
