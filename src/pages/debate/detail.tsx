/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import Input from "../../components/input/Input";
import Profile from "../../components/profile/Profile";
import { useDeleteDebate } from "../../hooks/debate/useDeleteDebate";
import VoteItemList from "../../components/debate/vote/VoteItemList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDebateDetail } from "../../hooks/debate/useDetailDebate";
import CommentComponent from "../../components/board/comment/Comment";
import { useDebateComment } from "../../hooks/debate/comment/useDebateComment";
import { useDebateBestComment } from "../../hooks/debate/comment/useDebateBestComment";
import { useDebateCommentCreate } from "../../hooks/debate/comment/useDebateCommentCreate";
import RedButton from "../../components/button/plusbutton/RedButton";
const DetailDebatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const debateId = Number(id);
  const { debate } = useDebateDetail(debateId);
  const { comments } = useDebateComment(debateId, 0, 10);
  const { bestComments } = useDebateBestComment(debateId);
  const [content, setContent] = useState("");

  const deleteMutation = useDeleteDebate(debateId);
  const handleDebateDelete = () => {
    deleteMutation.mutate();
    navigate(-1);
  };
  const formData = new FormData();
  const data = {
    content: content,
  };
  formData.append(
    "postDiscussionCommentReq",
    new Blob([JSON.stringify(data)], { type: "application/json" }),
  );
  const createMutation = useDebateCommentCreate(debateId, formData);
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate();
    setContent("");
  };
  return (
    <Container css={ContainerCSS}
    >
      {debate && (
        <>
          <div css={buttonBoxCSS}>
            {/* TODO: 본인 게시글에만 수정, 삭제 버튼 */}
            <Button
              onClick={() => navigate("/debate/update")}
              addCSS={updateButtonCSS}
            >
              수정
            </Button>
            <Button onClick={handleDebateDelete}>삭제</Button>
          </div>
          <div css={detailCSS}>
            <div css={detailHeaderCSS}>
              <Profile
                image={
                  debate.discussionSimpleInfo.memberSimpleInfo.profileImgUrl
                }
                name={debate.discussionSimpleInfo.memberSimpleInfo.nickName}
                mbti={debate.discussionSimpleInfo.memberSimpleInfo.mbti}
                badge={debate.discussionSimpleInfo.memberSimpleInfo.badge}
              />
              <div css={dateCSS}>{debate.discussionSimpleInfo.createdAt}</div>
            </div>
            <div css={titleCSS}>{debate.discussionSimpleInfo.title}</div>
            <div css={contentCSS}>{debate.discussionSimpleInfo.content}</div>
            <VoteItemList
              options={debate.discussionSimpleInfo.options}
              debateId={debate.discussionSimpleInfo.id}
            />
            <div css={BottomdetailCSS}>
            <RedButton count = {`${debate.discussionSimpleInfo.participantCount}명이 참여중`}></RedButton>
            </div>
            <div css={commentTextCSS}>
              전체 댓글 {comments ? comments.result.length : 0}개
            </div>
          </div>
          <div>
            {bestComments &&
              bestComments.map((comment) => (
                <CommentComponent comment={comment} best={true} />
              ))}
            {comments &&
              comments.result.map((comment) => (
                <CommentComponent comment={comment} />
              ))}
          </div>
          <div css={commentTextCSS}>댓글 쓰기</div>
          <hr css={hrCSS} />
          <form css={submitButtonBoxCSS} onSubmit={handleCommentSubmit}>
            <Input
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <Button addCSS={buttonCSS}>등록</Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default DetailDebatePage;

const ContainerCSS= css`
  margin-top: 1rem;
`;
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

const buttonCSS = css`
  margin-left: 0.5rem;
  width: 5rem;
`;

const updateButtonCSS = css`
  margin-right: 0.5rem;
  background: ${COLOR.MAIN};
`;

const BottomdetailCSS = css`
margin-top:1rem;
display: flex;
justify-content: space-between;
align-items: center;
`;