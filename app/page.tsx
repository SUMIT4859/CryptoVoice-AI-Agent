"use client";

import { useState, useEffect, useRef } from "react";
import { VoiceButton } from "@/components/voice-button";
import { ChatMessage } from "@/components/chat-message";
import {
  useVoiceRecognition,
  speakText,
} from "@/hooks/use-voice-recognition";
import { Zap, Sparkles, Shield, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function CryptoVoiceAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  } = useVoiceRecognition();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Process transcript when speech recognition completes
  useEffect(() => {
    if (!isListening && transcript && !isLoading) {
      handleAskQuestion(transcript);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, transcript]);

  const handleAskQuestion = async (question: string) => {
    if (!question.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Automatically speak the response
      setIsSpeaking(true);
      await speakText(data.answer);
      setIsSpeaking(false);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceButtonClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeakMessage = async (content: string) => {
    setIsSpeaking(true);
    await speakText(content);
    setIsSpeaking(false);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">CryptoVoice AI</h1>
              <p className="text-xs text-muted-foreground">
                Voice-Native Crypto Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Online
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2 text-balance">
                Welcome to CryptoVoice AI
              </h2>
              <p className="text-muted-foreground max-w-md mb-8 text-balance">
                Ask me anything about cryptocurrency, blockchain, or DeFi using
                your voice. I&apos;ll give you quick, concise answers.
              </p>

              {/* Feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                <div className="flex flex-col items-center p-4 rounded-xl bg-secondary/50">
                  <MessageSquare className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground text-center">
                    Voice & Text
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-secondary/50">
                  <Zap className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground text-center">
                    Instant Answers
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-secondary/50">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground text-center">
                    Crypto Expert
                  </span>
                </div>
              </div>

              {!isSupported && (
                <div className="mt-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
                  Voice recognition is not supported in your browser. Please use
                  Chrome or Edge.
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  onSpeak={
                    message.role === "assistant"
                      ? () => handleSpeakMessage(message.content)
                      : undefined
                  }
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Voice input area */}
        <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-8">
          <div className="flex flex-col items-center gap-6">
            <VoiceButton
              isListening={isListening}
              isLoading={isLoading}
              isSpeaking={isSpeaking}
              onClick={handleVoiceButtonClick}
              disabled={!isSupported}
            />

            {/* Quick suggestions */}
            {messages.length === 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
                {[
                  "What is Bitcoin?",
                  "Explain Ethereum",
                  "What is DeFi?",
                  "NFT meaning?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleAskQuestion(suggestion)}
                    disabled={isLoading}
                    className="px-4 py-2 text-xs rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
