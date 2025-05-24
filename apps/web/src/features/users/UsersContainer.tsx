import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import { UserList } from "./components/UserList";

export function UsersContainer() {
  return (
    <>
      <div className="space-y-6">
        <Header />

        <StatsCards />

        <UserList />
      </div>
    </>
  );
}
