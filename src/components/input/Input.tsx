/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

const Input = ({ onChange, value, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      css={inputCSS}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
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
