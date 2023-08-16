/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { WorryBoard } from "../../interfaces/worry";
import Badge from "../badge/Badge";
import { RightArrowIcon } from "../../assets/CommonIcons";

interface MatchingProps {
  matching: WorryBoard;
  solve: string;
  onClick: (id: number) => void;
}

const MAX_CONTENT_LENGTH = 60;

const MatchingComponent = ({ matching, solve, onClick }: MatchingProps) => {
  const truncatedContent =
  matching.content.length > MAX_CONTENT_LENGTH
    ? matching.content.substring(0, MAX_CONTENT_LENGTH) + "..."
    : matching.content;

  return (
    <div css={MatchingBoxCSS} onClick={() => onClick(matching.id)}>
      <div css={leftCSS}>
        <div css={mbtiBoxCSS}>
        {solve==="solved"&&<Badge mbti={"해결 완료"} color={COLOR.GRAY2} />}
          <Badge mbti={matching.memberMbti} color={COLOR.MAIN4} />
          <RightArrowIcon />
          <Badge mbti={matching.targetMbti} color={COLOR.YELLOW} />
          <div css={createAtCSS}>{matching.createdDate}</div>
        </div>
        <div css={titleCSS}>{matching.title}</div>
        <div css={contentCSS}
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
          />
      </div>
      <div css={rightCSS}>
        {matching.imgUrl &&<img css={thumbnailCSS} src={matching.imgUrl} alt="thumbnail" />}
      </div>
    </div>
  );
};

const MatchingBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${COLOR.MAIN};
  cursor: pointer;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css``;

const thumbnailCSS = css`
  width: 7rem;
  height: 7rem;
  object-fit: cover
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
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
  margin-bottom: 0.8rem;
`;

const createAtCSS = css`
display: flex;
font-size: 0.9rem;
color: ${COLOR.GRAY2};
padding-left: 0.5rem;
font-size: ${FONT.SIZE.FOOTNOTE};
font-weight: ${FONT.WEIGHT.REGULAR};
`;

export default MatchingComponent;
