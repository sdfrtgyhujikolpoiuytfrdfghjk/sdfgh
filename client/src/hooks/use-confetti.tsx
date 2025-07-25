import { useCallback } from "react";

export function useConfetti() {
  const triggerConfetti = useCallback(() => {
    // Simple confetti implementation using CSS animations
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'fixed inset-0 pointer-events-none z-[9999]';
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2 h-2 opacity-90';
      confetti.style.backgroundColor = ['#4B0082', '#10B981', '#F59E0B', '#EF4444'][i % 4];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animation = 'confetti-fall 3s linear forwards';
      confettiContainer.appendChild(confetti);
    }
    
    document.body.appendChild(confettiContainer);
    
    // Add CSS animation if not already present
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = `
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Clean up after animation
    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 3000);
  }, []);

  return { triggerConfetti };
}
