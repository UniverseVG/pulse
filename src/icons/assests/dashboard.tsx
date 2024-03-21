import { SVGProps } from "react";
const Dashboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width || 24}
    height={props?.height || 24}
    fill={props?.fill || "#000"}
    viewBox="0 0 576 448"
    {...props}
  >
    <path
      fill={props?.fill || "#000"}
      d="M536 160H397v248h139V160ZM357 408V160H219v248h138ZM40 40v80h496V40H40ZM179 408V160H40v248h139Z"
    />
    <path
      fill={props?.fill || "#000"}
      fillRule="evenodd"
      d="M16 0C7.163 0 0 7.163 0 16v104h40V40h496v80h40V16c0-8.837-7.163-16-16-16H16ZM0 160v272c0 8.837 7.163 16 16 16h163v-40H40V160H0Zm219 288h138v-40H219v40Zm178 0h163c8.837 0 16-7.163 16-16V160h-40v248H397v40Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Dashboard;
