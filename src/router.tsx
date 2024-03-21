import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Dashboard } from "./screens/dashboard";
import { Calender } from "./screens/calender";
import TimeReport from "./screens/timereport";
import SignUp from "./screens/signup";
import SignIn from "./screens/login";
import MyApprovals from "./screens/myApprovals";
import { useEffect } from "react";
import { Logout } from "./screens/logout";
import { Auth } from "aws-amplify";
import ChangePassword from "./screens/change-password";
import AddProduct from "./screens/addproduct";
import AddUser from "./screens/adduser";
import ProjectListing from "./screens/projectListing";
import AddUserToProject from "./screens/addUserToProject";

const LaunchScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userEmail =
          user?.attributes?.email ||
          user?.signInUserSession?.idToken?.payload?.email;

        if (userEmail) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        return navigate("/login", { replace: true });
      }
    })();
  }, []);

  return null;
};

export const AppRouter = () => {
  return (
    <Router>
      <Stack />
    </Router>
  );
};

const Stack = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/" element={<LaunchScreen />} />
      <Route path="/timereport" element={<TimeReport />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/my-approvals" element={<MyApprovals />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/viewProject" element={<ProjectListing />} />
      <Route path="/addUserToProject" element={<AddUserToProject />} />
    </Routes>
  );
};
