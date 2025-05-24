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
import { useUserQuery } from "../users/api/userFetchApi";
import { CreateTodoModal } from "./components/CreateTodoModal";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import { TodoList } from "./components/TodoList";

export function TodoContainer() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const { id } = useAuth();
  const { data: userData, isSuccess } = useUserQuery(id);

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header name={user?.name} setIsCreateModalOpen={setIsCreateModalOpen} />

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

      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
