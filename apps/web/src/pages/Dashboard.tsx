import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TodoContainer } from "@/features/todo";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <TodoContainer />
    </DashboardLayout>
  );
}
