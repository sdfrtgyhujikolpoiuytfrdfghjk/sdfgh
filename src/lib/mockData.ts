export interface Client {
  id: string;
  name: string;
  industry: string;
  status: "active" | "inactive";
  revenue: number;
  lastActivity: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft";
  dueDate: string;
  issueDate: string;
  description: string;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: "approved" | "pending" | "flagged";
  receipt?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  status: "active" | "inactive";
  avatar?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  clientId?: string;
}

export interface AIInsight {
  id: string;
  type: "warning" | "info" | "success" | "opportunity";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actionable: boolean;
}

// Mock data
export const mockClients: Client[] = [
  {
    id: "1",
    name: "TechStart Inc.",
    industry: "Technology",
    status: "active",
    revenue: 45230,
    lastActivity: "2024-01-15",
  },
  {
    id: "2",
    name: "Downtown Cafe",
    industry: "Restaurant",
    status: "active",
    revenue: 23450,
    lastActivity: "2024-01-14",
  },
  {
    id: "3",
    name: "Green Energy Co.",
    industry: "Energy",
    status: "active",
    revenue: 78900,
    lastActivity: "2024-01-13",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "#1024",
    clientId: "1",
    clientName: "TechStart Inc.",
    amount: 3200,
    status: "overdue",
    dueDate: "2024-01-10",
    issueDate: "2023-12-25",
    description: "Web Development Services",
  },
  {
    id: "2",
    number: "#1023",
    clientId: "2",
    clientName: "Downtown Cafe",
    amount: 1500,
    status: "paid",
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    description: "Monthly Retainer",
  },
  {
    id: "3",
    number: "#1022",
    clientId: "3",
    clientName: "Green Energy Co.",
    amount: 5600,
    status: "pending",
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    description: "Consulting Services",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Office Depot - Office Supplies",
    amount: 156.78,
    category: "Office Supplies",
    status: "flagged",
  },
  {
    id: "2",
    date: "2024-01-12",
    description: "Uber - Business Travel",
    amount: 45.30,
    category: "Travel",
    status: "approved",
  },
  {
    id: "3",
    date: "2024-01-10",
    description: "Adobe Creative Suite",
    amount: 52.99,
    category: "Software",
    status: "approved",
  },
];

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@techstart.com",
    role: "Senior Developer",
    department: "Engineering",
    salary: 95000,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Davis",
    email: "sarah@techstart.com",
    role: "Product Manager",
    department: "Product",
    salary: 85000,
    status: "active",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Office Supplies",
    amount: -89.50,
    type: "expense",
    category: "Office Supplies",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Client Payment",
    amount: 2500.00,
    type: "income",
    category: "Revenue",
    clientId: "1",
  },
];

export const mockInsights: AIInsight[] = [
  {
    id: "1",
    type: "warning",
    title: "Unusual Expense Pattern",
    description: "Office supplies spending increased 40% this month",
    priority: "medium",
    actionable: true,
  },
  {
    id: "2",
    type: "opportunity",
    title: "Tax Deduction Opportunity",
    description: "$2,400 in eligible home office deductions",
    priority: "high",
    actionable: true,
  },
  {
    id: "3",
    type: "info",
    title: "Cash Flow Optimization",
    description: "Consider offering 2% early payment discount",
    priority: "low",
    actionable: true,
  },
];

// API simulation functions
export async function fetchClients(): Promise<Client[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockClients;
}

export async function fetchInvoices(): Promise<Invoice[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInvoices;
}

export async function fetchExpenses(): Promise<Expense[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockExpenses;
}

export async function fetchEmployees(): Promise<Employee[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEmployees;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTransactions;
}

export async function fetchInsights(): Promise<AIInsight[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInsights;
}
