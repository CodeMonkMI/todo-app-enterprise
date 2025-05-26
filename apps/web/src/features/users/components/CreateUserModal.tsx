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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { HasRole } from "@/components/AuthGuard/AuthGuard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserDTO } from "@todo/core/repositories/user.repository";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserCreateMutations } from "../api/userMutationApi";
import { CreateUserSchema } from "../schemas";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const {
    mutateAsync: createTodo,
    isSuccess,
    isError,
    error,
    isPending: isLoading,
  } = useUserCreateMutations();

  const {
    register,
    reset,
    formState: { errors },
    setError,
    handleSubmit,
    watch,
    setValue,
  } = useForm<CreateUserDTO>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      role: "USER",
    },
  });

  const onSubmit = async (values: CreateUserDTO) => {
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
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to your user list.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Enter fullname"
                {...register("name")}
              />
              {errors.name && (
                <Alert className="border-0 ml-0 p-0">
                  <AlertDescription className="text-red-800">
                    {errors.name.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <Alert className="border-0 ml-0 p-0">
                  <AlertDescription className="text-red-800">
                    {errors.email.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password")}
              />
              {errors.password && (
                <Alert className="border-0 ml-0 p-0">
                  <AlertDescription className="text-red-800">
                    {errors.password.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                defaultValue="USER"
                value={watch("role")}
                onValueChange={(v: any) => {
                  setValue("role", v);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <HasRole requiredRole="super_admin">
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  </HasRole>
                </SelectContent>
              </Select>
              {errors.role && (
                <Alert className="border-0 ml-0 p-0">
                  <AlertDescription className="text-red-800">
                    {errors.role.message}
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
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
