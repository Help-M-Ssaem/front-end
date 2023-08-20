/** @jsxImportSource @emotion/react */
import Profile from "../profile/Profile";
import { HotBoard } from "../../interfaces/board";
import { SerializedStyles, css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { useNavigate } from "react-router-dom";

interface HotBoardProps {
  hotBoard: HotBoard;
  addCSS?: SerializedStyles;
}

const HotBoardComponent = ({ hotBoard, addCSS }: HotBoardProps) => {
  const navigate = useNavigate();

  return (
    <div
      css={[containerCSS, addCSS]}
      key={hotBoard.id}
      onClick={() => navigate(`/board/${hotBoard.id}`)}
    >
      <div css={leftCSS}>
        <div css={profileCSS}>
          <Profile
            id={hotBoard.memberSimpleInfo.id}
            image={hotBoard.memberSimpleInfo.profileImgUrl}
            name={hotBoard.memberSimpleInfo.nickName}
            mbti={hotBoard.memberSimpleInfo.mbti}
            badge={hotBoard.memberSimpleInfo.badge}
          />
        </div>
        <div css={titleCSS}>{hotBoard.title}</div>
        <div
          css={contentCSS}
          dangerouslySetInnerHTML={{ __html: hotBoard.content }}
        />
        <div css={textCSS}>{hotBoard.boardMbti}</div>
      </div>
      <div css={rightCSS}>
        <div css={textCSS}>{hotBoard.createdAt}</div>
        {hotBoard.imgUrl && (
          <img css={imgCSS} src={hotBoard.imgUrl} alt="thumbnail" />
        )}
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
