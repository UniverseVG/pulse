import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../api";

export const useDeleteLog = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (selectedID: any) => {
      const response = await deleteTask(selectedID);
      return response;
    },
    {
      onSuccess: (_data, context: any) => {
        queryClient.setQueriesData([`getAllTask`], (queryData: any) => {
          const tempData = queryData?.filter(
            (item: any) => !context?.includes(item?._id)
          );
          return tempData;
        });
      },
      retry: false,
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
