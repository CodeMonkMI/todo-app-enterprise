import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateTodoModal } from "./CreateTodoModal";

type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = props;
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

        <Button onClick={() => setIsOpen(true)} className="shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          New Todo
        </Button>
      </div>
      <CreateTodoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
