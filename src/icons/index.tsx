import React from "react";
import iconName from "./assests/index";

interface IconProps {
  name: keyof typeof iconName;
  className?: any;
  color?: string;
  height?: number;
  width?: number;
  fill?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  color,
  height,
  width,
  ...props
}) => {
  const IconComponent = iconName[name]?.component;
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent color={color} width={width} height={height} {...props} />
  );
};

export default Icon;
