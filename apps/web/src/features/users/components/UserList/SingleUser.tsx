import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@todo/core/entities/user.entities";
import { Mail, Shield, Users as UsersIcon } from "lucide-react";
type SingleUserProps = User;

const SingleUser: React.FC<SingleUserProps> = (props) => {
  const { email, id, name, role } = props;
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-red-100 text-red-800";
      case "ADMIN":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };
  return (
    <div
      key={id}
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <UsersIcon className="w-5 h-5 text-gray-600" />
        </div>

        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Badge className={getRoleBadgeColor(role)}>
          <Shield className="w-3 h-3 mr-1" />
          {role.replace("_", " ")}
        </Badge>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          {(role.toUpperCase() === "SUPER_ADMIN" ||
            (role.toUpperCase() === "ADMIN" && role === "USER")) && (
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
