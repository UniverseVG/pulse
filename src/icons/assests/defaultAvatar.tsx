import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  const { width = 37, height = 36 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <circle cx={18.93} cy={18} r={18} fill={props?.fill} opacity={0.25} />
      <g filter="url(#a)">
        <rect
          width={2.543}
          height={6.075}
          x={6.145}
          y={18.173}
          fill="#9498F7"
          rx={1.271}
        />
      </g>
      <rect
        width={2.012}
        height={5.544}
        x={6.41}
        y={18.438}
        stroke="#5458C7"
        strokeWidth={0.53}
        rx={1.006}
      />
      <rect
        width={2.012}
        height={5.544}
        x={29.437}
        y={18.438}
        fill="#9498F7"
        stroke="#5458C7"
        strokeWidth={0.53}
        rx={1.006}
      />
      <path stroke="#5458C7" strokeWidth={0.53} d="M18.983 9.821v3.694" />
      <g filter="url(#b)">
        <rect
          width={6.216}
          height={3.673}
          x={15.893}
          y={11.113}
          fill="#9498F7"
          rx={1.837}
        />
      </g>
      <rect
        width={5.685}
        height={3.143}
        x={16.158}
        y={11.379}
        stroke="#5458C7"
        strokeWidth={0.53}
        rx={1.571}
      />
      <g filter="url(#c)">
        <circle cx={19.001} cy={7.91} r={2.26} fill="#9498F7" />
      </g>
      <path
        stroke="#5458C7"
        strokeWidth={0.53}
        d="M20.996 7.91a1.995 1.995 0 1 1-3.99 0 1.995 1.995 0 0 1 3.99 0Z"
      />
      <g filter="url(#d)">
        <path
          fill="#9498F7"
          d="M7.416 20.384a7.293 7.293 0 0 1 7.293-7.293h8.442a7.293 7.293 0 0 1 7.292 7.293v4.384a3.58 3.58 0 0 1-3.58 3.58H10.996a3.58 3.58 0 0 1-3.58-3.58v-4.384Z"
        />
      </g>
      <path
        stroke="#5458C7"
        strokeWidth={0.53}
        d="M14.71 13.356h8.44a7.028 7.028 0 0 1 7.028 7.028v4.384a3.315 3.315 0 0 1-3.315 3.315H10.996a3.315 3.315 0 0 1-3.314-3.315v-4.384a7.028 7.028 0 0 1 7.027-7.028Z"
      />
      <path
        fill="#fff"
        stroke="#5458C7"
        strokeWidth={0.53}
        d="M16.9 18.461a2.843 2.843 0 1 1-5.686 0 2.843 2.843 0 0 1 5.685 0Z"
      />
      <circle cx={14.056} cy={18.462} r={1.554} fill="#5458C7" />
      <circle cx={13.491} cy={18.18} r={0.566} fill="#fff" />
      <path
        fill="#fff"
        stroke="#5458C7"
        strokeWidth={0.53}
        d="M26.505 18.461a2.843 2.843 0 1 1-5.685 0 2.843 2.843 0 0 1 5.685 0Z"
      />
      <circle cx={23.662} cy={18.462} r={1.554} fill="#5458C7" />
      <circle cx={23.098} cy={18.18} r={0.566} fill="#fff" />
      <path
        stroke="#5458C7"
        strokeLinecap="round"
        strokeWidth={0.53}
        d="M16.176 23.404c1.13 2.19 4.308 2.19 5.51 0"
      />
      <defs>
        <filter
          id="a"
          width={2.543}
          height={6.074}
          x={6.145}
          y={18.173}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1.061} dy={0.398} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2753_11926" />
        </filter>
        <filter
          id="b"
          width={6.216}
          height={3.673}
          x={15.893}
          y={11.113}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1.061} dy={0.398} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2753_11926" />
        </filter>
        <filter
          id="c"
          width={4.521}
          height={4.521}
          x={16.741}
          y={5.649}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1.061} dy={0.398} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2753_11926" />
        </filter>
        <filter
          id="d"
          width={23.027}
          height={15.257}
          x={7.416}
          y={13.091}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={1.061} dy={0.398} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2753_11926" />
        </filter>
      </defs>
    </svg>
  );
};
export default SvgComponent;
