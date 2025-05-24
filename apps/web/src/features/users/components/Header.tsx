import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts and permissions
          </p>
        </div>

        <Button className="shadow-sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default Header;
