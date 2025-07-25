import { useState } from "react";
import { MessageCircle, Send, X, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIChat } from "@/hooks/use-ai-chat";

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading } = useAIChat();
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "Categorize expenses",
    "Review invoices", 
    "Generate report",
    "Check cash flow"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full app-purple hover:app-purple-light shadow-lg hover-lift bounce-gentle"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Chat Popover */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 slide-in">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 app-purple rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-purple-100">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-purple-100 hover:text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 app-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <div className="app-gray rounded-lg p-3 text-sm text-app-black">
                  👋 Hi! I'm your AI accounting assistant. I can help you with invoicing, expense categorization, financial insights, and more. What would you like to know?
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex items-start space-x-2 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}>
                  {message.sender === "ai" && (
                    <div className="w-6 h-6 app-purple rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className={`rounded-lg p-3 text-sm max-w-xs ${
                    message.sender === "user" 
                      ? "app-purple text-white" 
                      : "app-gray text-app-black"
                  }`}>
                    {message.content}
                  </div>
                  {message.sender === "user" && (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-600">U</span>
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 app-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <div className="app-gray rounded-lg p-3 text-sm text-app-black">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {messages.length === 0 && (
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      sendMessage(action);
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="app-purple hover:app-purple-light"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
