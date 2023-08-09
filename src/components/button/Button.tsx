/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  addCSS?: SerializedStyles;
}

const Button = ({ children, onClick, addCSS }: ButtonProps) => {
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
    <button css={[buttonCSS, addCSS]} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
