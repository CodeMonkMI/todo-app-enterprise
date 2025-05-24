import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { UsersContainer } from "@/features/users";
import { Navigate } from "react-router-dom";

export default function Users() {
  const { role } = useAuth();
  console.log(role);
  // Check if user has permission to view users
  if (!["ADMIN", "SUPER_ADMIN"].includes(role.toUpperCase())) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <UsersContainer />
    </DashboardLayout>
  );
}
