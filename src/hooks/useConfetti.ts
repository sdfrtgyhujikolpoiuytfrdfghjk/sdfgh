import { useCallback } from "react";

interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

declare global {
  interface Window {
    confetti: (options?: ConfettiOptions) => void;
  }
}

export function useConfetti() {
  const fireConfetti = useCallback((options?: ConfettiOptions) => {
    // If confetti library is not loaded, create a simple fallback
    if (typeof window.confetti === "undefined") {
      // Simple confetti fallback using CSS animations
      const container = document.createElement("div");
      container.className = "fixed inset-0 pointer-events-none z-50";
      document.body.appendChild(container);

      const colors = ["#4B0082", "#6A1B9A", "#8E24AA", "#AB47BC"];
      
      for (let i = 0; i < (options?.particleCount || 100); i++) {
        const confettiPiece = document.createElement("div");
        confettiPiece.className = "absolute w-2 h-2 opacity-90";
        confettiPiece.style.backgroundColor = colors[i % colors.length];
        confettiPiece.style.left = (options?.origin?.x || 0.5) * 100 + "%";
        confettiPiece.style.top = (options?.origin?.y || 0.6) * 100 + "%";
        confettiPiece.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiPiece.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(confettiPiece);
      }

      // Add keyframes if not already added
      if (!document.querySelector("#confetti-keyframes")) {
        const style = document.createElement("style");
        style.id = "confetti-keyframes";
        style.textContent = `
          @keyframes confetti-fall {
            to {
              transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(720deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Clean up after animation
      setTimeout(() => {
        document.body.removeChild(container);
      }, 5000);
    } else {
      // Use the actual confetti library if available
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4B0082", "#6A1B9A", "#8E24AA", "#AB47BC"],
        ...options,
      });
    }
  }, []);

  const fireCelebration = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#4B0082", "#6A1B9A", "#8E24AA", "#AB47BC"],
    };

    function fire(particleRatio: number, opts: ConfettiOptions) {
      fireConfetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [fireConfetti]);

  return {
    fireConfetti,
    fireCelebration,
  };
}
