import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I can help you with that! Let me analyze your data...",
        "Based on your recent transactions, I recommend...",
        "I've found some insights in your financial data. Would you like me to create a report?",
        "Let me walk you through this process step by step.",
        "I can automate this task for you. Would you like me to proceed?",
        "I notice some patterns in your expenses. Here's what I found...",
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}