/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Board } from "../../interfaces/board";
import Profile from "../profile/Profile";
import CommentComponent from "../comment/Comment";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { LikeIcon } from "../../assets/ButtonIcons";

type BoardDetailProps = {
  board: Board;
};

const BoardDetail = ({ board }: BoardDetailProps) => {
  const handleLikeClick = () => {
    alert("공감이 완료되었습니다.");
  };

  const commentList = [
    {
      id: 1,
      profile: "https://i.ibb.co/DgVwMvJ/2023-07-03-132904.png",
      name: "김유리",
      mbti: "ENFP",
      badge: "ENFJ",
      content: "저도 이런 취미 생겼으면 좋겠어요!",
      date: "2021.09.01",
      like: 3,
      isBest: true,
    },
    {
      id: 2,
      profile: "https://i.ibb.co/DgVwMvJ/2023-07-03-132904.png",
      name: "박지운",
      mbti: "ENFP",
      badge: "ENFJ",
      content: "저도 이런 취미 생겼으면 좋겠어요!",
      date: "2021.09.01",
      like: 4,
      isBest: false,
    },
    {
      id: 3,
      profile: "https://i.ibb.co/DgVwMvJ/2023-07-03-132904.png",
      name: "송민혁",
      mbti: "ENFP",
      badge: "ENFJ",
      content: "저도 이런 취미 생겼으면 좋겠어요!",
      date: "2021.09.01",
      like: 5,
      isBest: false,
    },
  ];

  return (
    <>
      <div css={detailCSS}>
        <div css={detailHeaderCSS}>
          <Profile
            image={board.profile}
            name={board.name}
            mbti={board.mbti}
            badge={board.badge}
          />
          <div css={dateCSS}>{board.createdAt}</div>
        </div>
        <div css={titleCSS}>{board.title}</div>
        <div css={contentCSS}>{board.content}</div>

        <div css={buttonBoxCSS}>
          <div css={likeCountCSS}>{board.like}</div>
          <LikeIcon onClick={handleLikeClick} />
        </div>

        <div css={commentTextCSS}>
          전체 댓글 {commentList ? commentList.length : 0}개
        </div>
      </div>

      <div>
        {commentList &&
          commentList.map((comment) => <CommentComponent comment={comment} />)}
      </div>
    </>
  );
};

export default BoardDetail;

const detailCSS = css`
  padding: 1.2rem 0;
  border-top: 1px solid ${COLOR.MAIN};
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const detailHeaderCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const dateCSS = css`
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.8rem;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  padding-bottom: 3rem;
  line-height: 1.4rem;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const likeCountCSS = css`
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAIN2};
  margin-right: 1rem;
`;

const commentTextCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
`;
