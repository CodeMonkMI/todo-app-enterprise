import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Todo } from "@todo/core/entities/todo.entities";
import { CheckCircle, CheckSquare, Clock } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useTodosQuery } from "../api/todoQueryApi";
const StatsCards = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { data: usersData, isSuccess } = useTodosQuery();

  useEffect(() => {
    if (isSuccess) {
      setTodos((usersData as any).data);
    }
  }, [isSuccess, usersData]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.filter((todo) => !todo.completed).length;
  const totalCount = todos.length;

  const statCardData: StatCardProps[] = [
    {
      title: "Total Tasks",
      value: totalCount,
      icon: <CheckSquare className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: <Clock className="h-4 w-4 text-orange-500" />,
    },
    {
      title: "Completed",
      value: completedCount,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCardData.map((stat) => (
        <StatCard
          key={Math.random()}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && icon}
      </CardHeader>
      <CardContent>
        {(typeof value === "string" || typeof value === "number") && (
          <div className="text-2xl font-bold text-green-600">{value}</div>
        )}
        {typeof value === "object" && value}
      </CardContent>
    </Card>
  );
};

export default StatsCards;
