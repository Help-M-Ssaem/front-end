/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import FONT from "../../styles/font";

interface TextProps {
  children: React.ReactNode;
  addCSS?: SerializedStyles;
}

const Text = ({ children, addCSS }: TextProps) => {
  return <div css={[textCSS, addCSS]}>{children}</div>;
};

export default Text;

const textCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
`;
