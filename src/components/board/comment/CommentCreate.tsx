/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import { ReplyIcon } from "../../../assets/CommentIcons";
import { useState } from "react";
import { useBoardCommentCreate } from "../../../hooks/board/comment/useBoardCommentCreate";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  replyCommentIdState,
  replyCommentOpenState,
} from "../../../states/board";

interface CommentCreateProps {
  addCSS?: SerializedStyles;
  reply?: boolean;
}

const CommentCreate = ({ addCSS, reply }: CommentCreateProps) => {
  const { id } = useParams();
  const boardId = Number(id);

  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyCommentId, setReplyCommentId] =
    useRecoilState(replyCommentIdState);
  const [replyCommentOpen, setReplyCommentOpen] = useRecoilState(
    replyCommentOpenState,
  );

  const formData = new FormData();
  formData.append(
    "postBoardCommentReq",
    new Blob([JSON.stringify(content)], { type: "application/json" }),
  );

  const replyFormData = new FormData();
  replyFormData.append(
    "postBoardCommentReq",
    new Blob([JSON.stringify(replyContent)], { type: "application/json" }),
  );

  const createMutation = useBoardCommentCreate(boardId, formData);
  const createReplyMutation = useBoardCommentCreate(
    boardId,
    replyFormData,
    replyCommentId,
  );

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate();
    setContent("");
    setReplyCommentOpen(false);
  };
  const handleReplyCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        />
        <Button addCSS={buttonCSS}>등록</Button>
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
  margin-left: 0.5rem;
  width: 5rem;
`;
