import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../api";
import { toast } from "react-toastify";

export const useAddUser = () => {
  const [data, setData] = useState({});

  const { mutate } = useMutation(
    async (payload: any) => {
      const response = await addUser({ ...payload });
      return response;
    },
    {
      onSuccess: (data) => {
        setData(data);

        toast.success("Added User Successfully", {
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
