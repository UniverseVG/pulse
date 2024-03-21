import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addUserToProject } from "../../api";
import { toast } from "react-toastify";

export const useAddUserMapping = () => {
  const [data, setData] = useState({});

  const { mutate } = useMutation(
    async (payload: any) => {
      const response = await addUserToProject({
        ...payload,
      });
      return response;
    },
    {
      onSuccess: (data) => {
        setData(data);

        toast.success("User Added to Project Successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          closeButton: false,
        });

        return data;
      },
      retry: false,
      onError: (error: any) => {
        console.log(error);

        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          closeButton: false,
        });
      },
    }
  );

  return { mutate, data };
};
