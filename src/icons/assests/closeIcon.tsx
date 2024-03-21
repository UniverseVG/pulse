import { SVGProps } from "react";
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 16}
    height={props.height || 16}
    fill={props?.fill || "#000"}
    {...props}
  >
    <g
      stroke={props?.fill || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      opacity={0.5}
    >
      <path d="m12 4-8 8M4 4l8 8" />
    </g>
  </svg>
);
export default CloseIcon;
