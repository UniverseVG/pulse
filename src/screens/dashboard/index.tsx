import { useEffect, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Header, Input, Text } from "../../components";
import LeftSideBar from "../../container/leftSideBar";
import Icon from "../../icons";
import DropDown from "../../components/dropDown";
import { useGetAllLogs } from "../../hooks/useGetAllLogs";
import { Tasks } from "../../constants";
import { useAddEditLog } from "../../hooks/mutation/useAddEditLog";
import createCustomCellRender from "../../components/table/customCellComponent";
import DeleteModalComponent from "../../patterns/popup/deleteModalComponent";
import { useNavigate } from "react-router-dom";
import { useDeleteLog } from "../../hooks/mutation/useDeleteLog";
import EditModalComponent from "../../patterns/popup/editModalComponent";
import { getDuration } from "../../utils/getDuration";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "../../patterns/submitModal";
import { v4 as uuidv4 } from "uuid";
import { useGetAllProjects } from "../../hooks/useGetAllProjects";

export const Dashboard = () => {
  const [selectData, setSelectData] = useState({
    project: "",
    task: "",
    description: "",
    start: "",
    end: "",
    duration: "",
    date: "",
    projectId: "",
  });
  const [date, setDate] = useState("");
  const [dateTime, setDateTime] = useState({});
  const [isTimer, setIsTimer] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //functions related to time log entry are below
  const handleSelect = (data: any, field: string) => {
    setSelectData({ ...selectData, [field]: data });
  };

  //get all time logs is called here

  useEffect(() => {
    const today = new Date(Date.now());
    setDateTime(today);

    const day = today.toLocaleString("sv").replace("Z", "").replace(" ", "T");
    const fetchDay = day.split("T")[0];
    setDate(fetchDay);
  }, []);

  const { allTimeLogs, refetch } = useGetAllLogs(date);

  useEffect(() => {
    refetch();
  }, [date]);

  return (
    <div
      className="bg-[#F5F6FA]"
      style={{
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <div className="flex w-full" style={{ height: "100%" }}>
        <LeftSideBar />
        <RightSideBar
          allTimeLogs={allTimeLogs}
          handleSelect={handleSelect}
          selectData={selectData}
          setSelectData={setSelectData}
          date={date}
          setDate={setDate}
          dateTime={dateTime}
          setDateTime={setDateTime}
          setIsTimer={setIsTimer}
          isTimer={isTimer}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
    </div>
  );
};

const RightSideBar = (props: any) => {
  const {
    allTimeLogs,
    handleSelect,
    selectData,
    setSelectData,
    date,
    setDate,
    dateTime,
    setDateTime,
    isTimer,
    setIsTimer,
    isModalVisible,
    setIsModalVisible,
  } = props;
  const navigate = useNavigate();
  const url = window.location;
  const taskId = url?.search?.split("=")[1];
  const { mutate: handleDeleteTask } = useDeleteLog();
  return (
    <div
      className="relative overflow-scroll shadow-md w-full h-screen px-6 py-8 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="My Dashboard" />
      <div className="flex-grow overflow-scroll">
        <AddTask
          handleSelect={handleSelect}
          selectData={selectData}
          setSelectData={setSelectData}
          setIsTimer={setIsTimer}
          isTimer={isTimer}
        />

        <ProductivityCards />
        <TableComponent
          allTimeLogs={allTimeLogs}
          date={date}
          setDate={setDate}
          dateTime={dateTime}
          setDateTime={setDateTime}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
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

      <EditModalComponent
        title="Edit Time Log"
        subTitle="You can edit the below fields"
        primaryCtaText="Save"
        secondaryCtaText="Cancel"
        handleSecondaryCta={() => navigate("#")}
      />

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

const AddTask = (props: any) => {
  const { handleSelect, selectData, setSelectData, isTimer, setIsTimer } =
    props;

  const { mutate: handleAddEdit } = useAddEditLog();
  const { allProjects } = useGetAllProjects();

  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (projectId) {
      setSelectData((prev: any) => ({ ...prev, projectId: projectId }));
    }
  }, [projectId]);

  const reset = () => {
    setSelectData({
      project: "",
      task: "",
      description: "",
      start: "",
      end: "",
      duration: "",
      date: "",
      projectId: "",
    });
  };
  useEffect(() => {
    if (isTimer) {
      setSelectData((prev: any) => ({
        ...prev,
        start: "",
        end: "",
        duration: "",
        date: "",
        projectId: "",
      }));
    } else {
      setSelectData((prev: any) => ({
        ...prev,
        start: selectData?.date
          ? new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
        end: selectData?.date
          ? new Date(
              new Date().setMinutes(new Date().getMinutes() + 1)
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : new Date(
              new Date().setMinutes(new Date().getMinutes() + 1)
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimer, selectData?.date]);
  useEffect(() => {
    const { start, end } = selectData;

    if (start && end) {
      const duration = getDuration(start, end);
      setSelectData((prevData: any) => ({ ...prevData, duration: duration }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectData?.start, selectData?.end]);

  return (
    <div
      className="flex flex-1 flex-row mb-[20px]  bg-white border-1 border-solid border-gray-300 p-[20px] gap-[40px] items-center rounded-[8px]"
      style={{ flexWrap: "wrap" }}
    >
      <div>
        <LabelHeading>Project</LabelHeading>
        <DropDown
          data={allProjects}
          onChange={(value: any) => {
            handleSelect(value, "project");
          }}
          field="value"
          value={selectData?.project}
          containerStyle={{ width: 200 }}
          setProjectId={setProjectId}
        />
      </div>
      <div>
        <LabelHeading>Task</LabelHeading>
        <DropDown
          data={Tasks}
          onChange={(value: any) => handleSelect(value, "task")}
          field="value"
          value={selectData?.task}
          containerStyle={{ width: 200 }}
        />
      </div>
      <div>
        <LabelHeading>Description</LabelHeading>
        <textarea
          className="w-[300px] h-[40px] p-2 border rounded resize-none text-[#3A3B3F] placeholder-[#9EA0A5]"
          cols={40}
          style={{
            backgroundColor: "#fff",
            marginBottom: 0,
            border: "1px solid  #9EA0A5",
            outline: "none",
          }}
          placeholder="Enter your description here..."
          onChange={(event: { target: { value: any } }) => {
            if (event.target.value.length <= 400)
              handleSelect(event.target.value, "description");
          }}
          value={selectData?.description}
        />
      </div>
      {isTimer ? (
        <div>
          <LabelHeading>Start Task</LabelHeading>
          <Timer setSelectData={setSelectData} selectData={selectData} />
        </div>
      ) : (
        <>
          <div>
            <LabelHeading>Date</LabelHeading>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectData?.date}
                onChange={(event: any) => {
                  handleSelect(
                    new Date(event?.$d).toLocaleString("sv").split(" ")[0],
                    "date"
                  );
                }}
                className="add-task-dashboard"
                slotProps={{
                  textField: { size: "small" },
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LabelHeading>Start time</LabelHeading>
            <Input
              id="start_time"
              placeholder="Start time"
              value={selectData?.start}
              onChange={(event: { target: { value: any } }) =>
                handleSelect(event.target.value, "start")
              }
              style={{ width: 200 }}
            />
          </div>
          <div>
            <LabelHeading>End time</LabelHeading>
            <Input
              id="end_time"
              placeholder="End time"
              value={selectData?.end}
              onChange={(event: { target: { value: any } }) => {
                handleSelect(event.target.value, "end");
              }}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <LabelHeading>Duration</LabelHeading>
            <Input
              id="duration"
              placeholder="Duration"
              value={selectData?.duration}
              onChange={(event: { target: { value: any } }) =>
                handleSelect(event.target.value, "duration")
              }
              style={{ width: 200 }}
              disabled
            />
          </div>
          <div>
            <LabelHeading> </LabelHeading>
            <Button
              appearance="outlined"
              status={"active"}
              label="Add"
              onPress={() => {
                handleAddEdit({
                  payload: selectData,
                });
                reset();
              }}
              style={{
                padding: 4,
                marginTop: 20,
                backgroundColor: "#018273",
              }}
              className="w-32 font-semibold"
              textStyle={{ color: "#F5F6FA", fontWeight: 600, fontSize: 20 }}
            />
          </div>
        </>
      )}

      <div className="items-center flex flex-col gap-[10px] fixed right-10">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            cursor: "pointer",
            backgroundColor: isTimer ? "#018273" : "#F5F6FA",
          }}
          className="flex justify-center items-center"
          onClick={() => {
            setIsTimer(true);
          }}
        >
          <Icon
            name="timer"
            width={16}
            height={16}
            color={isTimer ? "#fff" : "#3A3B3F"}
          />
        </div>

        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            cursor: "pointer",
            backgroundColor: isTimer ? "#F5F6FA" : "#018273",
          }}
          className="flex justify-center items-center"
          onClick={() => {
            setIsTimer(false);
          }}
        >
          <Icon
            name="list"
            width={16}
            height={16}
            color={isTimer ? "#3A3B3F" : "#fff"}
          />
        </div>
      </div>
    </div>
  );
};

const Timer = (props: any) => {
  const { setSelectData, selectData } = props;
  const [active, setActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timerWorker, setTimerWorker] = useState<Worker | null>(null);
  const { mutate: handleAddEdit } = useAddEditLog();
  const [timer, setTimer] = useState(true);

  function initWatch() {
    if (timerWorker === null) {
      const startTime = new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newWorker = new Worker(
        new URL("./timerFunction/timerWorker.ts", import.meta.url)
      );
      newWorker.onmessage = (event) => {
        setDuration(event?.data); // Add the pausedDuration to the current duration
      };
      newWorker.postMessage("start");
      setTimerWorker(newWorker);
      setActive(true);
      setSelectData((prev: any) => ({
        ...prev,
        start: startTime,
      }));
    }
  }

  function initResume() {
    if (timerWorker !== null) {
      const endTime = new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      timerWorker.postMessage("stop");
      setTimer(false);
      setActive(false);
      setSelectData((prev: any) => ({
        ...prev,
        end: endTime,
      }));
    }
  }

  const initReset = () => {
    setDuration(0);
    setTimerWorker(null);
    setActive(false);
    setSelectData({
      project: "",
      task: "",
      description: "",
      start: "",
      end: "",
      duration: "",
      projectId: "",
    });
  };

  useEffect(() => {
    return () => {
      initResume();
    };
  }, []);

  // api call to add time log when timer is stopped
  useEffect(() => {
    if (selectData?.end !== "" && !timer) {
      const duration = getDuration(selectData?.start, selectData?.end);
      handleAddEdit({
        payload: {
          ...selectData,
          date: new Date().toLocaleString("sv").split(" ")[0],
          duration: duration,
        },
      });
      initReset();
    }
  }, [selectData, timer]);

  return (
    <div className="flex flex-row items-center gap-[10px]">
      <Controls
        initWatch={initWatch}
        initResume={initResume}
        initReset={initReset}
        active={active}
      />
      <Watch time={duration} />
    </div>
  );
};

const Watch = (t: any) => {
  return (
    <span className="text-[#3A3B3F] text-2xl">
      <span>{("0" + Math.floor((t.time / 3600000) % 24)).slice(-2)}:</span>
      <span>{("0" + Math.floor((t.time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((t.time / 1000) % 60)).slice(-2)}</span>
    </span>
  );
};

const Controls = (props: any) => {
  const { initWatch, initResume, active } = props;

  const invokeTimer = (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        cursor: "pointer",
      }}
      className="bg-[#018273] flex justify-center items-center"
      onClick={initWatch}
    >
      <Icon name="rightIcon" height={20} width={20} />
    </div>
  );
  const activeTimer = (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        cursor: "pointer",
      }}
      className="bg-[#018273] flex justify-center items-center"
      onClick={initResume}
    >
      <Icon name={active ? "pauseIcon" : "rightIcon"} height={20} width={20} />
    </div>
  );
  return (
    <div>
      <div>{active ? activeTimer : invokeTimer}</div>
    </div>
  );
};

const ProductivityCards = () => {
  return (
    <div className="flex flex-1 flex-row mb-[20px]  gap-[10px] items-center">
      <div className="flex flex-col  w-1/3 bg-white border-1 border-solid border-gray-300 p-[20px]  items-center justify-center rounded-[8px]">
        <LabelHeading>Productivity Today</LabelHeading>
        <Text className="text-xl" style={{ color: "#018273" }}>
          8h 43m
        </Text>
      </div>
      <div className="flex flex-col  w-1/3 bg-white border-1 border-solid border-gray-300 p-[20px]  items-center justify-center rounded-[8px]">
        <LabelHeading>Productivity Yesterday</LabelHeading>
        <Text className="text-xl" style={{ color: "#018273" }}>
          7h 23m
        </Text>
      </div>
      <div className="flex flex-col  w-1/3 bg-white border-1 border-solid border-gray-300 p-[20px]  items-center justify-center rounded-[8px]">
        <LabelHeading>Productivity of this week</LabelHeading>
        <Text className="text-xl" style={{ color: "#018273" }}>
          7h 23m
        </Text>
      </div>
    </div>
  );
};

const LabelHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      className="text-base mt-3 pb-3 text-2l font-semibold"
      style={{
        color: "#3A3B3F",
      }}
    >
      {children}
    </Text>
  );
};

const TableComponent = (props: any) => {
  const {
    allTimeLogs,
    date,
    setDate,
    dateTime,
    setDateTime,
    isModalVisible,
    setIsModalVisible,
  } = props;

  const tableRef = useRef();
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Project",
        field: "project",
        flex: 1,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Task",
        field: "task",
        flex: 1,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Description",
        field: "description",
        flex: 2,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Start Time",
        field: "start",
        flex: 1.5,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "End Time",
        field: "end",
        flex: 1.5,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Duration",
        field: "duration",
        flex: 1,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Status",
        field: "Status",
        flex: 1,
        cellRenderer: (params: any) => {
          let text = "";
          let style = {};

          if (params.value === "Pending") {
            text = params.value;
            style = {
              color: "black",
              backgroundColor: "#c2c7bf",
              padding: "2px 2px",
              borderRadius: "6px",
              height: "30px",
              width: "80px",
            };
          } else if (params.value === "Approved") {
            text = params.value;
            style = {
              color: "white",
              backgroundColor: "#018273",
              padding: "2px 2px",
              borderRadius: "6px",
              height: "30px",
              width: "80px",
            };
          } else {
            text = "";
            style = {
              color: "#3A3B3F",
              height: "30px",
              width: "80px",
            };
          }

          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
              }}
            >
              {text}
            </div>
          );
        },
        valueGetter: (params: any) => {
          if (params.data.submitId && params.data.approval === false) {
            return "Pending";
          } else if (params.data.submitId && params.data.approval === true) {
            return "Approved";
          } else {
            return ""; // If neither submitId is present nor approval is true/false, leave it empty.
          }
        },
      },
      {
        headerName: "",
        cellRendererSelector: (params: { node: { group: any } }) => {
          if (params && params.node && params.node.group) {
            return null; // Return null for group nodes
          }
          return { component: createCustomCellRender };
        },
        width: 0,
      },
    ],
    []
  );

  // never changes, so we can use useMemo
  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  );

  return (
    <div className="flex flex-col w-full h-full">
      <TableTopComponent
        date={date}
        setDate={setDate}
        dateTime={dateTime}
        setDateTime={setDateTime}
        allTimeLogs={allTimeLogs}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible} // Pass the data to TableTopComponent
      />
      <div
        id="myGrid"
        className="ag-theme-alpine ag-theme-alpine-dark w-full flex-grow overflow-auto"
      >
        <AgGridReact
          ref={tableRef}
          className="ag-theme-alpine ag-theme-alpine-dark"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          rowData={allTimeLogs}
          // onSelectionChanged={onSelectionChanged}
          rowClass="row-hover"
        />
      </div>
    </div>
  );
};

