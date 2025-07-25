import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: "1",
    title: "Invoice #1024 is overdue",
    description: "TechStart Inc. • 5 minutes ago",
    type: "warning"
  },
  {
    id: "2", 
    title: "Payroll processed successfully",
    description: "Downtown Cafe • 1 hour ago",
    type: "success"
  },
  {
    id: "3",
    title: "New expense report uploaded",
    description: "Green Energy Co. • 2 hours ago", 
    type: "info"
  }
];

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-2xl font-semibold text-app-black">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back! Here's what's happening with your clients.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full notification-pulse" />
            </Button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-app-black">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === "warning" ? "bg-yellow-500" :
                          notification.type === "success" ? "bg-green-500" : 
                          "bg-app-purple"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-app-black">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowNotifications(false)}
                  >
                    Mark All as Read
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 app-purple rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">JD</span>
            </div>
            <span className="text-sm font-medium text-app-black">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
