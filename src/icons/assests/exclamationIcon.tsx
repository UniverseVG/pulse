import { SVGProps } from "react";
const ExclamationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 48}
    height={props.height || 48}
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
      fill="#FFAF0B"
    />
    <path
      d="M24 16V24"
      stroke="#4D2E45"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 32H24.0194"
      stroke="#4D2E45"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ExclamationIcon;
