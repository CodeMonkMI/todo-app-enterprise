export const RoleHierarchy: Record<string, string[]> = {
  super_admin: ["admin"],
  admin: ["user"],
  user: [],
} as const;

export const RoleBasedPermissions: Record<string, string[]> = {
  super_admin: ["user:update", "user:delete"],
  admin: ["user:create", "user:all", "user:one"],
  user: ["todo:create", "todo:all", "todo:one", "todo:update", "todo:delete"],
} as const;
