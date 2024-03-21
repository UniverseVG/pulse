import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/topbar";
import Footer from "../../components/Footer";
import { useAtom } from "jotai";
import Icon from "../../icons";
import { Auth } from "aws-amplify";
import { pendingUserAtom } from "../../utils/atom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [currentUser] = useAtom(pendingUserAtom);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (password !== confirmPassword) {
      toast.error("Entered passwords do not match", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        closeButton: false,
      });
      return;
    }

    try {
      const user = currentUser;
      const newPassword = password;
      console.log({ user, newPassword });
      await Auth.completeNewPassword(user, newPassword);
      toast.success("Password changed successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        closeButton: false,
      });

      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  const isPasswordValid = password.length > 0;
  const isConfirmPasswordValid = confirmPassword.length > 0;

  return (
    <>
      <TopBar />
      <div>
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div
            className="w-[570] p-4 m-auto lg:max-w-xl"
            style={{ width: "500px" }}
          >
            <br />
            <h1 className="text-4xl font-semibold text-black ">
              Change Password
            </h1>
            <br />
            <form className="">
              <div className="mb-2 relative pb-8">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-800"
                >
                  New Password
                </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] focus:outline-none"
                  >
                    {showPassword ? (
                      <Icon name="showpassword" height={16} width={16} />
                    ) : (
                      <Icon name="hidepassword" height={16} width={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-2 relative pb-8">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-800"
                >
                  Confirm Password
                </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] focus:outline-none"
                  >
                    {showPassword ? (
                      <Icon name="showpassword" height={16} width={16} />
                    ) : (
                      <Icon name="hidepassword" height={16} width={16} />
                    )}
                  </button>
                </div>
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  //signinval();
                }}
              >
                <button
                  className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md ${
                    isPasswordValid && isConfirmPasswordValid
                      ? "hover:bg-slate-400 focus:bg-slate-600"
                      : "pointer-events-none bg-opacity-40"
                  }`}
                  onClick={handleLogin}
                  disabled={!isPasswordValid || !isConfirmPasswordValid}
                >
                  Reset Password
                </button>
              </div>
            </form>
            <br />
            <div className="pt-60 pb-0 scroll-m-0">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
