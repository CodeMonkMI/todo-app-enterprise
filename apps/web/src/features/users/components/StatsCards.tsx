import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@todo/core/entities/user.entities";
import { Shield, Users as UsersIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useUsersQuery } from "../api/userQueryApi";

const StatsCards = () => {
  const { role } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  const { data: usersData, isSuccess } = useUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      setUsers((usersData as any).data);
    }
  }, [isSuccess, usersData]);

  // Filter users based on current user's role
  const visibleUsers =
    role.toUpperCase() === "SUPER_ADMIN"
      ? users
      : users.filter((u) => u.role === "USER");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={<div className="text-2xl font-bold">{visibleUsers.length}</div>}
        icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Super Admins"
        value={
          <div className="text-2xl font-bold text-red-600">
            {role.toUpperCase() === "SUPER_ADMIN"
              ? visibleUsers.filter((u) => u.role === "SUPER_ADMIN").length
              : "-"}
          </div>
        }
        icon={<Shield className="h-4 w-4 text-red-500" />}
      />

      <StatCard
        title="Admins"
        value={
          <div className="text-2xl font-bold text-blue-600">
            {role.toUpperCase() === "SUPER_ADMIN"
              ? visibleUsers.filter((u) => u.role === "ADMIN").length
              : "0"}
          </div>
        }
        icon={<UsersIcon className="h-4 w-4 text-green-500" />}
      />
      <StatCard
        title="Regular user"
        value={visibleUsers.filter((u) => u.role === "USER").length}
        icon={<UsersIcon className="h-4 w-4 text-green-500" />}
      />
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && icon}
      </CardHeader>
      <CardContent>
        {(typeof value === "string" || typeof value === "number") && (
          <div className="text-2xl font-bold text-green-600">{value}</div>
        )}
        {typeof value === "object" && value}
      </CardContent>
    </Card>
  );
};

export default StatsCards;
