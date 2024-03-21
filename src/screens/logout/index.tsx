import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        await localStorage.removeItem("email");
        await Auth.signOut();
        localStorage.clear();
        await navigate("/login");
      } catch (e: any) {
        console.warn("error : ", e);
        toast.error(e, {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    })();
  }, []);
  return <div></div>;
};
