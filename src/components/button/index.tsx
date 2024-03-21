import React from "react";

interface ButtonProps {
  appearance?: "filled" | "outlined" | "text";
  status?: "active" | "inactive";
  iconLeft?: React.ReactElement | null;
  iconRight?: React.ReactElement | null;
  label: string;
  onPress: () => void;
  size?: "large" | "medium" | "small";
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  textVariant?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  appearance = "filled",
  status,
  iconLeft = null,
  iconRight = null,
  label,
  onPress,
  size = "large",
  style,
  textStyle,
  textVariant = "functional1",
  className,
}) => {
  const handleButtonSubmit = () => {
    onPress();
  };

  const getButtonSize = (size: string, customPadding?: string) => {
    switch (size) {
      case "small":
        return {
          padding: customPadding || "0.5rem 1rem",
        };
      case "medium":
        return {
          padding: customPadding || "0.75rem 1.5rem",
        };
      case "large":
        return {
          padding: customPadding || "1rem 3rem",
        };
      default:
        return {
          padding: customPadding || "1rem 2rem",
        };
    }
  };

  const getButtonTextStyle = (appearance: string) => {
    const textStyle: React.CSSProperties = {
      color: `var(--md-sys-color-shadow)`, // Default text color
    };

    if (appearance === "filled") {
      textStyle.color = `var(--md-sys-color-on-primary)`; // Set text color for filled appearance
    }

    if (appearance === "outlined") {
      textStyle.color = "rgba(255, 255, 255, 0.5)";
      textStyle.fontSize = 12;
    }

    return textStyle;
  };

  const getButtonStyle = (
    appearance: string,
    status?: string,
    customStyle?: React.CSSProperties
  ) => {
    const buttonStyle: React.CSSProperties = {};

    if (appearance === "text") {
      buttonStyle.backgroundColor = "transparent"; // Set transparent background color for text appearance
    } else if (appearance === "outlined") {
      buttonStyle.backgroundColor = "#201E3A"; // Set transparent background color for outlined appearance
      buttonStyle.borderColor = "rgba(255, 255, 255, 0.1)"; // Set border color for outlined appearance
      buttonStyle.borderWidth = 1; // Set border width for outlined appearance
      buttonStyle.borderRadius = 4;
    }

    if (status === "inactive" && appearance !== "outlined") {
      buttonStyle.backgroundColor = `var(--md-sys-color-outline)`; // Set background color for inactive status
    }

    if (status === "inactive" && appearance === "outlined") {
      buttonStyle.opacity = 0.3; // Set opacity for inactive outlined button
    }

    return {
      ...buttonStyle,
      ...customStyle, // Merge with custom style if provided
    };
  };

  const customPadding =
    style && style.padding ? `${style.padding}px` : undefined;
  const buttonSize = getButtonSize(size, customPadding);
  const buttonStyle = getButtonStyle(appearance, status, style);

  return (
    <button
      className={`inline-flex items-center justify-center ${appearance} ${className}`}
      disabled={status === "inactive"}
      onClick={handleButtonSubmit}
      style={{
        ...style,
        ...buttonSize, // Apply size-related padding styles directly
        ...buttonStyle, // Apply button styles based on appearance and status
      }}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span
        className={`text-${textVariant}`}
        style={{
          ...getButtonTextStyle(appearance), // Apply text color based on appearance
          ...textStyle, // Additional text styles
        }}
      >
        {label}
      </span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;
