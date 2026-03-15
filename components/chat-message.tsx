"use client";

import { cn } from "@/lib/utils";
import { User, Bot, Volume2 } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onSpeak?: () => void;
}

export function ChatMessage({ role, content, onSpeak }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser
          ? "bg-primary/10 ml-8"
          : "bg-secondary mr-8"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          isUser ? "bg-primary/20" : "bg-primary"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-primary" />
        ) : (
          <Bot className="h-5 w-5 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-muted-foreground">
            {isUser ? "You" : "CryptoVoice AI"}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
          {content}
        </p>
        {!isUser && onSpeak && (
          <button
            onClick={onSpeak}
            className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            aria-label="Speak this response"
          >
            <Volume2 className="h-3.5 w-3.5" />
            <span>Listen</span>
          </button>
        )}
      </div>
    </div>
  );
}
