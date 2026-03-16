"use client";

import { cn } from "@/lib/utils";

interface WaveformProps {
  isActive: boolean;
  className?: string;
  barCount?: number;
}

export function Waveform({ isActive, className, barCount = 12 }: WaveformProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {[...Array(barCount)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-primary transition-all duration-150",
            isActive ? "animate-wave" : "h-1"
          )}
          style={{
            height: isActive ? `${Math.random() * 24 + 8}px` : "4px",
            animationDelay: `${i * 0.05}s`,
            animationDuration: `${0.4 + Math.random() * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
