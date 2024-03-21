import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask, updateTask } from "../../api";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";

export const useAddEditLog = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState({});
  let response;
  const { mutate } = useMutation(
    async (payload: any) => {
      const { createdAt, ...rest } = payload.payload;
      const user = await Auth.currentAuthenticatedUser();
      const userId =
        user?.username ||
        user?.signInUserSession?.idToken?.payload?.["cognito:username"];

      if (payload.payload.taskIds) {
        response = await updateTask({ ...rest, userId });
      } else response = await addTask({ ...rest, userId, approval: false });
      return response;
    },
    {
      onSuccess: (data, context) => {
        setData(data);

        if (context?.payload?.taskIds) {
          queryClient.resetQueries([`getAllTask`], {
            exact: true,
          });
        } else {
          queryClient.resetQueries([`getAllTask`], {
            exact: true,
          });
        }
        {
          context?.payload?.taskIds?.length > 1
            ? null
            : toast.success(
                ` ${
                  context?.payload?.taskIds ? "Updated" : "Added"
                } Successfully`,
                {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                  closeButton: false,
                }
              );
        }

        return data;
      },
      retry: false,
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { mutate, data };
};
