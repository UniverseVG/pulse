import { useQuery } from "@tanstack/react-query";
import { getProjectByUserId } from "../api";
import { Auth } from "aws-amplify";

export const useGetAllProjects = () => {
  const { data: allProjects, refetch } = useQuery(
    [`getProjectByUserId`],
    async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        const res = await getProjectByUserId({
          userId: user?.signInUserSession?.idToken?.payload?.["custom:userId"],
        });

        return res?.projectData;
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
    allProjects,
    refetch,
  };
};
