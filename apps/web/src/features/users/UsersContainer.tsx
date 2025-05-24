import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Mail,
  Shield,
  UserPlus,
  Users as UsersIcon,
} from "lucide-react";

// Mock users for display
const mockUsers = [
  {
    id: "1",
    email: "superadmin@todo.com",
    name: "Super Admin",
    role: "SUPER_ADMIN",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "admin@todo.com",
    name: "Admin User",
    role: "ADMIN",
    createdAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "3",
    email: "user@todo.com",
    name: "Regular User",
    role: "USER",
    createdAt: "2024-02-01T09:15:00Z",
  },
  {
    id: "4",
    email: "john.doe@todo.com",
    name: "John Doe",
    role: "USER",
    createdAt: "2024-02-10T16:45:00Z",
  },
  {
    id: "5",
    email: "jane.smith@todo.com",
    name: "Jane Smith",
    role: "USER",
    createdAt: "2024-02-15T11:20:00Z",
  },
];

export function UsersContainer() {
  const { user } = useAuth();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-red-100 text-red-800";
      case "ADMIN":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter users based on current user's role
  const visibleUsers =
    user.role === "SUPER_ADMIN"
      ? mockUsers
      : mockUsers.filter((u) => u.role === "USER");

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage user accounts and permissions
            </p>
          </div>

          <Button className="shadow-sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visibleUsers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Super Admins
              </CardTitle>
              <Shield className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {user.role === "SUPER_ADMIN"
                  ? visibleUsers.filter((u) => u.role === "SUPER_ADMIN").length
                  : "-"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {user.role === "SUPER_ADMIN"
                  ? visibleUsers.filter((u) => u.role === "ADMIN").length
                  : "0"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Regular Users
              </CardTitle>
              <UsersIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {visibleUsers.filter((u) => u.role === "USER").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              {user.role === "SUPER_ADMIN"
                ? "All users in the system"
                : "Regular users you can manage"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visibleUsers.map((userItem) => (
                <div
                  key={userItem.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <UsersIcon className="w-5 h-5 text-gray-600" />
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900">
                        {userItem.name}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {userItem.email}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Joined {formatDate(userItem.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge className={getRoleBadgeColor(userItem.role)}>
                      <Shield className="w-3 h-3 mr-1" />
                      {userItem.role.replace("_", " ")}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {(user.role === "SUPER_ADMIN" ||
                        (user.role === "ADMIN" &&
                          userItem.role === "USER")) && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
