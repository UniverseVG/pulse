import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export const useGetUsers = () => {
  const { data: users, refetch } = useQuery(
    [`getUsers`],
    async () => {
      try {
        const res = await getUsers();
        return res?.users;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    {
      initialData: [],
      retry: false,
    }
  );

  return {
    users,
    refetch,
  };
};
