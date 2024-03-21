import LeftSideBar from "../../container/leftSideBar";
import Header from "../../components/header";
import { useState } from "react";
import { Text } from "../../components";
import { useGetUsers } from "../../hooks/useGetUsers";
import { useLocation } from "react-router-dom";
import { useAddUserMapping } from "../../hooks/mutation/useAddProjectMapping";

const AddUserToProject = () => {
  return (
    <div
      className="bg-[#F5F6FA]"
      style={{ overflow: "hidden", height: "100vh" }}
    >
      <div className="flex w-full h-full" style={{ height: "100%" }}>
        <LeftSideBar />
        <RightSideBar />
      </div>
    </div>
  );
};

const UserInputFields = () => {
  const location = useLocation();
  const [value, setValue] = useState({
    projectRole: "",
    userId: {
      userId: "",
      userName: "",
    },
    projectId: location?.state?.projectId,
  });
  const { users } = useGetUsers();

  const { mutate: handleAddUser } = useAddUserMapping();

  const handleSelect = (data: any, field: string) => {
    setValue({ ...value, [field]: data });
  };

  return (
    <div className="flex pt-20 w-96  flex-col space-y-4">
      <div>
        <Text className="text-2xl font-bold">Add User To Project</Text>
      </div>
      <div className="flex text-lg pb-4 pt-4 flex-col">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
          defaultValue=""
          onChange={(e: any) => handleSelect(e.target.value, "projectRole")}
          value={value?.projectRole}
        >
          <option value="" disabled>
            Select User
          </option>
          <option value="Approver">Approver</option>
          <option value="Team Member">Team Member</option>
        </select>
      </div>
      <div className="flex text-lg flex-col ">
        <label htmlFor="username">Select User</label>
        <select
          id="role"
          className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
          defaultValue=""
          onChange={(e: any) => {
            handleSelect(e.target.value, "userId");
          }}
          value={value?.userId?.userName}
        >
          <option value="" disabled>
            Select User
          </option>
          {users.map((item: any) => {
            return <option value={item?._id}>{item.userName}</option>;
          })}
        </select>
      </div>

      <button
        className="bg-[#018273] text-white px-4 py-2 rounded-md"
        onClick={() => {
          handleAddUser({ ...value });
          setValue({
            projectRole: "",
            userId: {
              userId: "",
              userName: "",
            },
            projectId: location.state.projectId,
          });
        }}
      >
        Add User
      </button>
    </div>
  );
};

const RightSideBar = () => {
  return (
    <div className="relative bg-white text-black shadow-md w-full h-full px-6 py-8 flex flex-col items-center">
      <Header pageTitle="Add User" />
      <div className="justify-center">
        <UserInputFields />
      </div>
    </div>
  );
};

export default AddUserToProject;
