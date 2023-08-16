interface IconProps {
    onClick: () => void;
  }


export const RedButtonIcons = () => {
    return(
    <svg 
        width="10" 
        height="10" 
        viewBox="0 0 7 7" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="3.5" cy="3.5" r="3.5" fill="#FC4444"/>
    </svg>
    )
}

export const XButtonIcons = ({onClick}:IconProps) => {
    return(
    <svg 
        width="10" 
        height="10" 
        viewBox="0 0 5 5" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        cursor="pointer"
        onClick={onClick}
    >
        <path d="M2.07881 2.808L0.598813 0.712H1.39881L2.50281 2.328L3.59881 0.712H4.39081L2.91081 2.808L4.47081 5H3.67081L2.50281 3.288L1.31881 5H0.526813L2.07881 2.808Z" fill="#676464"/>
        </svg>
    )
}

