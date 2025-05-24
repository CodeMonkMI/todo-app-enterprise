import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@todo/core/entities/user.entities";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsersQuery } from "../../api/userQueryApi";
import SingleUser from "./SingleUser";

export const UserList = () => {
  const { role } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  const [searchParam] = useSearchParams();

  const page = Number(searchParam.get("page")) || 1;
  const limit = Number(searchParam.get("limit")) || 10;

  const { data: usersData, isSuccess } = useUsersQuery({ limit, page });

  useEffect(() => {
    if (isSuccess) {
      setUsers((usersData as any).data);
    }
  }, [isSuccess, usersData]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {role.toUpperCase() === "SUPER_ADMIN"
              ? "All users in the system"
              : "Regular users you can manage"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <SingleUser
                id={user.id}
                email={user.email}
                name={user.name}
                role={user.role}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;
