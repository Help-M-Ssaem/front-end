/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FONT from "../../styles/font";

interface TextProps {
  children: React.ReactNode;
}

const Text = ({ children }: TextProps) => {
  return <div css={textCSS}>{children}</div>;
};

export default Text;

const textCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin: 1rem 0;
`;
