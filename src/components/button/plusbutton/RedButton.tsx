/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../../styles/color";
import FONT from "../../../styles/font";

interface ButtonProps{
  count: string;
};

const RedButton =({ count }: ButtonProps) =>{
  return (
    <>
    <div css={PlusButtonCSS}>
        <div css={ButtonCSS} />
        <div css= {textCSS}>{count}</div>
    </div>
    </>
  );
};

const ButtonCSS = css`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #FF5C5C;
  // margin-top: 0.1rem;
`;
const textCSS = css`
    padding-left: 0.2rem;
    font-size: ${FONT.SIZE.FOOTNOTE};
    font-weight: ${FONT.WEIGHT.REGULAR};
    color: ${COLOR.GRAY2};
`;
const PlusButtonCSS = css`
  display: flex;
`;

export default RedButton;