/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}

const Input2 = ({ onChange, placeholder, value }: InputProps) => {
  return (
    <input
      css={input2CSS}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

const input2CSS = css`
  display: block;
  box-sizing: border-box;
  width: 100%;

  border-radius: 0.5rem;
  border: 0.1rem solid ${COLOR.GRAY4};
  padding: 0.7rem 1rem;
  font-size: ${FONT.SIZE.TITLE3};
  margin-top: 1rem;
  text-align: left;
`;

export default Input2;
