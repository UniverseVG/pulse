import { SVGProps } from "react";
const Calender = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || 24}
    height={props?.height || 24}
    fill={props?.fill || "#000"}
    viewBox="0 0 24 24"
    {...props}
  >
    <rect
      width={18}
      height={15}
      x={3}
      y={6}
      stroke={props?.fill || "#000"}
      strokeWidth={2}
      rx={2}
    />
    <path
      fill={props?.fill || "#000"}
      d="M3 10c0-1.886 0-2.828.586-3.414C4.172 6 5.114 6 7 6h10c1.886 0 2.828 0 3.414.586C21 7.172 21 8.114 21 10H3Z"
    />
    <path
      stroke={props?.fill || "#000"}
      strokeLinecap="round"
      strokeWidth={2}
      d="M7 3v3M17 3v3"
    />
    <rect width={4} height={2} x={7} y={12} fill="#fff" rx={0.5} />
    <rect width={4} height={2} x={7} y={16} fill="#fff" rx={0.5} />
    <rect width={4} height={2} x={13} y={12} fill="#fff" rx={0.5} />
    <rect width={4} height={2} x={13} y={16} fill="#fff" rx={0.5} />
  </svg>
);
export default Calender;
