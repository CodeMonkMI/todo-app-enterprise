import { useEffect } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@todo/core/entities/todo.entities";
import { UpdateTodoDTO } from "@todo/core/repositories/todo.repository";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useUserUpdateMutations } from "../api/todoMutationApi";
import { UpdateTodoSchema } from "../schemas";

interface EditTodoModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
}

export function EditTodoModal({ todo, isOpen, onClose }: EditTodoModalProps) {
  const {
    mutateAsync: updateTodo,
    isSuccess,
    isError,
    error,
    isPending: isLoading,
  } = useUserUpdateMutations();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    setValue,
  } = useForm<UpdateTodoDTO>({ resolver: zodResolver(UpdateTodoSchema) });

  const onSubmit = async (values: UpdateTodoDTO) => {
    await updateTodo({ id: todo.id, data: values });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errs: any[] = error.response?.data;
        errs?.forEach((item) => {
          item?.path?.forEach((field: any) => {
            setError(field, { message: item.message });
          });
        });
      }
    }
  }, [error, isError, setError]);

  useEffect(() => {
    if (isOpen && todo) {
      setValue("title", todo.title);
      setValue("description", todo.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, todo]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>Update your task details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                placeholder="Enter todo title..."
                {...register("title")}
              />
              {errors.title && (
                <Alert className="border-0 ml-0 p-0">
                  <AlertDescription className="text-red-800">
                    {errors.title.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Optional description..."
                rows={3}
                {...register("description")}
              />
              {errors.description && (
                <Alert className="border-0 ml-0 p-0">
                  <AlertDescription className="text-red-800">
                    {errors.title.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">
              {isLoading ? "Updating..." : "Update Todo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
