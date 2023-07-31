/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Profile from "../profile/Profile";

interface BoardProps {
  board: any;
  onClick: (id: number) => void;
}

const MAX_CONTENT_LENGTH = 60;

const BoardComponent = ({ board, onClick }: BoardProps) => {
  const truncatedContent =
    board.content.length > MAX_CONTENT_LENGTH
      ? board.content.substring(0, MAX_CONTENT_LENGTH) + "..."
      : board.content;

  return (
    <div css={boardBoxCSS} onClick={() => onClick(board.id)}>
      <div css={leftCSS}>
        <div css={profileBoxCSS}>
          <Profile
            image={board.profile}
            name={board.name}
            mbti={board.mbti}
            badge={board.badge}
          />
        </div>
        <div css={titleCSS}>{board.title}</div>
        <div
          css={contentCSS}
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
        <div css={detailCSS}>
          <div css={marginRightCSS}>{board.createdAt}</div>
          <div css={marginRightCSS}>공감 {board.like}</div>
          <div>댓글 {board.comment}</div>
        </div>
      </div>
      <div css={rightCSS}>
        <img css={thumbnailCSS} src={board.thumbnail} alt="thumbnail" />
      </div>
    </div>
  );
};

const boardBoxCSS = css`
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

const profileBoxCSS = css`
  margin-bottom: 0.8rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const contentCSS = css`
  margin-bottom: 1rem;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  line-height: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const marginRightCSS = css`
  margin-right: 1rem;
`;

const thumbnailCSS = css`
  width: 9rem;
  height: 9rem;
`;

const detailCSS = css`
  display: flex;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};

  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

export default BoardComponent;
