import Icon from "../../icons";
import Text from "../../components/text";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

interface DeleteModalComponentProps {
  promptText: string;
  subPromptText: string;
  primaryCtaText: string;
  title?: string;
  handlePrimaryCta: any;
  handleSecondaryCta: any;
  secondaryCtaText: string;
}

const DeleteModalComponent = (props: DeleteModalComponentProps) => {
  const url = window.location;
  const query = url?.search?.split("=")[0]?.split("?")[1];
  const navigate = useNavigate();

  const {
    promptText,
    subPromptText,
    primaryCtaText,
    handlePrimaryCta,
    title,
    handleSecondaryCta,
    secondaryCtaText,
  } = props;
  if (query !== "taskId") return null;
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
              <div className=" pt-5 flex justify-between pr-5 ">
                <Text className="pl-5 text-xl font-medium">{title}</Text>
                <div
                  className="bg-[#f5f6fa] flex items-center p-2 justify-center rounded-2xl cursor-pointer"
                  onClick={() => navigate("#")}
                >
                  <Icon name="closeIcon" height={16} width={16} />
                </div>
              </div>

              <div className="flex px-5 mt-6 mx-4 ">
                <div className="flex  items-center justify-center">
                  <Icon name="exclamationIcon" />
                </div>
              </div>
              <div className="my-6 mx-4 flex-col px-5">
                <Text className="text-2xl font-bold mb-4 text-[#3a3b3f]">
                  {promptText}
                </Text>
                <Text className="text-sm font-semibold  text-[#3a3b3f]">
                  {subPromptText}
                </Text>
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
                {handlePrimaryCta && (
                  <Button
                    appearance="outlined"
                    status={"active"}
                    label={primaryCtaText}
                    onPress={() => handlePrimaryCta()}
                    style={{
                      padding: "3px 8px",
                      backgroundColor: "#f5f6fa",
                    }}
                    textVariant="primary"
                    className="w-32 text-sm font-semibold"
                    textStyle={{ color: "#3a3b3f" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default DeleteModalComponent;
