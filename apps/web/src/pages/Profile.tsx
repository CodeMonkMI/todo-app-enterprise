import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileContainer } from "@/features/profile";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      <ProfileContainer />
    </DashboardLayout>
  );
}
