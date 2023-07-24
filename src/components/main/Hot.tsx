/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Container from "../container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { HotIcon } from "../../assets/MainIcons";

interface hotProps {
  title?: string;
  content?: string;
}

const Hot = ({ title, content }: hotProps) => {
  return (
    <Container
      background={COLOR.WHITE}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginRight: "1.5rem",
        position: "relative",
      }}
    >
      {content && (
        <div css={hotCSS}>
          <HotIcon />
        </div>
      )}
      <div>
        <div css={categoryCSS}>{content}</div>
        <div css={titleCSS}>{title}</div>
      </div>
      <div css={textCSS}>바로가기</div>
    </Container>
  );
};

export default Hot;

const hotCSS = css`
  position: absolute;
  top: -1.1rem;
  left: 1rem;
`;

const categoryCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin: 0.5rem 0;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 1rem;
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
