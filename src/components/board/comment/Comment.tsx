/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Comment } from "../../../interfaces/comment";
import Profile from "../../profile/Profile";
import FONT from "../../../styles/font";
import COLOR from "../../../styles/color";
import { BestIcon, HeartIcon } from "../../../assets/CommonIcons";
import { useBoardCommentLike } from "../../../hooks/board/comment/useBoardCommentLike";
import { useParams } from "react-router";

interface CommentProps {
  comment: any; // TODO: Comment 타입 오류 처리
  best?: boolean;
}

const CommentComponent = ({ comment, best }: CommentProps) => {
  const { id } = useParams();

  const likeMutation = useBoardCommentLike(Number(id), comment.commentId);
  const handleLikeClick = () => {
    likeMutation.mutate();
  };

  return (
    <div css={commentBoxCSS} key={comment.commentId}>
      <div css={profileBoxCSS}>
        <div css={profileBestCSS}>
          {best && <BestIcon />}
          <Profile
            image={comment.memberSimpleInfo.profileImgUrl}
            name={comment.memberSimpleInfo.nickName}
            mbti={comment.memberSimpleInfo.mbti}
            badge={comment.memberSimpleInfo.badge}
          />
        </div>
        {/* TODO: 본인 댓글에만 좋아요 대신 삭제 버튼 */}
        <div css={likeCountCSS} onClick={handleLikeClick}>
          <HeartIcon />
          <div>{comment.likeCount}</div>
        </div>
      </div>
      <div css={contentCSS}>{comment.content}</div>
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
`;

const likeCountCSS = css`
  display: flex;
  align-items: center;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  color: ${COLOR.GRAY2};
  cursor: pointer;
`;
