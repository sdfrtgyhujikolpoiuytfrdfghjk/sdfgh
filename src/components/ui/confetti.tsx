import React from "react";
import { useConfetti } from "@/hooks/useConfetti";

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "celebration";
  disabled?: boolean;
}

export function ConfettiButton({
  children,
  onClick,
  className = "",
  variant = "default",
  disabled = false,
}: ConfettiButtonProps) {
  const { fireConfetti, fireCelebration } = useConfetti();

  const handleClick = () => {
    if (!disabled) {
      if (variant === "celebration") {
        fireCelebration();
      } else {
        fireConfetti();
      }
      onClick?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
