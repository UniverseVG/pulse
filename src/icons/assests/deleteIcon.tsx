import { SVGProps } from "react";
const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 18}
    height={props.height || 24}
    viewBox="0 0 18 24"
    fill={props?.fill || "#000"}
    {...props}
  >
    <path
      fill={props?.fill || "#000"}
      d="M1.286 21.333C1.286 22.8 2.443 24 3.857 24h10.286c1.414 0 2.571-1.2 2.571-2.667v-16H1.286v16ZM18 1.333h-4.5L12.214 0H5.786L4.5 1.333H0V4h18V1.333Z"
    />
  </svg>
);
export default DeleteIcon;
