import { useQuery } from "@tanstack/react-query";
import { getAllTask } from "../api";
import { Auth } from "aws-amplify";

export const useGetAllLogs = (queryParams: any) => {
  const { data: allTimeLogs, refetch } = useQuery(
    [`getAllTask`],
    async () => {
      try {
        let res;

        const user = await Auth.currentAuthenticatedUser();
        const userId =
          user?.username ||
          user?.signInUserSession?.idToken?.payload?.["cognito:username"];

        if (typeof queryParams !== "object") {
          res = await getAllTask({ userId: userId, date: queryParams });
        } else {
          console.log("coming here");

          res = await getAllTask({ userId: userId });
        }

        return res?.taskData;
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
    allTimeLogs,
    refetch,
  };
};
