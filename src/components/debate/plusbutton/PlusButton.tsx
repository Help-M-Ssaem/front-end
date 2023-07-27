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
  const PlusButtonCSS = css`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #F5D480;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: ${FONT.SIZE.BIGTITLE};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.WHITE};
`;
  
  return (
    <div css={PlusButtonCSS} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default PlusButton;