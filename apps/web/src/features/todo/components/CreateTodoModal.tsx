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
import { useTodos } from "@/contexts/TodoContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTodoDTO } from "@todo/core/repositories/todo.repository";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTodoCreateMutations } from "../api/todoMutationApi";
import { CreateTodoSchema } from "../schemas";

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTodoModal({ isOpen, onClose }: CreateTodoModalProps) {
  const { isLoading } = useTodos();

  const {
    mutateAsync: createTodo,
    isSuccess,
    isError,
    error,
  } = useTodoCreateMutations();

  const {
    register,
    reset,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<CreateTodoDTO>({ resolver: zodResolver(CreateTodoSchema) });

  const onSubmit = async (values: CreateTodoDTO) => {
    await createTodo(values);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Add a new task to your todo list. Give it a clear title and optional
            description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description..."
                rows={3}
                {...register("description")}
              />
              {errors.description && (
                <Alert className="border-0 ml-0 p-0">
                  <AlertDescription className="text-red-800">
                    {errors.description.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button type="submit">
              {isLoading ? "Creating..." : "Create Todo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
