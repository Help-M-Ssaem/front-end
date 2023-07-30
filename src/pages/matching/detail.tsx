/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Profile from "../../components/profile/Profile";
import CommentComponent from "../../components/board/comment/Comment";
import Input from "../../components/input/Input";

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

const matching = {
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

const DetailMatchingPage = () => {
  const navigate = useNavigate();

  const handleMatchingDelete = () => {
    // TODO: 게시글 삭제 API 연동
    navigate(-1);
  };

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
        {/* TODO: 본인 게시글에만 수정, 삭제 버튼 */}
        <Button
          onClick={() => navigate("/matching/update")}
          style={{ marginRight: "0.5rem", background: COLOR.MAIN }}
        >
          수정
        </Button>
        <Button onClick={handleMatchingDelete}>삭제</Button>
      </div>
      <div css={detailCSS}>
        <div css={detailHeaderCSS}>
          <Profile
            image={matching.profile}
            name={matching.name}
            mbti={matching.mbti}
            badge={matching.badge}
          />
          <div css={dateCSS}>{matching.createdAt}</div>
        </div>
        <div css={titleCSS}>{matching.title}</div>
        <div css={contentCSS}>{matching.content}</div>

        <div css={startButtonBoxCSS} onClick={() => navigate("/chatting")}>
          <Button>채팅 시작</Button>
        </div>

        <div css={commentTextCSS}>
          전체 댓글 {commentList ? commentList.length : 0}개
        </div>
      </div>

      {/* <div>
        {commentList &&
          commentList.map((comment) => <CommentComponent comment={comment} />)}
      </div> */}

      <div css={commentTextCSS}>댓글 쓰기</div>
      <hr css={hrCSS} />
      <form css={submitButtonBoxCSS} onSubmit={handleCommentSubmit}>
        <Input onSubmit={handleCommentSubmit} />
        <Button style={{ marginLeft: "0.5rem", width: "5rem" }}>등록</Button>
      </form>
    </Container>
  );
};

export default DetailMatchingPage;

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

const startButtonBoxCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  border-top: 1px solid ${COLOR.MAIN};
  padding-top: 2rem;
`;
