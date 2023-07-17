/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

interface InputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Input = ({ onSubmit }: InputProps) => {
  return <input type="text" css={inputCSS} />;
};

const inputCSS = css`
  width: 100%;
  height: 2rem;
  border: 1px solid ${COLOR.MAIN};
  border-radius: 2rem;
  padding: 1.2rem 1rem;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
`;

export default Input;
