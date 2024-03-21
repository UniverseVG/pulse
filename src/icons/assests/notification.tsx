import { SVGProps } from "react";
const Notification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#222"
      d="M6.448 8.97a5.586 5.586 0 0 1 11.104 0l.252 2.266.006.057a8 8 0 0 0 1.074 3.18l.03.05.577.963c.525.874.787 1.311.73 1.67a1 1 0 0 1-.345.61c-.279.234-.789.234-1.808.234H5.932c-1.02 0-1.53 0-1.808-.233a1 1 0 0 1-.346-.611c-.056-.359.206-.796.73-1.67l.579-.964.03-.05a8 8 0 0 0 1.073-3.179l.006-.057.252-2.267Z"
    />
    <path
      stroke="#222"
      strokeLinecap="round"
      d="M9.102 18.406c.171.744.548 1.402 1.072 1.87.524.47 1.166.724 1.826.724.66 0 1.302-.254 1.826-.723.524-.47.9-1.127 1.072-1.871"
    />
  </svg>
);
export default Notification;
