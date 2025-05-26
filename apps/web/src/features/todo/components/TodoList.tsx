import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CompletedTodoList } from "./CompletedTodoList";
import { PendingTodoList } from "./PendingTodoList";

export function TodoList() {
  const [isCompletedShow, setIsCompletedShow] = useState<boolean>(false);

  const [searchParam, setSearchParam] = useSearchParams();
  const changeHandler = () => {
    setIsCompletedShow((p) => !p);
    const newSearchParams = new URLSearchParams(searchParam.toString());
    newSearchParams.set("limit", "5");
    newSearchParams.set("page", "1");
    setSearchParam(newSearchParams);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onCheckedChange={changeHandler} />
          <Label htmlFor="airplane-mode">Show Completed</Label>
        </div>
      </div>
      {isCompletedShow && <CompletedTodoList />}
      {!isCompletedShow && <PendingTodoList />}
    </div>
  );
}
