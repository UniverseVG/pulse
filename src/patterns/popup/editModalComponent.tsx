import Icon from "../../icons";
import Text from "../../components/text";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import DropDown from "../../components/dropDown";
import { Projects, Tasks } from "../../constants";
import { useEffect, useState } from "react";
import { useGetLogById } from "../../hooks/useGetLogById";
import { Input } from "../../components";
import { useAddEditLog } from "../../hooks/mutation/useAddEditLog";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getDuration } from "../../utils/getDuration";
import dayjs from "dayjs";

interface EditModalComponentProps {
  subTitle: string;
  primaryCtaText: string;
  title?: string;
  handleSecondaryCta: any;
  secondaryCtaText: string;
  leftSideCtaText: any;
}

const EditModalComponent = (props: EditModalComponentProps) => {
  const {
    handleSecondaryCta,
    leftSideCtaText,
    primaryCtaText,
    secondaryCtaText,
    subTitle,
    title,
  } = props;
  const url = window.location;
  const query = url?.hash?.split("=")[0]?.split("#")[1]?.split("?")[0];
  const logId = url?.hash?.split("=")[1];
  const [selectData, setSelectData] = useState({
    project: "",
    task: "",
    description: "",
    start: "",
    end: "",
    duration: "",
    date: new Date(),
  });
  const navigate = useNavigate();

  //get product by id

  const { logDetails } = useGetLogById(logId);

  //functions related to time log update are below
  const handleSelect = (data: any, field: string) => {
    setSelectData({ ...selectData, [field]: data });
  };

  useEffect(() => {
    if (!logDetails) return;
    if (logDetails) {
      const dateValue = new Date(logDetails?.start);

      setSelectData({ ...logDetails, date: dateValue });
    }
  }, [logDetails, logId]);

  useEffect(() => {
    const dateValue = new Date(selectData?.date)
      ?.toLocaleString("sv")
      ?.split(" ")[0];

    setSelectData((prev: any) => ({
      ...prev,
      start: dateValue
        ? `${dateValue}T${selectData?.start?.split("T")[1]}`
        : selectData?.start,

      end: dateValue
        ? `${dateValue}T${selectData?.end?.split("T")[1]}`
        : selectData?.end,
    }));
  }, [selectData?.date]);

  useEffect(() => {
    const { start, end } = selectData;

    if (start && end) {
      const duration = getDuration(start, end);
      setSelectData((prevData) => ({ ...prevData, duration: duration }));
    }
  }, [selectData?.start, selectData?.end]);

  //edit time log
  const { mutate: handleAddEdit } = useAddEditLog();

  if (query !== "updateLog") return null;
  else {
    return (
      <div
        className="relative z-50 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="false"
      >
        <div
          className="fixed inset-0 z-10 overflow-y-auto bg-[#f5f6fa] bg-opacity-80 transition-opacity
      "
        >
          <div className="  flex min-h-full sm:justify-center p-0 text-center items-end sm:items-center sm:p-0 ">
            <div className=" bg-[#fff]  relative transform overflow-hidden rounded-[12px] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
              <div className=" pt-5 flex justify-between pr-5 items-center ">
                <Text className="pl-5 text-xl font-bold text-[#3a3b3f]">
                  {title}
                </Text>
                <div
                  className="bg-[#f5f6fa] flex items-center p-2 justify-center rounded-2xl cursor-pointer"
                  onClick={() => navigate("#")}
                >
                  <Icon name="closeIcon" height={16} width={16} />
                </div>
              </div>
              <div className="my-2  flex-col px-5">
                <Text className="text-sm font-semibold  text-[#3a3b3f]">
                  {subTitle}
                </Text>
              </div>
              <div>
                <div className="flex flex-col mb-[20px] bg-white border-1 border-solid border-gray-300 pl-5 pr-5 gap-[10px] rounded-[8px]">
                  <div>
                    <LabelHeading>Project</LabelHeading>
                    <DropDown
                      data={Projects}
                      onChange={(value: any) => handleSelect(value, "project")}
                      field="value"
                      value={selectData?.project}
                      containerStyle={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <LabelHeading>Task</LabelHeading>
                    <DropDown
                      data={Tasks}
                      onChange={(value: any) => handleSelect(value, "task")}
                      field="value"
                      value={selectData?.task}
                      containerStyle={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <LabelHeading>Description</LabelHeading>
                    <textarea
                      className="w-full h-[60px] p-2 border rounded resize-none text-[#3A3B3F] placeholder-[#9EA0A5]"
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
                  <div style={{ width: "100%" }}>
                    <LabelHeading>Date</LabelHeading>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(new Date(selectData?.date))}
                        defaultValue={dayjs(new Date(selectData?.date))}
                        onChange={(event: any) => {
                          handleSelect(event?.$d, "date");
                        }}
                        className="edit-task-dashboard"
                        slotProps={{
                          textField: { size: "small", fullWidth: true },
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div>
                    <LabelHeading>Start & End time</LabelHeading>
                    <div className="flex flex-row w-full gap-4">
                      <Input
                        id="start_time"
                        placeholder="Start time"
                        value={selectData?.start}
                        onChange={(event: { target: { value: any } }) =>
                          handleSelect(event.target.value, "start")
                        }
                        style={{ width: "50%" }}
                      />
                      <Input
                        id="end_time"
                        placeholder="End time"
                        value={selectData?.end}
                        onChange={(event: { target: { value: any } }) =>
                          handleSelect(event.target.value, "end")
                        }
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <LabelHeading>Duration</LabelHeading>
                    <Input
                      id="start_time"
                      placeholder="Start time"
                      value={selectData?.duration}
                      onChange={(event: { target: { value: any } }) =>
                        handleSelect(event.target.value, "start")
                      }
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex px-5 w-full items-center">
                {leftSideCtaText && (
                  <Button
                    appearance="outlined"
                    status={"active"}
                    label={leftSideCtaText}
                    onPress={() => {
                      navigate(`/calender?taskId=${logDetails?._id}`);
                    }}
                    style={{
                      padding: "3px 8px",
                      backgroundColor: "#f5f6fa",
                    }}
                    textVariant="primary"
                    className="w-32 text-sm font-semibold"
                    textStyle={{ color: "#3a3b3f" }}
                    iconRight={
                      <Icon
                        name="deleteIcon"
                        height={13}
                        width={13}
                        fill={"red"}
                      />
                    }
                  />
                )}
                <div className=" flex justify-end gap-5 py-5 w-full items-center">
                  {handleSecondaryCta && (
                    <div
                      onClick={() => handleSecondaryCta()}
                      className="cursor-pointer"
                    >
                      <Text
                        className="text-sm font-semibold text-[#3a3b3f]"
                        textStyle={{ color: "#3a3b3f" }}
                      >
                        {secondaryCtaText}
                      </Text>
                    </div>
                  )}

                  <Button
                    appearance="outlined"
                    status={"active"}
                    label={primaryCtaText}
                    onPress={() => {
                      handleAddEdit({
                        payload: {
                          taskIds: [logId],
                          updateTask: [{ ...selectData }],
                        },
                      });
                      navigate("#");
                    }}
                    style={{
                      padding: "3px 8px",
                      backgroundColor: "#f5f6fa",
                    }}
                    textVariant="primary"
                    className="w-32 text-sm font-semibold"
                    textStyle={{ color: "#3a3b3f" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
export default EditModalComponent;
