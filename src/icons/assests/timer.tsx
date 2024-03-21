import { SVGProps } from "react";
const Timer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={props?.color || "#33363F"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m12 12 6.125 4.17A2 2 0 0 1 19 17.822V20.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-2.677a2 2 0 0 1 .875-1.654L12 12Zm0 0 6.125-4.17A2 2 0 0 0 19 6.178V3.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v2.677a2 2 0 0 0 .875 1.654L12 12Z"
    />
    <path
      fill={props?.color || "#33363F"}
      d="M15 20.207v.643a.15.15 0 0 1-.15.15h-5.7a.15.15 0 0 1-.15-.15v-.643a.5.5 0 0 1 .146-.353l2.288-2.288a.8.8 0 0 1 1.132 0l2.288 2.288a.5.5 0 0 1 .146.353ZM12 11l5-3H7l5 3Z"
    />
    <path
      stroke={props?.color || "#33363F"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18v-6"
    />
  </svg>
);
export default Timer;
