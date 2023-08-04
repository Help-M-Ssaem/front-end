/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import Input from "../../components/input/Input";
import Profile from "../../components/profile/Profile";
import CommentComponent from "../../components/board/comment/Comment";
import { LikeClickedIcon, LikeIcon } from "../../assets/ButtonIcons";
import { useDeleteBoard } from "../../hooks/board/useDeleteBoard";
import { useBoardDetail } from "../../hooks/board/useBoardDetail";
import { useParams } from "react-router-dom";
import { useBoardLike } from "../../hooks/board/useBoardLike";
import { useBoardComment } from "../../hooks/board/comment/useBoardComment";
import { useBoardBestComment } from "../../hooks/board/comment/useBoardBestComment";
import { useState } from "react";
import { useBoardCommentCreate } from "../../hooks/board/comment/useBoardCommentCreate";
import CommentCreate from "../../components/board/comment/CommentCreate";

const DetailBoardPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const boardId = Number(id);
  const { board } = useBoardDetail(boardId);
  // TODO: 페이지네이션 구현되면 page, size 수정
  const { comments } = useBoardComment(boardId, 0, 10);
  const { bestComments } = useBoardBestComment(boardId);
  const [content, setContent] = useState("");

  const [replyContent, setReplyContent] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(0);
  const [replyCommentOpen, setReplyCommentOpen] = useState(false);

  const deleteMutation = useDeleteBoard(boardId);
  const likeMutation = useBoardLike(boardId);

  const handleBoardDelete = () => {
    deleteMutation.mutate();
    navigate(-1);
  };
  const handleLikeClick = () => {
    likeMutation.mutate();
  };

  const formData = new FormData();
  formData.append(
    "postBoardCommentReq",
    new Blob([JSON.stringify(content)], { type: "application/json" }),
  );
  const createMutation = useBoardCommentCreate(boardId, formData);
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate();
    setContent("");
    setReplyContent("");
    setReplyCommentOpen(false);
  };
  const handleCommentClick = (commentId: number) => {
    setReplyCommentOpen(!replyCommentOpen);
    setReplyCommentId(commentId);
  };

  return (
    <Container
      style={{
        marginTop: "1rem",
      }}
    >
      {board && (
        <>
          <div css={buttonBoxCSS}>
            {board.isAllowed && (
              <>
                <Button
                  onClick={() => navigate("update")}
                  style={{ marginRight: "0.5rem", background: COLOR.MAIN }}
                >
                  수정
                </Button>
                <Button onClick={handleBoardDelete}>삭제</Button>
              </>
            )}
          </div>
          <div css={detailCSS}>
            <div css={detailHeaderCSS}>
              <Profile
                image={board.memberSimpleInfo.profileImgUrl}
                name={board.memberSimpleInfo.nickName}
                mbti={board.memberSimpleInfo.mbti}
                badge={board.memberSimpleInfo.badge}
              />
              <div css={dateCSS}>{board.createdAt}</div>
            </div>
            <div css={titleCSS}>{board.title}</div>
            <div
              css={contentCSS}
              dangerouslySetInnerHTML={{ __html: board.content }}
            />
            <div css={likeButtonBoxCSS}>
              <div css={likeCountCSS}>{board.likeCount}</div>
              {board.isLiked ? (
                <LikeClickedIcon onClick={handleLikeClick} />
              ) : (
                <LikeIcon onClick={handleLikeClick} />
              )}
            </div>

            <div css={commentTextCSS}>
              전체 댓글 {comments ? comments.result.length : 0}개
            </div>
          </div>
          <div>
            {bestComments &&
              bestComments.map((comment) => (
                <>
                  <CommentComponent comment={comment} best={true} />
                </>
              ))}
            {comments &&
              comments.result.map((comment) => (
                <div key={comment.commentId}>
                  <CommentComponent
                    comment={comment}
                    onClick={() => handleCommentClick(comment.commentId)}
                  />
                  {replyCommentOpen && replyCommentId === comment.commentId && (
                    <CommentCreate
                      onSubmit={handleCommentSubmit}
                      content={replyContent}
                      setContent={setReplyContent}
                      addCSS={replyComment}
                      reply={true}
                    />
                  )}
                </div>
              ))}
          </div>
          <div css={commentTextCSS}>댓글 쓰기</div>
          <hr css={hrCSS} />
          <CommentCreate
            onSubmit={handleCommentSubmit}
            content={content}
            setContent={setContent}
          />
        </>
      )}
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

const replyComment = css`
  margin-top: 1rem;
`;
