/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { Matching } from "../../interfaces/matching";
import Badge from "../badge/Badge";
import { RightArrowIcon } from "../../assets/CommonIcons";

interface MatchingProps {
  matching: Matching;
  onClick: (id: number) => void;
}

const MatchingComponent = ({ matching, onClick }: MatchingProps) => {
  return (
    <div css={MatchingBoxCSS} onClick={() => onClick(matching.id)}>
      <div css={leftCSS}>
        <div css={mbtiBoxCSS}>
          <Badge mbti={matching.mbti1} color={matching.color1} />
          <RightArrowIcon />
          <Badge mbti={matching.mbti2} color={matching.color2} />
          <div css={createAtCSS}>{matching.createdAt}</div>
        </div>
        <div css={titleCSS}>{matching.title}</div>
        <div css={contentCSS}>{matching.content}</div>
      </div>
      <div css={rightCSS}>
        <img css={thumbnailCSS} src={matching.thumbnail} alt="thumbnail" />
      </div>
    </div>
  );
};

const MatchingBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-top: 1px solid ${COLOR.MAIN};
  cursor: pointer;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css``;

const thumbnailCSS = css`
  width: 5rem;
  height: 5rem;
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
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;

export default MatchingComponent;
