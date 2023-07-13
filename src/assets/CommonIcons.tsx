export const SearchIcon = () => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 22C18.4183 22 22 18.4183 22 14C22 9.58172 18.4183 6 14 6C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22Z"
        stroke="#222222"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27 27L20 20"
        stroke="#222222"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

type StarIconProps = {
  onClick: () => void;
};

export const FilledStarIcon = ({ onClick }: StarIconProps) => {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
        fill="#AD71EA"
      />
    </svg>
  );
};

export const EmptyStarIcon = ({ onClick }: StarIconProps) => {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M8 1.61803L9.32058 5.68237L9.43284 6.02786H9.79611H14.0696L10.6123 8.53976L10.3184 8.75329L10.4306 9.09878L11.7512 13.1631L8.29389 10.6512L8 10.4377L7.70611 10.6512L4.24877 13.1631L5.56936 9.09878L5.68162 8.75329L5.38772 8.53976L1.93039 6.02786H6.20389H6.56716L6.67942 5.68237L8 1.61803Z"
        stroke="#AD71EA"
      />
    </svg>
  );
};
