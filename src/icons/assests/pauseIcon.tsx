import { SVGProps } from "react";
const PauseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || 14}
    height={props?.height || 14}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect width={4} height={14} x={6} y={5} fill="#fff" rx={1} />
    <rect width={4} height={14} x={14} y={5} fill="#fff" rx={1} />
  </svg>
);
export default PauseIcon;
