import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@todo/core/entities/user.entities";
import { useEffect, useState } from "react";
import { useMeQuery } from "../users/api/userQueryApi";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import { TodoList } from "./components/TodoList";

export function TodoContainer() {
  const [user, setUser] = useState<User | null>(null);

  const { data: userData, isSuccess } = useMeQuery();

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header name={user?.name} />

      <StatsCards />

      {/* Todo List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>
            Manage and track your personal todos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoList />
        </CardContent>
      </Card>
    </div>
  );
}
