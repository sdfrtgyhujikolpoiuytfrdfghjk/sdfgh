@@ .. @@
 import { useState } from "react";
 import { Bell, ChevronDown, Menu } from "lucide-react";
 import { Button } from "@/components/ui/button";
-import {
-  DropdownMenu,
-  DropdownMenuContent,
-  DropdownMenuItem,
-  DropdownMenuTrigger,
-} from "@/components/ui/dropdown-menu";
+import { Plus } from "lucide-react";
 import { useMockClients, useMockNotifications } from "@/hooks/use-mock-data";

@@ .. @@
 export function Header() {
   const [selectedClient, setSelectedClient] = useState("TechStart Inc.");
+  const [showClientDropdown, setShowClientDropdown] = useState(false);
+  const [showNotifications, setShowNotifications] = useState(false);
   const { data: clients } = useMockClients();
   const { data: notifications } = useMockNotifications();

@@ .. @@
           </Button>
           
           {/* Client Selector */}
-          <DropdownMenu>
-            <DropdownMenuTrigger asChild>
-              <Button variant="outline" className="flex items-center space-x-2">
-                <span className="text-sm font-medium">{selectedClient}</span>
-                <ChevronDown className="w-4 h-4" />
-              </Button>
-            </DropdownMenuTrigger>
-            <DropdownMenuContent className="w-64">
+          <div className="relative">
+            <Button 
+              variant="outline" 
+              className="flex items-center space-x-2"
+              onClick={() => setShowClientDropdown(!showClientDropdown)}
+            >
+              <span className="text-sm font-medium">{selectedClient}</span>
+              <ChevronDown className="w-4 h-4" />
+            </Button>
+            {showClientDropdown && (
+              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
               <div className="p-2">
@@ .. @@
                   Clients
                 </div>
                 {clients?.map((client) => (
-                  <DropdownMenuItem
+                  <button
                     key={client.id}
-                    onClick={() => setSelectedClient(client.name)}
-                    className="px-3 py-2"
+                    onClick={() => {
+                      setSelectedClient(client.name);
+                      setShowClientDropdown(false);
+                    }}
+                    className="w-full px-3 py-2 text-left hover:bg-gray-100 rounded"
                   >
                     <div>
                       <div className="font-medium">{client.name}</div>
                       <div className="text-xs text-muted-foreground">{client.industry}</div>
                     </div>
-                  </DropdownMenuItem>
+                  </button>
                 ))}
                 <div className="border-t pt-2 mt-2">
-                  <DropdownMenuItem className="px-3 py-2 text-[hsl(var(--app-purple))]">
+                  <button className="w-full px-3 py-2 text-left text-[hsl(var(--app-purple))] hover:bg-gray-100 rounded flex items-center">
                     <Plus className="w-4 h-4 mr-2" />
                     Add New Client
-                  </DropdownMenuItem>
+                  </button>
                 </div>
               </div>
-            </DropdownMenuContent>
-          </DropdownMenu>
+              </div>
+            )}
+          </div>
         </div>

@@ .. @@
         <div className="flex items-center space-x-4">
           {/* Notifications */}
-          <DropdownMenu>
-            <DropdownMenuTrigger asChild>
-              <Button variant="ghost" size="sm" className="relative">
-                <Bell className="w-5 h-5" />
-                {notifications && notifications.length > 0 && (
-                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
-                )}
-              </Button>
-            </DropdownMenuTrigger>
-            <DropdownMenuContent className="w-80" align="end">
+          <div className="relative">
+            <Button 
+              variant="ghost" 
+              size="sm" 
+              className="relative"
+              onClick={() => setShowNotifications(!showNotifications)}
+            >
+              <Bell className="w-5 h-5" />
+              {notifications && notifications.length > 0 && (
+                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
+              )}
+            </Button>
+            {showNotifications && (
+              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
               <div className="p-4 border-b">
@@ .. @@
               <div className="max-h-80 overflow-y-auto">
                 {notifications?.map((notification) => (
-                  <DropdownMenuItem key={notification.id} className="p-4 border-b last:border-b-0">
+                  <div key={notification.id} className="p-4 border-b last:border-b-0">
                     <div className="flex items-start space-x-3 w-full">
@@ .. @@
                       </div>
                     </div>
-                  </DropdownMenuItem>
+                  </div>
                 ))}
               </div>
-            </DropdownMenuContent>
-          </DropdownMenu>
+              </div>
+            )}
+          </div>

           {/* User Menu */}