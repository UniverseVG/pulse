import { useQuery } from "@tanstack/react-query";
import { getTaskForApproval } from "../api";

export const useGetApprovalProjects = () => {
  const { data: allTimeSheet, refetch } = useQuery(
    [`getTaskForApproval`],
    async () => {
      try {
        const res = await getTaskForApproval();

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
    allTimeSheet,
    refetch,
  };
};
