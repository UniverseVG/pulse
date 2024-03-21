import Text from "../text";

const Input = (props: any) => {
  const {
    id,
    type = "text",
    placeholder,
    label = "",
    onChange,
    value,
    iconLeft,
    iconRight,
    inputStyle,
    labelVariant = "shadow-light",
    inputFieldStyle,
    onFocus,
    onBlur,
    onClick,
    style,
    errorMessage,
    disabled,
  } = props;
  return (
    <>
      {label && (
        <Text
          variant={labelVariant}
          className="mt-2 block font-regular"
          style={{ color: "rgba(255, 255, 255, 0.5)" }}
        >
          {label}
        </Text>
      )}

      <div
        className="relative w-full h-10 rounded"
        data-te-input-wrapper-init
        style={{
          borderWidth: 1,
          borderColor: "#9EA0A5",
          height: 40,
          backgroundColor: "#ffff",
          opacity: disabled ? 0.4 : 1,
          ...style,
        }}
      >
        {iconLeft && (
          <span className="z-10 h-full leading-snug font-regular absolute left-3 top-0 bottom-0 my-auto flex justify-center items-center">
            {iconLeft}
          </span>
        )}
        <input
          type={type}
          id={id}
          className={`bg-white/10 placeholder-white/30 text-[#3A3B3F] font-regular text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-onPrimary dark:focus:ring-blue-500 dark:focus:border-blue-500 h-full ${inputFieldStyle}  `}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
          style={{
            backgroundColor: "#ffff",
            color: "#3A3B3F",
            outline: "none",
            ...inputStyle,
          }}
          autoComplete="off"
          disabled={disabled}
        />
        {iconRight && (
          <span className="z-10 h-full leading-snug font-regular absolute text-center text-slate-300 right-3 top-0 bottom-0 my-auto flex justify-center items-center">
            {iconRight}
          </span>
        )}
      </div>

      {errorMessage && (
        <Text
          className="block text-xs h-3.5"
          style={{ color: "#D74D00", opacity: errorMessage ? "1" : "0" }}
        >
          {errorMessage || ""}
        </Text>
      )}
    </>
  );
};

export default Input;
