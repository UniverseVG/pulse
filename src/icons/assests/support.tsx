import { SVGProps } from "react";
const Support = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || 24}
    height={props?.height || 24}
    fill={props?.fill || "#000"}
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill={props?.fill || "#000"}
      fillRule="evenodd"
      d="M18 9A9 9 0 1 1 0 9a9 9 0 0 1 18 0Zm-8-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 9V8H8v6h2Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Support;
