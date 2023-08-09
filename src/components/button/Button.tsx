/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

type ButtonProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: string;
  disabled?: boolean;
};

const Button = ({ children, style, onClick, disabled }: ButtonProps) => {
  const [status, setStatus] = useState(false);
  const buttonCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${COLOR.WHITE};
    background: ${COLOR.MAIN2};
    font-size: ${FONT.SIZE.BODY};
    font-weight: ${FONT.WEIGHT.BOLD};

    padding: 0.5rem 1.7rem;
    border-radius: 2rem;
    cursor: ${status ? "not-allowed" : "pointer"};
  `;

  const handleClick = () => {
    if (!status && onClick) {
      setStatus(true);
      onClick();
    }
  };
  return (
    <button
      css={buttonCSS}
      onClick={handleClick}
      style={style}
      disabled={status}
    >
      {children}
    </button>
  );
};

export default Button;
