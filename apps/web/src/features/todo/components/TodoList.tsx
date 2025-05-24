import { CompletedTodoList } from "./CompletedTodoList";
import { PendingTodoList } from "./PendingTodoList";

export function TodoList() {
  return (
    <div className="space-y-6">
      <div className="flex gap-x-12">
        <div className="w-1/2">
          <PendingTodoList />
        </div>
        <div className="w-1/2">
          <CompletedTodoList />
        </div>
      </div>
    </div>
  );
}
