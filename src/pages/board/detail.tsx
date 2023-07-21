/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import Input from "../../components/input/Input";
import Profile from "../../components/profile/Profile";
import CommentComponent from "../../components/comment/Comment";
import { LikeIcon } from "../../assets/ButtonIcons";

// TODO: 댓글 API 연동
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

const board = {
  id: 1,
  profile: "https://i.ibb.co/DgVwMvJ/2023-07-03-132904.png",
  name: "김유리",
  mbti: "ENFP",
  badge: "ENFJ",
  title: "취미가 생겼어요!",
  content: "hello",
  createdAt: "2021.09.01",
  like: 3,
  isBest: true,
};

const DetailBoardPage = () => {
  const navigate = useNavigate();
  const handleBoardDelete = () => {};

  const handleLikeClick = () => {
    alert("공감이 완료되었습니다.");
    // TODO: 공감 API 연동
  };

  const handleCommentSubmit = () => {
    alert("댓글이 등록되었습니다.");
    // TODO: 댓글 등록 API 연동
  };

  return (
    <Container
      style={{
        marginTop: "1rem",
      }}
    >
      <div css={buttonBoxCSS}>
        {/* TODO: 로그인 구현되면 수정 */}
        <Button
          onClick={() => navigate("/board/update")}
          style={{ marginRight: "0.5rem", background: COLOR.MAIN }}
        >
          수정
        </Button>
        <Button onClick={handleBoardDelete}>삭제</Button>
      </div>
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

        <div css={likeButtonBoxCSS}>
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

      <div css={commentTextCSS}>댓글 쓰기</div>
      <hr css={hrCSS} />
      <form css={submitButtonBoxCSS} onSubmit={handleCommentSubmit}>
        <Input onSubmit={handleCommentSubmit} />
        <Button style={{ marginLeft: "0.5rem", width: "5rem" }}>등록</Button>
      </form>
    </Container>
  );
};

export default DetailBoardPage;

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
  margin-top: 3rem;
`;

const hrCSS = css`
  border: 1px solid ${COLOR.MAIN};
  margin: 1rem 0;
`;

const submitButtonBoxCSS = css`
  display: flex;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const likeButtonBoxCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;