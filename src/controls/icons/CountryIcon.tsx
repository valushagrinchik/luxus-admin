import { CountryCode } from "../../lib/types";

export const CountryIcon = ({
  countryCode,
  ...props
}: { countryCode: CountryCode } & any) => {
  const style = { borderRadius: "50px", overflow: "hidden" };
  if (countryCode === "co") {
    return (
      <svg
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        {...props}
      >
        <rect x="-4" width="28" height="20" rx="2" fill="white" />
        <mask
          id="mask0_394_82604"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="-4"
          y="0"
          width="28"
          height="20"
        >
          <rect x="-4" width="28" height="20" rx="2" fill="white" />
        </mask>
        <g mask="url(#mask0_394_82604)">
          <g filter="url(#filter0_d_394_82604)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-4 14.6666H24V9.33325H-4V14.6666Z"
              fill="#0748AE"
            />
          </g>
          <g filter="url(#filter1_d_394_82604)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-4 20.0001H24V14.6667H-4V20.0001Z"
              fill="#DE2035"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-4 9.33333H24V0H-4V9.33333Z"
            fill="#FFD935"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_394_82604"
            x="-4"
            y="9.33325"
            width="28"
            height="5.33325"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_394_82604"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_394_82604"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_d_394_82604"
            x="-4"
            y="14.6667"
            width="28"
            height="5.33325"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_394_82604"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_394_82604"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }
  if (countryCode === "ec") {
    return (
      <svg
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        {...props}
      >
        <rect x="-4" width="28" height="20" rx="2" fill="white" />
        <mask
          id="mask0_394_81924"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="-4"
          y="0"
          width="28"
          height="20"
        >
          <rect x="-4" width="28" height="20" rx="2" fill="white" />
        </mask>
        <g mask="url(#mask0_394_81924)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-4 14.6666H24V9.33325H-4V14.6666Z"
            fill="#0748AE"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-4 20.0001H24V14.6667H-4V20.0001Z"
            fill="#DE2035"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-4 9.33333H24V0H-4V9.33333Z"
            fill="#FFD935"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.39962 8C7.75195 8.48651 7.33301 9.26108 7.33301 10.1335C7.33301 11.6062 8.52692 12.8002 9.99967 12.8002C11.4724 12.8002 12.6663 11.6062 12.6663 10.1335C12.6663 9.26108 12.2474 8.48651 11.5997 8L10.6663 10.8002H9.33301L8.39962 8Z"
            fill="#FFD935"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99967 7.33325L10.6663 10.6666H9.33301L9.99967 7.33325Z"
            fill="#5FC0DC"
          />
          <path
            opacity="0.66"
            d="M13.3337 5.99992L11.3337 5.33325L10.0003 6.66659L8.66699 5.33325L6.66699 5.99992"
            stroke="#3F2821"
            strokeWidth="0.666667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  }

  return <></>;
};