const TableTopComponent = (props: any) => {
  const {
    date,
    setDate,
    dateTime,
    setDateTime,
    allTimeLogs,
    isModalVisible,
    setIsModalVisible,
  } = props;
  const getIds = allTimeLogs.map((item: any) => item._id);

  const { mutate: handleAddEdit } = useAddEditLog();

  const decrementDate = () => {
    const yesterday = new Date(dateTime);
    yesterday.setDate(yesterday.getDate() - 1);
    setDateTime(yesterday);
    setDate(formatDate(yesterday));
  };

  const incrementDate = () => {
    const tomorrow = new Date(dateTime);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    if (tomorrow <= currentDate) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDateTime(tomorrow);
      setDate(formatDate(tomorrow));
    }
  };

  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = () => {
    const uuid = uuidv4();
    const appendData = allTimeLogs.map((item: any) => ({
      ...item,
      ["submitId"]: uuid,
    }));

    handleAddEdit({
      payload: { taskIds: getIds, updateTask: appendData },
    });
    setIsModalVisible(true);
  };

  return (
    <div
      className="justify-between flex border-t border-r border-l  rounded-t-lg
       border-[#F5F6FA] w-full h-16  bg-white px-6"
    >
      <div className=" flex flex-row items-center gap-[15px]">
        <div
          className="cursor-pointer"
          onClick={() => {
            decrementDate();
          }}
        >
          <Icon name="left" width={24} height={24} />
        </div>
        <div>
          <Text className="text-[#3A3B3F] font-bold">
            {new Date(date)
              .toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
              .replace(/,/, "")}
          </Text>
        </div>
        <div
          className="cursor-pointer text-2xl  font-bold"
          onClick={() => {
            incrementDate();
          }}
        >
          <Icon name="right" width={24} height={24} />
        </div>
      </div>
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="bg-[#018273] text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
