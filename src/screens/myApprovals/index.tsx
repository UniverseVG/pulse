import React, { useState, useEffect } from "react";
import LeftSideBar from "../../container/leftSideBar";
import { Header } from "../../components";
import { useGetApprovalProjects } from "../../hooks/useGetApprovalProjects";
import { useAddEditLog } from "../../hooks/mutation/useAddEditLog";
import { useGetUserRole } from "../../hooks/useGetUserRole";

const MyApprovals: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const toggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  useEffect(() => {
    const handleClickOutsideDropdown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdownContainer = document.getElementById("dropdown-container");
      const dropdownButton = document.getElementById("dropdown-button");
      if (
        dropdownContainer &&
        !dropdownContainer.contains(target) &&
        dropdownButton &&
        !dropdownButton.contains(target)
      ) {
        setShowDropdown(false); // Close the dropdown
      }
    };
    document.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <div className="bg-white" style={{ overflow: "hidden", height: "100vh" }}>
      <div className="flex w-full" style={{ height: "100%" }}>
        <LeftSideBar />
        <RightSideBar
          showDropdown={showDropdown}
          toggleDropdown={toggleDropdown}
          setShowDropdown={setShowDropdown}
        />
      </div>
    </div>
  );
};

const RightSideBar: React.FC<{
  showDropdown: boolean;
  toggleDropdown: () => void;
  setShowDropdown: any;
}> = ({ showDropdown, toggleDropdown, setShowDropdown }) => {
  const { allTimeSheet } = useGetApprovalProjects();
  const { userRole } = useGetUserRole();
  const projectsId = userRole
    .filter((item: any) => item.projectRole === "Approver")
    .map((item: any) => item.projectId);
  const [showRowDropdown, setShowRowDropdown] = useState<number | null>(null);

  const [statuses, setStatuses] = useState<string[]>([]);

  useEffect(() => {
    const initialStatuses = allTimeSheet.map(
      (detail: any) => detail.status || "pending"
    );
    setStatuses(initialStatuses);
  }, [allTimeSheet]);

  const filterObjectsByProjectId = (inputArray: any, arrayOfObjects: any) => {
    const matchingObjects = arrayOfObjects.filter((obj: any) =>
      inputArray.includes(obj.projectId)
    );
    return matchingObjects;
  };

  const finalData = filterObjectsByProjectId(projectsId, allTimeSheet);

  const toggleRowDropdown = (index: number) => {
    if (showRowDropdown === index) {
      setShowRowDropdown(null);
    } else {
      setShowRowDropdown(index);
    }
  };

  const { mutate: handleAddEdit } = useAddEditLog();
  return (
    <div
      className="relative overflow-scroll shadow-md w-full text-black h-screen px-6 py-12 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="My Approvals" />

      <div className="mt-6 justify-center items-center h-full">
        <h2 className="text-lg text-black font-bold">TimeSheets</h2>
        {finalData?.length === 0 ? (
          <p className="mt-4 text-center pr-20 text-lg pt-60 text-gray-500">
            No logs to display.
          </p>
        ) : (
          <table className="table-fixed w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-bold">Project</th>
                <th className="px-4 py-2 text-left font-bold">Task</th>
                <th className="px-4 py-2 text-left font-bold">Details</th>
                <th className="px-4 py-2 text-left font-bold">Hours</th>
                <th className="px-4 py-2 text-left font-bold">
                  Approval Status
                </th>
              </tr>
            </thead>

            <tbody>
              {finalData?.map((detail: any, index: number) => {
                const rowStatus = statuses[index]; // Get the status for this row

                return (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{detail.project}</td>
                    <td className="px-4 py-2">{detail.task}</td>
                    <td className="px-4 py-2">{detail.description}</td>
                    <td className="px-4 py-2">{detail.duration}</td>
                    <td className="px-4 py-2">
                      <div className="relative inline-block">
                        <button
                          id="dropdown-button"
                          className={`${
                            rowStatus === "Approved"
                              ? "bg-[#018273] text-white"
                              : rowStatus === "Rejected"
                              ? "bg-[#956161] text-white"
                              : "bg-[#956161] text-white"
                          } px-7 py-1 rounded-lg`}
                          onClick={() => toggleRowDropdown(index)}
                        >
                          {rowStatus === "pending" ? "Rejected" : rowStatus}
                        </button>
                        {showRowDropdown === index && (
                          <div
                            id="dropdown-container"
                            className="absolute left-0 mt-2 bg-white w-24 border border-gray-300 rounded-lg shadow-lg z-10"
                          >
                            <button
                              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                rowStatus === "Approved"
                                  ? "bg-[#018273] text-white"
                                  : ""
                              }`}
                              onClick={() => {
                                handleAddEdit({
                                  payload: {
                                    taskIds: [detail._id],
                                    updateTask: [{ approval: true }],
                                  },
                                });
                                setStatuses((prevStatuses) => {
                                  const updatedStatuses = [...prevStatuses];
                                  updatedStatuses[index] = "Approved";
                                  return updatedStatuses;
                                });
                                setShowRowDropdown(null);
                              }}
                            >
                              Approved
                            </button>
                            <button
                              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                rowStatus === "Rejected"
                                  ? "bg-[#956161] text-white"
                                  : ""
                              }`}
                              onClick={() => {
                                handleAddEdit({
                                  payload: {
                                    taskIds: [detail._id],
                                    updateTask: [{ approval: false }],
                                  },
                                });
                                setStatuses((prevStatuses) => {
                                  const updatedStatuses = [...prevStatuses];
                                  updatedStatuses[index] = "Rejected";
                                  return updatedStatuses;
                                });
                                setShowRowDropdown(null);
                              }}
                            >
                              Rejected
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyApprovals;
