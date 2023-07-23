import Profile from "../profile/Profile";
import { HotBoard } from "../../interfaces/board";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";

interface HotBoardProps {
  hotBoard: HotBoard;
}

const HotBoardComponent = ({ hotBoard }: HotBoardProps) => {
  return (
    <div css={containerCSS} key={hotBoard.id}>
      <div css={leftCSS}>
        <div css={profileCSS}>
          <Profile
            image={hotBoard.memberSimpleInfo.profileImgUrl}
            name={hotBoard.memberSimpleInfo.nickName}
            mbti={hotBoard.memberSimpleInfo.mbtiEnum}
            badge={hotBoard.memberSimpleInfo.badge}
          />
        </div>
        <div css={titleCSS}>{hotBoard.title}</div>
        <div css={contentCSS}>
          {hotBoard.content.length > 30
            ? `${hotBoard.content.slice(0, 30)}...`
            : hotBoard.content}
        </div>
        <div css={textCSS}>{hotBoard.boardMbti}</div>
      </div>
      <div css={rightCSS}>
        <div css={textCSS}>{hotBoard.createdAt}</div>
        <img css={imgCSS} src={hotBoard.imgUrl} alt="thumbnail" />
        <div css={detailCSS}>
          <div css={[textCSS, marginRightCSS]}>공감 {hotBoard.likeCount}</div>
          <div css={textCSS}>댓글 {hotBoard.commentCount}</div>
        </div>
      </div>
    </div>
  );
};

export default HotBoardComponent;

const containerCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${COLOR.MAIN3};
  width: calc(50% - 0.5rem);
  margin-bottom: 1rem;
  border-radius: 1.2rem;
  padding: 1.5rem;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const profileCSS = css`
  margin-bottom: 0.6rem;
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
  margin-bottom: 0.8rem;
`;

const detailCSS = css`
  display: flex;
`;

const textCSS = css`
  font-size: ${FONT.SIZE.CAPTION};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;

const imgCSS = css`
  width: 6rem;
  height: 6rem;
  margin: 0.5rem 0 0.5rem 0.8rem;
`;

const marginRightCSS = css`
  margin-right: 0.7rem;
`;
