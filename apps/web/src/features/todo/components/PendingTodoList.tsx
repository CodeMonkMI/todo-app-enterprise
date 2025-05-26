import CustomPagination from "@/components/CustomPagination/CustomPagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Todo } from "@todo/core/entities/todo.entities";
import { CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTodosQuery } from "../api/todoQueryApi";
import { TodoItem } from "./TodoItem";

export function PendingTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchParam, setSearchParam] = useSearchParams();

  const page = Number(searchParam.get("page")) || 1;
  const limit = Number(searchParam.get("limit")) || 5;

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParam.toString());
    newSearchParams.set("limit", "5");
    setSearchParam(newSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: usersData,
    isSuccess,
    isPending,
  } = useTodosQuery({
    pagination: { limit, page },
    filter: {
      completed: false,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTotalPages(usersData.pagination.totalPages);
      setTodos(usersData.data);
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

  return (
    <div className="space-y-6">
      {todos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">
            Pending Tasks ({todos.length})
          </h3>
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                description={todo.description}
                title={todo.title}
                createdAt={todo.createdAt}
              />
            ))}
          </div>
        </div>
      )}
      <CustomPagination totalPages={totalPages} />
    </div>
  );
}
