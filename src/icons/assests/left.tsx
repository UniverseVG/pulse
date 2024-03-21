import { SVGProps } from "react";
const Left = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={props?.fill || "#000"} strokeWidth={2} d="m15 6-6 6 6 6" />
  </svg>
);
export default Left;
