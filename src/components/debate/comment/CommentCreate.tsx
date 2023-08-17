/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import { ReplyIcon } from "../../../assets/CommentIcons";
import { useState } from "react";
import { useDebateCommentCreate } from "../../../hooks/debate/comment/useDebateCommentCreate";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  replyCommentIdState,
  replyCommentOpenState,
} from "../../../states/debate";
import COLOR from "../../../styles/color";
import FONT from "../../../styles/font";

interface CommentCreateProps {
  addCSS?: SerializedStyles;
  reply?: boolean;
}

const CommentCreate = ({ addCSS, reply }: CommentCreateProps) => {
  const { id } = useParams();
  const debateId = Number(id);

  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyCommentId, setReplyCommentId] =
    useRecoilState(replyCommentIdState);
  const [replyCommentOpen, setReplyCommentOpen] = useRecoilState(
    replyCommentOpenState,
  );

  const formData = new FormData();
  formData.append(
    "postDiscussionCommentReq",
    new Blob([JSON.stringify(content)], { type: "application/json" }),
  );

  const replyFormData = new FormData();
  replyFormData.append(
    "postDiscussionCommentReq",
    new Blob([JSON.stringify(replyContent)], { type: "application/json" }),
  );

  const createMutation = useDebateCommentCreate(debateId, formData);
  const createReplyMutation = useDebateCommentCreate(
    debateId,
    replyFormData,
    replyCommentId,
  );

  const handleCommentSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    createMutation.mutate();
    setContent("");
    setReplyCommentOpen(false);
  };

  const handleReplyCommentSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    createReplyMutation.mutate();
    setReplyContent("");
    setReplyCommentOpen(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!reply) {
      setContent(e.target.value);
    } else {
      setReplyContent(e.target.value);
    }
  };

  const handleButtonClick = () => {
    if (reply) {
      handleReplyCommentSubmit();
    } else {
      handleCommentSubmit();
    }
  };

  const token = localStorage.getItem("accessToken");

  return (
    <div css={[commentCreateBoxCSS, addCSS]}>
      {reply && <ReplyIcon />}
      <form
        css={submitButtonBoxCSS}
        onSubmit={reply ? handleReplyCommentSubmit : handleCommentSubmit}
      >
        <Input
          onChange={handleCommentChange}
          value={reply ? replyContent : content}
          placeholder={!token ? "댓글을 작성하려면 로그인 해주세요." : ""}
        />
        <button css={buttonCSS} onSubmit={handleButtonClick}>
          등록
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;

const submitButtonBoxCSS = css`
  display: flex;
  width: 100%;
`;

const commentCreateBoxCSS = css`
  display: flex;
`;

const buttonCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${COLOR.WHITE};
  background: ${COLOR.MAIN2};
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.BOLD};

  padding: 0.5rem 1.7rem;
  border-radius: 2rem;
  cursor: pointer;

  margin-left: 0.5rem;
  width: 5rem;
`;
