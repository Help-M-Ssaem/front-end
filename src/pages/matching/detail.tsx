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
import { useDeleteBoard } from "../../hooks/worry/useDeleteWorry";
import { useWorryBoard } from"../../hooks/worry/useDetailPost";
import { useParams } from "react-router-dom";

const DetailMatchingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { worryBoard } = useWorryBoard(Number(id));

  const navigate = useNavigate();
  const handleStartChatting = () => {
    if (!worryBoard){
      return;
    }
    navigate(`/chatting/${worryBoard.worryBoardId}`);
  };
  const deleteMutation = useDeleteBoard(Number(id));
  const handleMatchingDelete = () => {
    // TODO: 게시글 삭제 API 연동
    deleteMutation.mutate();
    navigate(-1);
  };
  
  if (!worryBoard) {
    return <div>없따</div>;
  }

  return (
    <Container
      style={{
        marginTop: "1rem",
      }}
    >
      <div css={buttonBoxCSS}>
        {/* TODO: 본인 게시글에만 수정, 삭제 버튼 */}
        <Button
           onClick={() =>  navigate(`/match/${id}/update`)}
          //  navigate("/match/update")}
          style={{ marginRight: "0.5rem", background: COLOR.MAIN }}
        >
          수정
        </Button>
        <Button onClick={handleMatchingDelete}>삭제</Button>
      </div>
      <div css={detailCSS}>
        <div css={detailHeaderCSS}>
          <Profile
            image={worryBoard.memberSimpleInfo.profileImgUrl}
            name={worryBoard.memberSimpleInfo.nickName}
            mbti={worryBoard.memberSimpleInfo.mbti}
            badge={worryBoard.memberSimpleInfo.badge}
          />
          <div css={dateCSS}>{worryBoard.createdAt}</div>
        </div>
        <div css={titleCSS}>{worryBoard.title}</div>
        <div
              css={contentCSS}
              dangerouslySetInnerHTML={{ __html: worryBoard.content }}
            />
        {/* 이미지 찍는걸 어케하지 */}
        <div css={startButtonBoxCSS} onClick={handleStartChatting}>
          <Button>채팅 시작</Button>
        </div>
        </div>
      <div css={commentTextCSS}>댓글 쓰기</div>
      <hr css={hrCSS} />
      <form css={submitButtonBoxCSS} onSubmit={handleCommentSubmit}>
        <Input />
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
