/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Container from "../container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

interface hotProps {
  board: any;
}

const Hot = ({ board }: hotProps) => {
  return (
    <Container
      background={COLOR.WHITE}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: "1.5rem",
      }}
    >
      <div css={categoryCSS}>{board.category}</div>
      <div css={titleCSS}>{board.title}</div>
      <div css={textCSS}>바로가기</div>
    </Container>
  );
};

export default Hot;

const categoryCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: 0.5rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.5rem;
  line-height: 1.4rem;
`;

const textCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  text-decoration: underline;
  text-align: right;
  cursor: pointer;
`;
