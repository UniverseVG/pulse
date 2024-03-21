import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import LeftSideBar from "../../container/leftSideBar";

const UserComponent = () => {
  return (
    <div className="bg-white" style={{ overflow: "hidden", height: "100vh" }}>
      <div className="flex w-full" style={{ height: "100%" }}>
        <LeftSideBar />
        <RightSideBar />
      </div>
    </div>
  );
};

const RightSideBar = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "John Doe",
      role: "Developer",
      teams: "Team A",
      projects: "Project X",
      submissionRequest: "Pending",
      details: [
        {
          date: "2023-08-01",
          project: "Project X",
          workType: "Development",
          details: "Work on feature A",
          hours: 8,
          approvalStatus: "Pending",
        },
        // Add more details for each user as needed
      ],
    },
    {
      name: "Jane Smith",
      role: "Designer",
      teams: "Team B",
      projects: "Project Y",
      submissionRequest: "Approved",
      details: [
        {
          date: "2023-08-01",
          project: "Project Y",
          workType: "Design",
          details: "Design UI elements",
          hours: 6,
          approvalStatus: "Approved",
        },
        // Add more details for each user as needed
      ],
    },
    {
      name: "Mike Johnson",
      role: "Manager",
      teams: "Team C",
      projects: "Project Z",
      submissionRequest: "Rejected",
      details: [
        {
          date: "2023-08-01",
          project: "Project Z",
          workType: "Management",
          details: "Review project progress",
          hours: 7,
          approvalStatus: "Rejected",
        },
        // Add more details for each user as needed
      ],
    },
    // Add more team members as needed
  ]);

  return (
    <div className="relative overflow-scroll shadow-md w-full text-black h-screen px-6 py-8 flex flex-col" style={{ flex: 1 }}>
      <Header pageTitle="User" />

      {/* Table */}
      <table className="table-fixed w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-bold">Name</th>
            <th className="px-4 py-2 text-left font-bold">Role</th>
            <th className="px-4 py-2 text-left font-bold">Teams</th>
            <th className="px-4 py-2 text-left font-bold">Projects</th>
            <th className="px-4 py-2 text-left font-bold">Submission Request</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <Link to={`/row/${index}`}>
                  {member.name}
                </Link>
              </td>
              <td className="px-4 py-2">{member.role}</td>
              <td className="px-4 py-2">{member.teams}</td>
              <td className="px-4 py-2">{member.projects}</td>
              <td className="px-4 py-2">
                {member.submissionRequest === "Approved" ? (
                  <button className=" text-red-600 px-7 py-1 rounded-lg">Pending</button>
                ) : (
                  <button className=" text-black px-8 py-1 rounded-lg">Up to data</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserComponent;
