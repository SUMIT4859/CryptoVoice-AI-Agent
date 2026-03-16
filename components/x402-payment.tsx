"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Wallet, Check, Zap } from "lucide-react";

interface X402PaymentProps {
  isProcessing: boolean;
  onComplete?: () => void;
}

const PAYMENT_OPTIONS = [
  { name: "USDC", color: "oklch(0.6 0.15 200)" },
  { name: "Base", color: "oklch(0.55 0.2 240)" },
  { name: "Solana", color: "oklch(0.65 0.2 280)" },
];

export function X402Payment({ isProcessing, onComplete }: X402PaymentProps) {
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "complete">("idle");
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    if (isProcessing && paymentState === "idle") {
      setPaymentState("processing");
      setSelectedOption(Math.floor(Math.random() * PAYMENT_OPTIONS.length));
      
      const timer = setTimeout(() => {
        setPaymentState("complete");
        onComplete?.();
        
        const resetTimer = setTimeout(() => {
          setPaymentState("idle");
        }, 2000);
        
        return () => clearTimeout(resetTimer);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isProcessing, paymentState, onComplete]);

  const option = PAYMENT_OPTIONS[selectedOption];

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Wallet className="h-4 w-4 text-accent" />
        <span className="text-xs font-medium text-foreground">x402 Agent Infrastructure Payment</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-300",
            paymentState === "complete" ? "bg-primary/20" : "bg-secondary"
          )}
        >
          {paymentState === "processing" ? (
            <Zap className="h-5 w-5 text-accent animate-pulse" />
          ) : paymentState === "complete" ? (
            <Check className="h-5 w-5 text-primary" />
          ) : (
            <Wallet className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {paymentState === "idle" && (
            <p className="text-xs text-muted-foreground">
              Ready to process AI infrastructure payments
            </p>
          )}
          {paymentState === "processing" && (
            <div className="space-y-1">
              <p className="text-xs text-foreground">
                Processing via <span className="font-medium" style={{ color: option.color }}>{option.name}</span>
              </p>
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full animate-pulse"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          )}
          {paymentState === "complete" && (
            <p className="text-xs text-primary">
              Agent paid for infrastructure using x402
            </p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        {PAYMENT_OPTIONS.map((opt, i) => (
          <div
            key={opt.name}
            className={cn(
              "px-2 py-1 rounded text-xs transition-all duration-200",
              paymentState !== "idle" && i === selectedOption
                ? "bg-secondary border border-primary/30"
                : "bg-secondary/50 text-muted-foreground"
            )}
            style={paymentState !== "idle" && i === selectedOption ? { color: opt.color } : {}}
          >
            {opt.name}
          </div>
        ))}
      </div>
    </div>
  );
}
