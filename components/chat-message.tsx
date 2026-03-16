"use client";

import { cn } from "@/lib/utils";
import { User, Bot, Volume2 } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onSpeak?: () => void;
  isSpeaking?: boolean;
}

export function ChatMessage({ role, content, onSpeak, isSpeaking }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex gap-3 p-4 rounded-2xl max-w-[85%]",
          isUser
            ? "bg-primary/15 border border-primary/20"
            : "bg-card border border-border"
        )}
      >
        {!isUser && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-xs font-medium",
              isUser ? "text-primary" : "text-accent"
            )}>
              {isUser ? "You" : "CryptoVoice AI"}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {content}
          </p>
          {!isUser && onSpeak && (
            <button
              onClick={onSpeak}
              disabled={isSpeaking}
              className={cn(
                "mt-3 flex items-center gap-1.5 text-xs transition-colors px-2 py-1 rounded-lg",
                isSpeaking
                  ? "bg-accent/20 text-accent"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              )}
              aria-label="Speak this response"
            >
              <Volume2 className={cn("h-3.5 w-3.5", isSpeaking && "animate-pulse")} />
              <span>{isSpeaking ? "Playing..." : "Listen"}</span>
            </button>
          )}
        </div>
        
        {isUser && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20">
            <User className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
