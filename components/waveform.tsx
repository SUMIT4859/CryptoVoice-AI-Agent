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
      {[...Array(barCount)].map((_, i) => {
        // Use simple integer math to prevent hydration mismatch
        const heightPx = 12 + ((i * 7) % 12);
        const delayMs = i * 50;
        
        return (
          <div
            key={i}
            className={cn(
              "w-1 rounded-full bg-primary transition-all duration-150",
              isActive ? "animate-wave" : "h-1"
            )}
            style={
              isActive
                ? {
                    height: `${heightPx}px`,
                    animationDelay: `${delayMs}ms`,
                    animationDuration: "500ms",
                  }
                : { height: "4px" }
            }
          />
        );
      })}
    </div>
  );
}
