import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useUserQuery } from "@/features/users/api/userFetchApi";
import { authToken } from "@/lib/token/AuthToken";
import { User } from "@todo/core/entities/user.entities";

import {
  CheckSquare,
  LogOut,
  Settings,
  Shield,
  User as UserIcon,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "My Todos",
    url: "/dashboard",
    icon: CheckSquare,
    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "User Management",
    url: "/users",
    icon: Users,
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserIcon,
    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
];

export function AppSidebar() {
  const { logout, role, id } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const { data: userData, isSuccess, isError } = useUserQuery(id);

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    authToken.remove();
    navigate("/");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toUpperCase()) {
      case "SUPER_ADMIN":
        return "bg-red-100 text-red-800";
      case "ADMIN":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Todo App</h2>
            <p className="text-sm text-gray-600">Enterprise Edition</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(role || "")}`}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {role.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
