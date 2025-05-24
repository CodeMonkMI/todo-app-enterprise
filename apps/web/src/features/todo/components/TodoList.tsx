import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Todo } from "@todo/core/entities/todo.entities";
import { CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useTodosQuery } from "../api/userFetchApi";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { data: usersData, isSuccess, isPending } = useTodosQuery();

  useEffect(() => {
    if (isSuccess) {
      setTodos((usersData as any).data);
    }
  }, [isSuccess, usersData]);

  if (isPending) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <CardTitle className="text-lg mb-2">No todos yet</CardTitle>
          <CardDescription>
            Create your first todo to get started organizing your tasks.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="space-y-6">
      {pendingTodos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">
            Pending Tasks ({pendingTodos.length})
          </h3>
          <div className="space-y-3">
            {pendingTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-500">
            Completed Tasks ({completedTodos.length})
          </h3>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
