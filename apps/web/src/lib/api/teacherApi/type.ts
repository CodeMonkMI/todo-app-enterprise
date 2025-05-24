export type Teacher = {
  id: string;
  status: string;
  joinDate: string;
  officeLocation: string;
  title: string;
  user: {
    id: string;
    fullname: string;
    username: string;
    email: string;
    title: string;
  };
};
