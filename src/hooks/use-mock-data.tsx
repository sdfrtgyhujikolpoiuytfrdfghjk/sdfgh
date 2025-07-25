import { useQuery } from "@tanstack/react-query";
import { mockClients, mockInvoices, mockExpenses, mockEmployees, mockNotifications, mockAIInsights } from "@/lib/mock-data";

export function useMockClients() {
  return useQuery({
    queryKey: ["/api/clients"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockClients;
    },
  });
}

export function useMockInvoices() {
  return useQuery({
    queryKey: ["/api/invoices"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockInvoices;
    },
  });
}

export function useMockExpenses() {
  return useQuery({
    queryKey: ["/api/expenses"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockExpenses;
    },
  });
}

export function useMockEmployees() {
  return useQuery({
    queryKey: ["/api/employees"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 350));
      return mockEmployees;
    },
  });
}

export function useMockNotifications() {
  return useQuery({
    queryKey: ["/api/notifications"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockNotifications;
    },
  });
}

export function useMockAIInsights() {
  return useQuery({
    queryKey: ["/api/ai-insights"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAIInsights;
    },
  });
}
