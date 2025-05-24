import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type HeaderProps = {
  name: string;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { name, setIsCreateModalOpen } = props;
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your tasks and stay organized
          </p>
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Todo
        </Button>
      </div>
    </>
  );
};

export default Header;
