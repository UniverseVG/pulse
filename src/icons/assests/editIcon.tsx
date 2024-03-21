import { SVGProps } from "react";
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 18}
    height={props.height || 18}
    viewBox="0 0 18 18"
    fill={props?.fill || "#000"}
    {...props}
  >
    <path
      fill={props?.fill || "#000"}
      fillRule="evenodd"
      d="M14.204 7.796 16 6c.545-.545.818-.818.964-1.112a2 2 0 0 0 0-1.776C16.818 2.818 16.545 2.545 16 2c-.545-.545-.818-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.567.419-1.112.964l-1.819 1.819a10.9 10.9 0 0 0 4.023 3.977ZM8.727 5.273l-6.87 6.87c-.426.426-.638.638-.778.9-.14.26-.199.555-.317 1.145l-.615 3.077c-.066.332-.1.498-.005.593.095.095.26.061.593-.005l3.077-.616c.59-.117.885-.176 1.146-.316.26-.14.473-.352.898-.777l6.89-6.89a12.902 12.902 0 0 1-4.02-3.98Z"
      clipRule="evenodd"
    />
  </svg>
);
export default EditIcon;
