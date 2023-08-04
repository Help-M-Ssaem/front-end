/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../../styles/color";
import FONT from "../../../styles/font";

interface ButtonProps{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const PlusButton =({ children, style, onClick }: ButtonProps) =>{
  return (
    <div css={PlusButtonCSS}>
      <div css={plusCSS}>{children}</div>
    </div>
  );
};

const PlusButtonCSS = css`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #F5D480;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const plusCSS = css`
  font-size: ${FONT.SIZE.BIGTITLE};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.WHITE};
`;

export default PlusButton;