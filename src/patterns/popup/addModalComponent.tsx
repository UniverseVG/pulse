import Icon from "../../icons";
import Text from "../../components/text";
import Button from "../../components/button";
import DropDown from "../../components/dropDown";
import { Projects, Tasks } from "../../constants";
import { useEffect, useState } from "react";
import { useGetLogById } from "../../hooks/useGetLogById";
import { Input } from "../../components";
import { useAddEditLog } from "../../hooks/mutation/useAddEditLog";
import { getDuration } from "../../utils/getDuration";

interface AddModalComponentProps {
  show: any;
  setShow: any;
  subTitle: string;
  primaryCtaText: string;
  title?: string;
  handleSecondaryCta: any;
  secondaryCtaText: string;
  time: any;
}

const AddModalComponent = (props: AddModalComponentProps) => {
  const {
    show,
    setShow,
    subTitle,
    primaryCtaText,
    title,
    handleSecondaryCta,
    secondaryCtaText,
    time,
  } = props;
  const url = window.location;

  const logId = url?.hash?.split("=")[1];
  const [selectData, setSelectData] = useState({
    project: "",
    task: "",
    description: "",
    start: "",
    end: "",
    duration: "",
  });

  //get product by id

  const { logDetails } = useGetLogById(logId);

  //functions related to time log update are below
  const handleSelect = (data: any, field: string) => {
    setSelectData({ ...selectData, [field]: data });
  };

  useEffect(() => {
    if (!time) return;
    if (time) {
      const duration = getDuration(time?.start, time?.end);
      setSelectData({ ...selectData, ...time, duration: duration });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    const { start, end } = selectData;

    if (start && end) {
      const duration = getDuration(start, end);
      setSelectData((prevData) => ({ ...prevData, duration: duration }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectData?.start, selectData?.end]);

  //edit time log
  const { mutate: handleAddEdit } = useAddEditLog();

  if (!show) return null;
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
                  onClick={() => setShow(false)}
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
                      value={selectData?.project || logDetails?.project}
                      containerStyle={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <LabelHeading>Task</LabelHeading>
                    <DropDown
                      data={Tasks}
                      onChange={(value: any) => handleSelect(value, "task")}
                      field="value"
                      value={selectData?.task || logDetails?.task}
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
                      value={selectData?.description || logDetails?.description}
                    />
                  </div>
                  <div>
                    <LabelHeading>Start & End time</LabelHeading>
                    <div className="flex flex-row w-full gap-4">
                      <Input
                        id="start_time"
                        placeholder="Start time"
                        value={selectData?.start || logDetails?.start}
                        onChange={(event: { target: { value: any } }) =>
                          handleSelect(event.target.value, "start")
                        }
                        style={{ width: "50%" }}
                      />
                      <Input
                        id="end_time"
                        placeholder="End time"
                        value={selectData?.end || logDetails?.end}
                        onChange={(event: { target: { value: any } }) => {
                          handleSelect(event.target.value, "end");
                        }}
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <LabelHeading>Duration</LabelHeading>
                    <Input
                      id="start_time"
                      placeholder="Start time"
                      value={selectData?.duration || logDetails?.duration}
                      onChange={(event: { target: { value: any } }) =>
                        handleSelect(event.target.value, "duration")
                      }
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className=" flex justify-end gap-5 p-5 w-full items-center">
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
                      payload: selectData,
                    });
                    setShow(false);
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
export default AddModalComponent;
