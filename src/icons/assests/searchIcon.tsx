import { SVGProps } from "react";
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || 24}
    height={props?.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle
      cx={11}
      cy={11}
      r={7}
      stroke={props?.color || "#3A3B3F"}
      strokeWidth={2}
    />
    <path
      stroke={props?.color || "#3A3B3F"}
      strokeLinecap="round"
      strokeWidth={2}
      d="m20 20-4-4"
    />
  </svg>
);
export default SearchIcon;
