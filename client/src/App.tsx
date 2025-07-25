import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

// Pages
import LoginPage from "@/pages/login";
import OnboardingPage from "@/pages/onboarding";
import DashboardPage from "@/pages/dashboard";
import InvoicingPage from "@/pages/invoicing";
import ExpensesPage from "@/pages/expenses";
import PayrollPage from "@/pages/payroll";
import ReportsPage from "@/pages/reports";
import SettingsPage from "@/pages/settings";
import NotFound from "@/pages/not-found";

// Layout Components
import Sidebar from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import AIChatBubble from "@/components/layout/AIChatBubble";

// Context for app state
import { createContext, useContext } from "react";

interface AppContextType {
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/" component={DashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/invoicing" component={InvoicingPage} />
      <Route path="/expenses" component={ExpensesPage} />
      <Route path="/payroll" component={PayrollPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isAuthenticated } = useAppContext();
  const [location] = useState(window.location.pathname);

  useEffect(() => {
    if (!isAuthenticated && location !== "/login") {
      window.location.href = "/login";
    }
  }, [isAuthenticated, location]);

  return (
    <div className="flex h-screen bg-app-gray">
      {location === "/login" ? (
        <Router />
      ) : (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto bg-app-gray">
              <Router />
            </main>
          </div>
          <AIChatBubble />
        </>
      )}
    </div>
  );
}

function App() {
  const [selectedClient, setSelectedClient] = useState("TechStart Inc.");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session
  useEffect(() => {
    const session = localStorage.getItem("ai-accounting-session");
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ai-accounting-session");
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContext.Provider
          value={{
            selectedClient,
            setSelectedClient,
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          <Toaster />
          <AppContent />
        </AppContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;