import Icon from "../../icons";

export const HoverActionComponent = (props: any) => {
  return (
    <div className="action-container absolute sm:fixed sm:hidden block h-full">
      <div className="flex gap-3 px-3.5 items-center h-full">
        <a
          href={`/dashboard#updateLog?taskId=${props?.params?.data?._id}`}
          className=""
        >
          <div
            className="border rounded-full flex items-center justify-center cursor-pointer trailing-action"
            id="hover_copy_icon"
            style={{
              background: "#c0e0dc",
              borderColor: "rgba(255, 255, 255, 0.1)",
              width: 26,
              height: 26,
            }}
          >
            <Icon name="editIcon" height={13} width={13} />
          </div>
        </a>
        <a href={`/dashboard?taskId=${props?.params?.data?._id}`}>
          <div
            className="border rounded-full flex items-center justify-center cursor-pointer"
            id="hover_eye_icon"
            style={{
              background: "#c0e0dc",
              borderColor: "rgba(255, 255, 255, 0.1)",
              width: 26,
              height: 26,
            }}
          >
            <Icon name="deleteIcon" height={13} width={13} fill={"red"} />
          </div>
        </a>
      </div>
    </div>
  );
};
