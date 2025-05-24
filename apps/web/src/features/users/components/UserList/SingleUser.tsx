import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User } from "@todo/core/entities/user.entities";
import { AxiosError } from "axios";
import {
  Calendar,
  Edit2,
  Mail,
  Shield,
  Trash2,
  Users as UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUserDeleteMutations } from "../../api/userMutationApi";
import { EditUserModal } from "../EditUserModal";
type SingleUserProps = User;

const SingleUser: React.FC<SingleUserProps> = (props) => {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteUser, isError, error } = useUserDeleteMutations();

  const { email, id, name, role, createdAt } = props;
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

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          toast({
            variant: "destructive",
            title: "Forbidden",
            description: "You are not authorized to perform this action!",
          });
        }
      }
    }
  }, [isError, error, toast]);

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
          <h4 className="font-medium text-gray-900">
            {name}
            <Badge className={getRoleBadgeColor(role)}>
              <Shield className="w-3 h-3 mr-1" />
              {role.toLocaleLowerCase().replace("_", " ")}
            </Badge>
          </h4>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {email}
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Joined {formatDate(createdAt)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="text-gray-500 hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              deleteUser(id);
            }}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <EditUserModal
        role={props.role as any}
        id={props.id}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default SingleUser;
