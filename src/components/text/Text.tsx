/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import FONT from "../../styles/font";

interface TextProps {
  children: React.ReactNode;
  addCSS?: SerializedStyles;
  onClick?: () => void;
}

const Text = ({ children, addCSS, onClick }: TextProps) => {
  return (
    <div onClick={onClick} css={[textCSS, addCSS]}>
      {children}
    </div>
  );
};

export default Text;

const textCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
`;
