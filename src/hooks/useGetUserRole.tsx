import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../api";
import { Auth } from "aws-amplify";

export const useGetUserRole = () => {
  const { data: userRole, refetch } = useQuery(
    [`getUserRole`],
    async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        const res = await getUserRole({
          userId: user?.signInUserSession?.idToken?.payload?.["custom:userId"],
        });

        return res?.getMapping;
      } catch (error) {
        console.log(error);
      }
    },
    {
      initialData: [],
      retry: false,
    }
  );

  return {
    userRole,
    refetch,
  };
};
