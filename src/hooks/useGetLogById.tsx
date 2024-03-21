import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../api";

export const useGetLogById = (taskId: any) => {
  const { data: logDetails, refetch } = useQuery(
    [`getTaskById-${taskId}`],
    async () => {
      if (!taskId) return;
      const response = await getTaskById(taskId);
      return response?.existingTask;
    },
    {
      enabled: Boolean(taskId),
      retry: true,
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { logDetails, refetch };
};
