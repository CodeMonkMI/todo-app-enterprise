import { HasRole } from "@/components/AuthGuard/AuthGuard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UsersContainer } from "@/features/users";
import { Navigate } from "react-router-dom";

export default function Users() {
  return (
    <HasRole requiredRole="admin" fallback={<Navigate to={"/"} />}>
      <DashboardLayout>
        <UsersContainer />
      </DashboardLayout>
    </HasRole>
  );
}
