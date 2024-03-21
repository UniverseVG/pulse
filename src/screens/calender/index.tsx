import { useState } from "react";
import { Header, MyCalendar } from "../../components";
import LeftSideBar from "../../container/leftSideBar";
import { useGetAllLogs } from "../../hooks/useGetAllLogs";
import AddModalComponent from "../../patterns/popup/addModalComponent";
import EditModalComponent from "../../patterns/popup/editModalComponent";
import { useNavigate } from "react-router-dom";
import DeleteModalComponent from "../../patterns/popup/deleteModalComponent";
import { useDeleteLog } from "../../hooks/mutation/useDeleteLog";

export const Calender = () => {
  //get all time logs is called here
  const { allTimeLogs } = useGetAllLogs({});
  return (
    <div
      className="bg-[#F5F6FA]"
      style={{
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <div className="flex w-full">
        <LeftSideBar />
        <RightSideBar allTimeLogs={allTimeLogs} />
      </div>
    </div>
  );
};

const RightSideBar = (props: any) => {
  const { allTimeLogs } = props;
  const [showAdd, setShowAdd] = useState(false);
  const [time, setTime] = useState({});
  const navigate = useNavigate();
  const url = window.location;
  const taskId = url?.search?.split("=")[1];

  //delete time log
  const { mutate: handleDeleteTask } = useDeleteLog();
  // the select callback function
  const handleAddTime = (arg: any) => {
    const start = new Date(arg.start)
      .toLocaleString("sv")
      .replace("Z", "")
      .replace(" ", "T"); // Selected start date/time
    const end = new Date(arg.end)
      .toLocaleString("sv")
      .replace("Z", "")
      .replace(" ", "T"); // Selected end date/time

    setTime({
      start: start,
      end: end,
    }); //stored in a useState time
    setShowAdd(true);
  };

  // the edit callback function
  const handleEditTime = (event: any) => {
    navigate(`/calender#updateLog?taskId=${event?.extendedProps?._id}`);
  };

  return (
    <div
      className="relative overflow-scroll shadow-md w-full h-screen px-6 py-8 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="Calender View" />
      <MyCalendar
        allTimeLogs={allTimeLogs}
        handleAddTime={handleAddTime}
        handleEditTime={handleEditTime}
      />
      {showAdd && (
        <AddModalComponent
          show={showAdd}
          time={time}
          setShow={setShowAdd}
          title="Add Time Log"
          subTitle="Add your time log in below fields"
          primaryCtaText="Save"
          secondaryCtaText="Cancel"
          handleSecondaryCta={() => setShowAdd(false)}
        />
      )}
      <EditModalComponent
        title="Edit Time Log"
        subTitle="You can edit the below fields"
        primaryCtaText="Save"
        secondaryCtaText="Cancel"
        handleSecondaryCta={() => navigate("#")}
        leftSideCtaText="Delete"
      />
      <DeleteModalComponent
        promptText="Delete the log"
        subPromptText="Are you sure you want to delete this time log?"
        primaryCtaText="Confirm"
        secondaryCtaText="Cancel"
        handlePrimaryCta={() => {
          handleDeleteTask(taskId);
          navigate("#");
        }}
        handleSecondaryCta={() => navigate("#")}
      />
    </div>
  );
};
