/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import { ReplyIcon } from "../../../assets/CommentIcons";

interface CommentCreateProps {
  content: string;
  setContent: (content: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  addCSS?: SerializedStyles;
  reply?: boolean;
}

const CommentCreate = ({
  content,
  setContent,
  onSubmit,
  addCSS,
  reply,
}: CommentCreateProps) => {
  return (
    <div css={[commentCreateBoxCSS, addCSS]}>
      {reply && <ReplyIcon />}
      <form css={submitButtonBoxCSS} onSubmit={onSubmit}>
        <Input onChange={(e) => setContent(e.target.value)} value={content} />
        <Button style={{ marginLeft: "0.5rem", width: "5rem" }}>등록</Button>
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
