import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Users, 
  BarChart3, 
  Settings,
  BrainCircuit,
  Plus
} from "lucide-react";

const navigationItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/invoicing", icon: FileText, label: "Invoicing" },
  { href: "/expenses", icon: Receipt, label: "Expenses" },
  { href: "/payroll", icon: Users, label: "Payroll" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-[hsl(var(--app-black))] text-white flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-[hsl(var(--app-purple))] rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">AI Accounting</span>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 sidebar-hover",
                  isActive 
                    ? "bg-[hsl(var(--app-purple))] text-white" 
                    : "text-gray-300 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <Link
            href="/onboarding"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white sidebar-hover transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add Client</span>
          </Link>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[hsl(var(--app-purple))] rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
