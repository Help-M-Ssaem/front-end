/** @jsxImportSource @emotion/react */
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import { RightArrowIcon } from "../../assets/CommonIcons";
import { SerializedStyles, css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { MainMatching } from "../../interfaces/matching";

interface MatchingProps {
  hotWorry: MainMatching;
  addCSS?: SerializedStyles;
}

const MAX_CONTENT_LENGTH = 60;

const HotWorryComponent = ({ hotWorry, addCSS }: MatchingProps) => {
  const navigate = useNavigate();
  const truncatedContent =
    hotWorry.content.length > MAX_CONTENT_LENGTH
      ? hotWorry.content.substring(0, MAX_CONTENT_LENGTH) + "..."
      : hotWorry.content;

  return (
    <div css={MatchingBoxCSS} onClick={() => navigate(`/match/${hotWorry.id}`)}>
      <div css={leftCSS}>
        <div css={mbtiBoxCSS}>
          <Badge mbti={hotWorry.memberMbti} />
          <RightArrowIcon />
          <Badge mbti={hotWorry.targetMbti} />
        </div>
        <div css={titleCSS}>{hotWorry.title}</div>
        <div
          css={contentCSS}
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
      </div>
      <div css={rightCSS}>
        <div css={createAtCSS}>{hotWorry.createdDate}</div>
        {hotWorry.imgUrl && hotWorry.imgUrl !== "default" && (
          <img css={imgCSS} src={hotWorry.imgUrl} alt="thumbnail" />
        )}
      </div>
    </div>
  );
};

const MatchingBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const imgCSS = css`
  width: 6rem;
  height: 6rem;
  margin: 0.5rem 0 0.5rem 0.8rem;
  object-fit: cover;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  margin-bottom: 0.3rem;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  line-height: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const mbtiBoxCSS = css`
  display: flex;
  align-items: center;
  padding-bottom: 0.8rem;
`;

const createAtCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  white-space: nowrap;
`;

export default HotWorryComponent;
