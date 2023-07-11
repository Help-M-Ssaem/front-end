/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Board } from "../../interfaces/board";
import COLOR from "../../styles/color";
import Badge from "../badge/badge";

interface BoardProps {
  board: Board;
}

const BoardComponent = ({ board }: BoardProps) => {
  return (
    <div css={boardBoxCSS}>
      <div css={leftCSS}>
        <div css={profileBoxCSS}>
          <img
            css={[profileImgCSS, leftCSS]}
            src={board.profile}
            alt="profile"
          />
          <div css={[profileCSS, rightCSS]}>
            <div css={nameCSS}>{board.name} 님</div>
            <div css={profileDetailCSS}>
              <Badge mbti={board.mbti} color={"#F8CAFF"} />
              <Badge mbti={board.badge} color={"#5BE1A9"} />
            </div>
          </div>
        </div>
        <div css={titleCSS}>{board.title}</div>
        <div css={contentCSS}>{board.content}</div>
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
  padding: 1.5rem 0;
  border-top: 1px solid ${COLOR.MAIN};
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css``;

const nameCSS = css`
  font-weight: bold;
  margin-bottom: 0.4rem;
`;

const titleCSS = css`
  font-weight: bold;
  margin-bottom: 0.4rem;
`;

const contentCSS = css`
  margin-bottom: 1rem;
`;

const marginRightCSS = css`
  margin-right: 1rem;
`;

const profileBoxCSS = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const profileImgCSS = css`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const profileCSS = css`
  display: flex;
  flex-direction: column;
`;

const profileDetailCSS = css`
  display: flex;
`;

const thumbnailCSS = css`
  width: 10rem;
  height: 10rem;
`;

const detailCSS = css`
  display: flex;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
`;

export default BoardComponent;
