/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

type ButtonProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: string;
};

const Button = ({ children, style, onClick, }: ButtonProps) => {
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
  `;

  return (
    <button css={buttonCSS} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
