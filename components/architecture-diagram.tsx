"use client";

import { cn } from "@/lib/utils";
import { Mic, Brain, Volume2, ArrowDown, Radio, AudioWaveformIcon } from "lucide-react";

interface ArchitectureDiagramProps {
  activeStep?: number;
  className?: string;
}

const PIPELINE_STEPS = [
  {
    icon: Mic,
    label: "WebRTC Microphone",
    description: "Audio capture",
    color: "primary",
  },
  {
    icon: Radio,
    label: "Whisper / Parakeet STT",
    description: "Speech-to-Text",
    color: "accent",
  },
  {
    icon: Brain,
    label: "AI Agent",
    description: "Reasoning layer",
    color: "primary",
  },
  {
    icon: AudioWaveformIcon,
    label: "Kokoro TTS",
    description: "Text-to-Speech",
    color: "accent",
  },
  {
    icon: Volume2,
    label: "Voice Response",
    description: "Audio output",
    color: "primary",
  },
];

export function ArchitectureDiagram({ activeStep = -1, className }: ArchitectureDiagramProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card/30 p-6", className)}>
      <h3 className="text-sm font-semibold text-foreground mb-2">Voice Agent Architecture</h3>
      <p className="text-xs text-muted-foreground mb-6">
        Real-time voice pipeline using dTelecom stack
      </p>
      
      <div className="flex flex-col items-center gap-2">
        {PIPELINE_STEPS.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 w-full max-w-xs",
                activeStep === index
                  ? "border-primary bg-primary/10 neon-glow"
                  : "border-border bg-secondary/30"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  activeStep === index
                    ? step.color === "primary" ? "bg-primary" : "bg-accent"
                    : "bg-secondary"
                )}
              >
                <step.icon
                  className={cn(
                    "h-5 w-5",
                    activeStep === index
                      ? step.color === "primary" ? "text-primary-foreground" : "text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                />
              </div>
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  activeStep === index ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            
            {index < PIPELINE_STEPS.length - 1 && (
              <div className="py-1">
                <ArrowDown
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    activeStep === index || activeStep === index + 1
                      ? "text-primary animate-flow"
                      : "text-muted-foreground/30"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
