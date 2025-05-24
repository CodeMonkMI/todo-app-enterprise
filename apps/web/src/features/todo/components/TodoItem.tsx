import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@todo/core/entities/todo.entities";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import {
  useTodoDeleteMutations,
  useTodoUpdateMutations,
} from "../api/todoMutationApi";
import { EditTodoModal } from "./EditTodoModal";

type TodoItemProps = Todo;

export function TodoItem(props: TodoItemProps) {
  const { completed, description, id, title, createdAt } = props;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutateAsync: updateTodo } = useTodoUpdateMutations();
  const { mutateAsync: deleteTodo } = useTodoDeleteMutations();

  const handleToggleComplete = async () => {
    await updateTodo({ id, data: { completed: !completed } });
  };

  const handleDelete = async () => {
    await deleteTodo(id);
  };
  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <>
      <Card
        className={`transition-all hover:shadow-md ${completed ? "bg-gray-50" : "bg-white"}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Checkbox
              checked={completed}
              onCheckedChange={handleToggleComplete}
              className="mt-1"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4
                    className={`font-medium ${completed ? "line-through text-gray-500" : "text-gray-900"}`}
                  >
                    {title}
                  </h4>

                  {description && (
                    <p
                      className={`mt-1 text-sm ${completed ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {description}
                    </p>
                  )}

                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      Created {formatDate(createdAt)}
                    </div>

                    {completed && (
                      <Badge variant="secondary" className="text-xs">
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTodoModal
        todo={props as any}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
