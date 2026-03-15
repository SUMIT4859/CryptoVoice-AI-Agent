"use client";

import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="relative flex items-center justify-center">
      {/* Outer pulse rings when listening */}
      {state === "listening" && (
        <>
          <div className="absolute h-40 w-40 rounded-full bg-primary/20 animate-pulse-ring" />
          <div
            className="absolute h-48 w-48 rounded-full bg-primary/10 animate-pulse-ring"
            style={{ animationDelay: "0.3s" }}
          />
        </>
      )}

      {/* Speaking wave animation */}
      {state === "speaking" && (
        <div className="absolute flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-2 rounded-full bg-primary/40 animate-wave"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}

      {/* Main button */}
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={cn(
          "relative z-10 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-primary/30",
          state === "idle" &&
            "bg-secondary hover:bg-secondary/80 hover:scale-105 active:scale-95",
          state === "listening" && "bg-primary scale-110",
          state === "loading" && "bg-secondary cursor-wait",
          state === "speaking" && "bg-primary/20",
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
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        ) : state === "listening" ? (
          <MicOff className="h-10 w-10 text-primary-foreground" />
        ) : (
          <Mic
            className={cn(
              "h-10 w-10",
              state === "speaking" ? "text-primary" : "text-foreground"
            )}
          />
        )}
      </button>

      {/* Status text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span
          className={cn(
            "text-sm font-medium",
            state === "listening" && "text-primary",
            state === "loading" && "text-muted-foreground",
            state === "speaking" && "text-primary",
            state === "idle" && "text-muted-foreground"
          )}
        >
          {state === "idle" && "Tap to speak"}
          {state === "listening" && "Listening..."}
          {state === "loading" && "Thinking..."}
          {state === "speaking" && "Speaking..."}
        </span>
      </div>
    </div>
  );
}
