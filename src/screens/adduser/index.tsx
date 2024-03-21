import LeftSideBar from "../../container/leftSideBar";
import Header from "../../components/header";
import { useState } from "react";
import { useAddUser } from "../../hooks/mutation/useAddUser";
import { Text } from "../../components";

const AddUser = () => {
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
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState({
    userName: "",
    email: "",
    role: "",
    emailInvite: false,
  });

  const { mutate: handleAddUser } = useAddUser();

  const handleSelect = (data: any, field: string) => {
    setValue({ ...value, [field]: data });
  };

  return (
    <div className="flex pt-20 w-96  flex-col space-y-4">
      <div>
        <Text className="text-2xl font-bold">Add User</Text>
      </div>
      <div className="flex text-lg flex-col">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={value?.userName}
          className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
          onChange={(e: any) => handleSelect(e.target.value, "userName")}
        />
      </div>
      <div className="flex text-lg pt-4 flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={value?.email}
          className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
          onChange={(e: any) => handleSelect(e.target.value, "email")}
        />
      </div>
      <div className="flex text-lg pb-4 pt-4 flex-col">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
          defaultValue=""
          onChange={(e: any) => handleSelect(e.target.value, "role")}
          value={value?.role}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="Team Member">Team member</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="emailinvite"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              setValue((prev) => ({
                ...prev,
                emailInvite: isChecked ? false : true,
              }));
            }}
            className="rounded-lg"
          />
          <label htmlFor="emailinvite" className="">
            Email Invite
          </label>
        </div>
      </div>

      <button
        className="bg-[#018273] text-white px-4 py-2 rounded-md"
        onClick={() => {
          handleAddUser({ ...value });
          setValue({
            userName: "",
            email: "",
            role: "",
            emailInvite: false,
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

export default AddUser;
