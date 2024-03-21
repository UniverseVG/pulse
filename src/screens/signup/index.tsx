import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/topbar";
import Footer from "../../components/Footer";
import Icon from "../../icons";
import { Amplify, Auth } from "aws-amplify";
import { pendingUserAtom } from "../../utils/atom";
import { useAtom } from "jotai";
import aws from "../../aws-exports";
import { toast } from "react-toastify";
Amplify.configure(aws);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [, setUser] = useAtom(pendingUserAtom);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleRegister = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      toast.error("Email Address is invalid", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        closeButton: false,
      });
      return;
    }

    if (password.length === 0) {
      toast.error("Please enter a password.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        closeButton: false,
      });
      return;
    }

    try {
      const res = await Auth.signIn({
        username: email,
        password: password,
      });

      localStorage.setItem("email", email);
      setUser(res);
      if (res?.challengeName === "NEW_PASSWORD_REQUIRED") {
        navigate("/change-password", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        closeButton: false,
      });
      console.log("Error signing in:", error);
    }
  };

  const validateEmail = (email: any) => {
    const emailPattern = RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    return emailPattern.test(email);
  };

  const isEmailValid = email.trim() !== "" && validateEmail(email);
  const isPasswordValid = password.trim() !== "";

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
              Create your account
            </h1>
            <h6 className="font-normal pt-1 text-xl text-black ">
              Welcome to our platform! Sign up now
            </h6>
            <br />
            <form className="">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold  text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2 relative pb-8">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-800"
                >
                  Password
                </label>
                <div className="flex">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] focus:outline-none"
                  >
                    {isPasswordVisible ? (
                      <Icon name="showpassword" height={16} width={16} />
                    ) : (
                      <Icon name="hidepassword" height={16} width={16} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <div className=" pb-6 text-xs  text-[#AAAAAA]">
                  <span>
                    Upon clicking Register, you agree to our{" "}
                    <a
                      href="/privacy-policy"
                      className=" text-violet-300 hover:underline"
                    >
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms-and-conditions"
                      className=" text-violet-300  hover:underline"
                    >
                      terms and conditions
                    </a>
                  </span>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <button
                    className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md ${
                      isEmailValid && isPasswordValid
                        ? "hover:bg-slate-400 focus:bg-slate-600"
                        : "pointer-events-none bg-opacity-40"
                    }`}
                    onClick={handleRegister}
                    disabled={!isEmailValid || !isPasswordValid}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
            <p className="mb-8 text-xs  text-center pt-7 text-[#AAAAAA]">
              Existing user?{" "}
              <a href="/login" className=" text-[#AAAAAA]  hover:underline">
                Sign in
              </a>
              <br />
            </p>
            <div className="pt-40"></div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
