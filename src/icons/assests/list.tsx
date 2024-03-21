import { SVGProps } from "react";
const List = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect
      width={14}
      height={17}
      x={5}
      y={4}
      stroke={props?.color || "#33363F"}
      rx={2}
    />
    <path
      stroke={props?.color || "#33363F"}
      strokeLinecap="round"
      d="M9 9h6M9 13h6M9 17h4"
    />
  </svg>
);
export default List;
