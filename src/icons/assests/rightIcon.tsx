import { SVGProps } from "react";
const RightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || 14}
    height={props?.height || 14}
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill="#fff"
      d="M13.553 6.776 1.158.58A.8.8 0 0 0 0 1.294v11.412a.8.8 0 0 0 1.158.715l12.395-6.197a.25.25 0 0 0 0-.448Z"
    />
  </svg>
);
export default RightIcon;
