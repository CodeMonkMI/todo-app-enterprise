import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { UsersContainer } from "@/features/users";
import { Navigate } from "react-router-dom";

export default function Users() {
  const { user } = useAuth();

  // Check if user has permission to view users
  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <UsersContainer />
    </DashboardLayout>
  );
}
