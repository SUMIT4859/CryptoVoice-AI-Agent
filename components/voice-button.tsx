"use client";

import { Mic, MicOff, Loader2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Waveform } from "./waveform";

interface VoiceButtonProps {
  isListening: boolean;
  isLoading: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function VoiceButton({
  isListening,
  isLoading,
  isSpeaking,
  onClick,
  disabled,
}: VoiceButtonProps) {
  const getButtonState = () => {
    if (isLoading) return "loading";
    if (isSpeaking) return "speaking";
    if (isListening) return "listening";
    return "idle";
  };

  const state = getButtonState();

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer pulse rings when listening */}
      {state === "listening" && (
        <>
          <div className="absolute h-44 w-44 rounded-full bg-primary/20 animate-pulse-ring" />
          <div
            className="absolute h-52 w-52 rounded-full bg-primary/10 animate-pulse-ring"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="absolute h-60 w-60 rounded-full bg-primary/5 animate-pulse-ring"
            style={{ animationDelay: "0.6s" }}
          />
        </>
      )}

      {/* Speaking wave animation - outer */}
      {state === "speaking" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full bg-accent/10 animate-pulse" />
        </div>
      )}

      {/* Main button */}
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={cn(
          "relative z-10 flex h-32 w-32 items-center justify-center rounded-full transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-primary/30",
          state === "idle" &&
            "bg-secondary hover:bg-secondary/80 hover:scale-105 active:scale-95 border-2 border-primary/30 hover:neon-glow",
          state === "listening" && "bg-primary scale-110 neon-glow-pulse",
          state === "loading" && "bg-secondary cursor-wait border-2 border-border",
          state === "speaking" && "bg-accent/20 border-2 border-accent/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-label={
          state === "listening"
            ? "Stop listening"
            : state === "loading"
              ? "Processing..."
              : "Start speaking"
        }
      >
        {state === "loading" ? (
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        ) : state === "listening" ? (
          <MicOff className="h-12 w-12 text-primary-foreground" />
        ) : state === "speaking" ? (
          <Volume2 className="h-12 w-12 text-accent" />
        ) : (
          <Mic className="h-12 w-12 text-primary" />
        )}
      </button>

      {/* Waveform below button when listening */}
      {state === "listening" && (
        <div className="absolute -bottom-8">
          <Waveform isActive={true} barCount={16} />
        </div>
      )}

      {/* Speaking waveform */}
      {state === "speaking" && (
        <div className="absolute -bottom-8">
          <Waveform isActive={true} barCount={16} className="text-accent" />
        </div>
      )}

      {/* Status text */}
      <div className="mt-14 text-center">
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            state === "listening" && "text-primary",
            state === "loading" && "text-muted-foreground",
            state === "speaking" && "text-accent",
            state === "idle" && "text-muted-foreground"
          )}
        >
          {state === "idle" && "Tap to speak"}
          {state === "listening" && "Listening..."}
          {state === "loading" && "Thinking..."}
          {state === "speaking" && "Speaking..."}
        </span>
        
        {state !== "idle" && (
          <p className="text-xs text-muted-foreground mt-1">
            {state === "listening" && "Whisper STT active"}
            {state === "loading" && "AI Agent processing"}
            {state === "speaking" && "Kokoro TTS output"}
          </p>
        )}
      </div>
    </div>
  );
}
