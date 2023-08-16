/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Comment } from "../../../interfaces/comment";
import Profile from "../../profile/Profile";
import FONT from "../../../styles/font";
import COLOR from "../../../styles/color";
import { BestIcon, HeartIcon } from "../../../assets/CommonIcons";
import { useBoardCommentLike } from "../../../hooks/board/comment/useBoardCommentLike";
import { useParams } from "react-router";
import { useBoardCommentDelete } from "../../../hooks/board/comment/useBoardCommentDelete";
import { ReplyIcon } from "../../../assets/CommentIcons";

interface CommentProps {
  comment: Comment;
  onClick?: () => void;
  best?: boolean;
  reply?: boolean;
}

const CommentComponent = ({ comment, onClick, best, reply }: CommentProps) => {
  const { id } = useParams();
  const boardId = Number(id);

  const likeMutation = useBoardCommentLike(boardId, comment.commentId);
  const handleLikeClick = () => {
    likeMutation.mutate();
  };
  const deleteMutation = useBoardCommentDelete(boardId, comment.commentId);
  const handleCommentDeleteClick = () => {
    deleteMutation.mutate();
  };

  return (
    <div css={commentBoxCSS} key={comment.commentId}>
      <div css={profileBoxCSS}>
        <div css={profileBestCSS}>
          {best && <BestIcon />}
          {reply && <ReplyIcon />}
          <Profile
            image={comment.memberSimpleInfo.profileImgUrl}
            name={comment.memberSimpleInfo.nickName}
            mbti={comment.memberSimpleInfo.mbti}
            badge={comment.memberSimpleInfo.badge}
          />
        </div>
        {comment.isEditAllowed ? (
          <div css={deleteCSS} onClick={handleCommentDeleteClick}>
            삭제
          </div>
        ) : (
          <div css={likeCountCSS} onClick={handleLikeClick}>
            <HeartIcon />
            <div>{comment.likeCount}</div>
          </div>
        )}
      </div>
      <div css={[contentCSS, reply && replyCSS]} onClick={onClick}>
        {comment.content}
      </div>
    </div>
  );
};

export default CommentComponent;

const commentBoxCSS = css`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const profileBestCSS = css`
  display: flex;
  align-items: center;
`;

const profileBoxCSS = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  line-height: 1.4rem;
  cursor: pointer;
`;

const replyCSS = css`
  margin-left: 1.8rem;
`;

const likeCountCSS = css`
  display: flex;
  align-items: center;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  color: ${COLOR.GRAY2};
  cursor: pointer;
`;

const deleteCSS = css`
  cursor: pointer;
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;
