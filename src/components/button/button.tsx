/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  const buttonCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${COLOR.WHITE};
    background: ${COLOR.MAIN2};
    padding: 0.4rem 1.6rem;
    border-radius: 2rem;
  `;

  return (
    <button css={buttonCSS} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
