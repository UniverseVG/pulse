import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProject } from "../../api";
import { toast } from "react-toastify";

export const useAddProject = () => {
  const [data, setData] = useState({});

  const { mutate } = useMutation(
    async (payload: any) => {
      const response = await addProject({
        ...payload,
        tenantId: "64cb76fcfb57fd1d9125aa71",
      });
      return response;
    },
    {
      onSuccess: (data) => {
        setData(data);

        toast.success("Project Created Successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          closeButton: false,
        });

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
