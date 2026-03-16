"use client";

import { useState, useEffect, useRef } from "react";
import { VoiceButton } from "@/components/voice-button";
import { ChatMessage } from "@/components/chat-message";
import { X402Payment } from "@/components/x402-payment";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Waveform } from "@/components/waveform";
import {
  useVoiceRecognition,
  speakText,
} from "@/hooks/use-voice-recognition";
import { Zap, Sparkles, Radio, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function CryptoVoiceAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [showArchitecture, setShowArchitecture] = useState(false);
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

  // Update architecture step based on state
  useEffect(() => {
    if (isListening) {
      setActiveStep(0); // WebRTC Microphone
    } else if (isLoading) {
      // Animate through STT and AI Agent
      setActiveStep(1); // STT
      const timer = setTimeout(() => setActiveStep(2), 800); // AI Agent
      return () => clearTimeout(timer);
    } else if (isSpeaking) {
      setActiveStep(3); // TTS
      const timer = setTimeout(() => setActiveStep(4), 500); // Voice Response
      return () => clearTimeout(timer);
    } else {
      setActiveStep(-1);
    }
  }, [isListening, isLoading, isSpeaking]);

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
      setSpeakingMessageId(assistantMessage.id);
      await speakText(data.answer);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
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

  const handleSpeakMessage = async (content: string, messageId: string) => {
    setIsSpeaking(true);
    setSpeakingMessageId(messageId);
    await speakText(content);
    setIsSpeaking(false);
    setSpeakingMessageId(null);
  };

  const QUICK_PROMPTS = [
    "What is Bitcoin?",
    "Explain Ethereum",
    "What is DeFi?",
    "What is an NFT?",
  ];

  return (
    <main className="min-h-screen bg-background flex">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 glass sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary neon-glow">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground gradient-text text-lg">CryptoVoice AI</h1>
                <p className="text-xs text-muted-foreground">
                  Voice-Native Crypto Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowArchitecture(!showArchitecture)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
              >
                <Radio className="h-4 w-4" />
                <span className="hidden sm:inline">Architecture</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showArchitecture ? "rotate-180" : ""}`} />
              </button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>dTelecom Stack</span>
              </div>
            </div>
          </div>
        </header>

        {/* Architecture Panel */}
        {showArchitecture && (
          <div className="border-b border-border bg-card/30 animate-in slide-in-from-top-2 duration-300">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ArchitectureDiagram activeStep={activeStep} />
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-card/30 p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-2">dTelecom Stack</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      This demo showcases a voice-native AI agent using real-time WebRTC audio streaming,
                      Whisper/Parakeet STT for speech recognition, AI reasoning, and Kokoro TTS for natural voice output.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {["WebRTC", "Whisper STT", "AI Agent", "Kokoro TTS"].map((tech) => (
                        <div key={tech} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                  <X402Payment isProcessing={isLoading} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
                <div className="relative mb-8">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20">
                    <Sparkles className="h-12 w-12 text-primary" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                    <Radio className="h-5 w-5 text-accent-foreground" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold text-foreground mb-2 text-balance gradient-text">
                  Voice-Native Crypto Assistant
                </h2>
                <p className="text-muted-foreground max-w-md mb-4 text-sm text-balance">
                  Ask about cryptocurrency, blockchain, DeFi, NFTs, or Web3.
                  Using the dTelecom stack for real-time voice interaction.
                </p>

                {/* Live waveform visualization */}
                <div className="mb-8 h-8 flex items-center">
                  <Waveform isActive={isListening} barCount={20} />
                </div>

                {!isSupported && (
                  <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm max-w-md">
                    Voice recognition is not supported in your browser. Please use Chrome or Edge.
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
                    isSpeaking={speakingMessageId === message.id}
                    onSpeak={
                      message.role === "assistant"
                        ? () => handleSpeakMessage(message.content, message.id)
                        : undefined
                    }
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Voice input area */}
          <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-10">
            <div className="flex flex-col items-center gap-8">
              <VoiceButton
                isListening={isListening}
                isLoading={isLoading}
                isSpeaking={isSpeaking}
                onClick={handleVoiceButtonClick}
                disabled={!isSupported}
              />

              {/* Quick prompts */}
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleAskQuestion(prompt)}
                    disabled={isLoading || isListening}
                    className="px-4 py-2 text-xs rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-all hover:border-primary/30 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
