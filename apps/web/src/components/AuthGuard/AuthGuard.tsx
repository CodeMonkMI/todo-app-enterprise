import { useAuth } from "@/contexts/AuthContext";
import { usePermissionManager } from "@/hooks/usePermissionManager";
import React, { ReactNode } from "react";

export type AuthGuardProps = {
  children: ReactNode;
  requiredRole?: string;
  requiredPermissions?: string | string[];
  fallback?: ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
  const {
    children,
    requiredRole,
    requiredPermissions,
    fallback = null,
  } = props;
  const auth = useAuth();
  const pm = usePermissionManager(auth);

  const checkRole = () => {
    if (!requiredRole) return true;

    return pm?.hasRole(requiredRole) ?? false;
  };

  const checkPermissions = () => {
    if (!requiredPermissions) return true;
    if (Array.isArray(requiredPermissions)) {
      return pm?.hasPermissions(requiredPermissions) ?? false;
    }
    return pm?.hasPermission(requiredPermissions);
  };

  const hasAccess = checkRole() && checkPermissions();

  return hasAccess ? children : (fallback ?? null);
};

const DefaultFallback = () => {
  return <div>You are not authorized!</div>;
};

export const HasRole: React.FC<
  Omit<AuthGuardProps, "requiredPermissions"> & { requiredRole: string }
> = (props) => {
  return <AuthGuard {...props} />;
};

export const HasPermission: React.FC<
  Omit<AuthGuardProps, "requiredRole"> & {
    requiredPermissions: string | string[];
  }
> = (props) => {
  return <AuthGuard {...props} />;
};

export const HasRoleAndPermission: React.FC<
  AuthGuardProps & {
    requiredPermissions: string | string[];
    requiredRole: string;
  }
> = (props) => {
  return <AuthGuard {...props} />;
};
