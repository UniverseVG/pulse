import { useState } from "react";
import { Header, Text } from "../../components";
import LeftSideBar from "../../container/leftSideBar";
import { useAddProject } from "../../hooks/mutation/useAddProject";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
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

export default AddProduct;

const RightSideBar = () => {
  return (
    <div className="relative bg-white text-black shadow-md w-full items-center h-screen px-6 py-8 flex flex-col">
      <Header pageTitle="Add Project" />
      <div className=" justify-center">
        <ProductInputFields />
      </div>
    </div>
  );
};

const ProductInputFields = () => {
  const [value, setValue] = useState({
    projectName: "",
  });
  const handleSelect = (data: any, field: string) => {
    setValue({ ...value, [field]: data });
  };
  const navigate = useNavigate();

  const { mutate: handleAddProject } = useAddProject();

  return (
    <div className="flex pt-36 w-96  items-center justify-center flex-col space-y-4">
      <div>
        <Text className="text-2xl font-bold">Add Project</Text>
      </div>
      <div className="flex text-lg flex-col">
        <label htmlFor="username">Project Name</label>
        <input
          type="text"
          id="projectname"
          value={value?.projectName}
          placeholder="Enter Projectname"
          className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
          onChange={(e: any) => handleSelect(e.target.value, "projectName")}
        />
        <div className="pt-5 flex flex-row gap-4">
          <button
            className="bg-[#018273] text-white px-4 py-2 w-40 justify-end rounded-md"
            onClick={() => {
              navigate("/viewProject");
            }}
          >
            View Projects
          </button>
          <button
            className="bg-[#018273] text-white px-4 py-2 w-40 justify-end rounded-md"
            onClick={() => {
              handleAddProject({ ...value });
              setValue({ projectName: "" });
            }}
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};
