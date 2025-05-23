import { RoleBasedPermissions, RoleHierarchy } from "./config";

interface PermissionContext {
  roles: string[];
  permission: string[];
}

export class PermissionManger {
  private readonly cachedRoleHierarchy: Map<string, Set<string>> = new Map();
  private readonly cachedRolePermissions: Map<string, Set<string>> = new Map();

  constructor(private readonly context: PermissionContext) {
    // flatten the role hierarchy
    Object.keys(RoleHierarchy).forEach((role) => {
      this.cachedRoleHierarchy.set(role, this.computeRoleHierarchy(role));
    });

    // flatten the role permission
    Object.keys(RoleBasedPermissions).forEach((role) => {
      this.cachedRolePermissions.set(role, this.computeRolePermissions(role));
    });
  }

  hasPermission(requiredPermission: string) {
    if (this.context.permission.includes(requiredPermission)) {
      return true;
    }
    return this.hasPermissionThroughRole(
      this.context.roles,
      requiredPermission
    );
  }

  hasPermissions(requiredPermissions: string[]) {
    return requiredPermissions.every((permission) =>
      this.hasPermission(permission)
    );
  }

  hasAnyPermission(requiredPermissions: string[]) {
    return requiredPermissions.some((permission) =>
      this.hasPermission(permission)
    );
  }

  hasRole(requiredRole: string) {
    return this.context.roles.some((role) => {
      if (role === requiredRole) return true;
      return this.cachedRoleHierarchy.get(role)?.has(requiredRole);
    });
  }

  getMaxRole() {
    return this.context.roles?.reduce(
      (maxRole: string, currentRole: string) => {
        return this.cachedRoleHierarchy?.get(maxRole)?.has(currentRole)
          ? maxRole
          : currentRole;
      },
      this.context.roles[0]!
    );
  }

  //   private methods

  private computeRoleHierarchy(role: string, visited: Set<string> = new Set()) {
    const result = new Set<string>();

    if (visited.has(role)) {
      return result;
    }

    visited.add(role);

    const inheritedRoles = RoleHierarchy[role] || [];
    inheritedRoles.forEach((inheritedRole) => {
      result.add(inheritedRole);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inheritedHierarchy: any = this.computeRoleHierarchy(
        inheritedRole,
        visited
      );
      inheritedHierarchy.forEach((r: string) => result.add(r));
    });
    return result;
  }

  private computeRolePermissions(
    role: string,
    visited: Set<string> = new Set()
  ) {
    const result = new Set<string>();

    if (visited.has(role)) {
      return result;
    }

    visited.add(role);

    RoleBasedPermissions[role]?.forEach((permission) => result.add(permission));

    const hierarchySets = this.cachedRoleHierarchy.get(role);
    hierarchySets?.forEach((inheritRole) => {
      RoleBasedPermissions[inheritRole]?.forEach((p) => result.add(p));
    });

    return result;
  }

  private hasPermissionThroughRole(roles: string[], permission: string) {
    return roles.some((role) =>
      this.cachedRolePermissions.get(role)?.has(permission)
    );
  }
}
