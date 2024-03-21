import { useState } from "react";

const DropDown = ({
  data,
  onChange,
  placeholder = "Select",
  style,
  value,
  setProjectId,
  disabled,
  position,
  containerStyle,
}: any) => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!value) {
      setSelected("");
    }
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSelect = (item: any) => {
    if (setProjectId) {
      setProjectId(item._id);
      onChange?.(item?.["projectName"] || item?.value);
      setSelected(item?.projectName || item?.value);
      setOpen(false);
    } else {
      onChange?.(item?.["projectName"] || item?.value);
      setSelected(item?.projectName || item?.value);
      setOpen(false);
    }
  };

  const handleDeSelect = () => {
    onChange?.("");
    setOpen(false);
    setSelected("");
  };

  return (
    <>
      {open && (
        <div
          style={{ position: "fixed", top: 0, left: 0, zIndex: 10 }}
          className="h-screen w-screen"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="relative">
        <button
          type="button"
          className="relative w-full rounded py-1.5 text-left sm:text-sm sm:leading-6 flex items-center justify-between px-3.5 cursor-pointer"
          onClick={handleOpen}
          style={{
            marginBottom: 0,
            backgroundColor: "#ffff",
            height: 40,
            borderWidth: 1,
            borderColor: "#9EA0A5",
            opacity: disabled ? 0.4 : 1,
            ...containerStyle,
          }}
          disabled={disabled}
        >
          <span className="flex items-center">
            <span
              className="block truncate"
              style={{
                color: value ? "#3a3b3f" : "#9EA0A5",
              }}
            >
              {value || placeholder}
            </span>
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.1584 8L12 -1.47731e-07H0L6.1584 8Z" fill="#3A3B3F" />
          </svg>
        </button>

        {open && (
          <>
            <div
              className={`overflow-auto max-h-56 ${
                position || "absolute"
              } z-50 mt-1 w-full rounded-md bg-[#9EA0A5] text-base shadow-lg sm:text-sm origin-top-right`}
              role="menu"
              aria-labelledby="menu-button"
              style={{ borderWidth: 1, borderColor: "#9EA0A5" }}
            >
              <button
                className="relative w-full cursor-default select-none py-2 pl-3 pr-9"
                onClick={() => {
                  handleDeSelect();
                }}
                style={{
                  ...style,
                }}
              >
                <div className="flex items-center text-[#3a3b3f] font-semibold cursor-pointer">
                  <span className="font-regular  ml-3 block truncate">
                    Select
                  </span>
                </div>
              </button>
              {data?.map((item: any) => {
                const isSelected =
                  item.projectName === selected ||
                  item.projectName === value ||
                  item.value === selected ||
                  item.value === value;
                return (
                  <button
                    key={item.id}
                    className="relative w-full cursor-default select-none py-2 pl-3 pr-9"
                    onClick={() => handleSelect(item)}
                    style={{
                      backgroundColor: isSelected ? "#F5F6FA" : "#9EA0A5",
                      ...style,
                    }}
                  >
                    <div className="flex items-center text-[#3a3b3f] font-semibold cursor-pointer">
                      <span className="font-regular  ml-3 block truncate">
                        {item?.projectName || item?.value}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DropDown;
