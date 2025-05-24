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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserID } from "@todo/core/repositories/user.repository";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserUpdateMutations } from "../api/userMutationApi";
import { UpdateUserSchema, UserRoleEnum } from "../schemas";

interface EditUserModalProps {
  role: UserRoleEnum;
  id: UserID;
  isOpen: boolean;
  onClose: () => void;
}

type FormValue = z.infer<typeof UpdateUserSchema>;

export function EditUserModal({
  role,
  isOpen,
  onClose,
  id,
}: EditUserModalProps) {
  const {
    mutateAsync: updateTodo,
    isSuccess,
    isError,
    error,
    isPending: isLoading,
  } = useUserUpdateMutations();

  const {
    formState: { errors },
    setError,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormValue>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const onSubmit = async (values: FormValue) => {
    await updateTodo({ id, data: values });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errs: any[] = error?.response?.data;
        if (Array.isArray(errs)) {
          errs?.forEach((item) => {
            item?.path?.forEach((field: any) => {
              setError(field, { message: item.message });
            });
          });
        }
      }
    }
  }, [error, isError, setError]);

  useEffect(() => {
    if (isOpen && role) {
      setValue("role", role as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, role]);

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
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
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
            <Button
              variant="outline"
              onClick={() => {
                onClose();
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">
              {isLoading ? "Updating..." : "Update User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
