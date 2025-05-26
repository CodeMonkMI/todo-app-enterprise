import { AuthState } from "@/contexts/AuthContext";
import { PermissionManger } from "@todo/pm/esm/permission-manger";
import { useMemo } from "react";

export const usePermissionManager = (auth: AuthState) => {
  const pm = useMemo(() => {
    if (!auth.isAuthenticated || !auth.role) return null;
    return new PermissionManger({
      roles: [auth.role],
      permission: [],
    });
  }, [auth]);

  return pm;
};
