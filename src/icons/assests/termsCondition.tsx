import { SVGProps } from "react";
const TermsAndCondition = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18 9A9 9 0 1 1 0 9a9 9 0 0 1 18 0Zm-8 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 2a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2h.094C10.147 4 11 4.853 11 5.906v.513c0 .514-.329.97-.816 1.132A3.194 3.194 0 0 0 8 10.581V13h2v-2.419c0-.514.329-.97.816-1.132A3.194 3.194 0 0 0 13 6.419v-.513A3.906 3.906 0 0 0 9.094 2H9Z"
      clipRule="evenodd"
    />
  </svg>
);
export default TermsAndCondition;
