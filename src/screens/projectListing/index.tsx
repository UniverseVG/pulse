import React from "react";
import LeftSideBar from "../../container/leftSideBar";
import { Button, Header } from "../../components";
import { useGetAllProjects } from "../../hooks/useGetAllProjects";
import { useNavigate } from "react-router-dom";

const ProjectListing: React.FC = () => {
  return (
    <div className="bg-white" style={{ overflow: "hidden", height: "100vh" }}>
      <div className="flex w-full" style={{ height: "100%" }}>
        <LeftSideBar />
        <RightSideBar />
      </div>
    </div>
  );
};

const RightSideBar: React.FC = () => {
  const { allProjects } = useGetAllProjects();
  const navigate = useNavigate();

  return (
    <div
      className="relative overflow-scroll shadow-md w-full text-black h-screen px-6 py-12 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="Projects" />

      <div className="mt-6">
        <h2 className="text-lg text-black font-bold px-4">Projects</h2>
        <table className="table-fixed w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-bold">Project</th>
              <th className="px-4 py-2 text-left font-bold">Users</th>
            </tr>
          </thead>

          <tbody>
            {allProjects?.map((detail: any, index: any) => {
              console.log(detail);

              return (
                <tr
                  key={index}
                  className="border-b cursor-pointer"
                  onClick={() => {
                    navigate("/addUserToProject", {
                      state: { projectId: detail._id },
                    });
                  }}
                >
                  <td className="px-4 py-2">{detail.projectName}</td>
                  <td className="px-4 py-2">
                    <Button
                      appearance="outlined"
                      status={"active"}
                      label="Add User"
                      onPress={() => {
                        navigate("/addUserToProject", {
                          state: { projectId: detail._id },
                        });
                      }}
                      style={{
                        padding: 4,
                        marginTop: 20,
                        backgroundColor: "#018273",
                      }}
                      className="w-32 font-semibold"
                      textStyle={{
                        color: "#F5F6FA",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectListing;
