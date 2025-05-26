import { HasRoleAndPermission } from "@/components/AuthGuard/AuthGuard";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { CreateUserModal } from "./CreateUserModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts and permissions
          </p>
        </div>

        <HasRoleAndPermission
          requiredRole="admin"
          requiredPermissions={["user:create"]}
        >
          <Button className="shadow-sm" onClick={() => setIsOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </HasRoleAndPermission>
      </div>

      <HasRoleAndPermission
        requiredRole="admin"
        requiredPermissions={["user:create"]}
      >
        <CreateUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </HasRoleAndPermission>
    </div>
  );
};

export default Header;
