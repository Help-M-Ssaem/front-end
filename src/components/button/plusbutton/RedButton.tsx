/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../../styles/color";
import FONT from "../../../styles/font";

interface ButtonProps {
  count: string;
}

const RedButton = ({ count }: ButtonProps) => {
  return (
    <>
      <div css={PlusButtonCSS}>
        <div css={ButtonCSS} />
        <div css={textCSS}>{count}</div>
      </div>
    </>
  );
};

const ButtonCSS = css`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background-color: #ff5c5c;
`;
const textCSS = css`
  padding-top: 0.1rem;
  padding-left: 0.2rem;
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;
const PlusButtonCSS = css`
  display: flex;
`;

export default RedButton;
