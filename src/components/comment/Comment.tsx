/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Comment } from "../../interfaces/comment";
import Profile from "../profile/Profile";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { BestIcon, HeartIcon } from "../../assets/CommonIcons";

interface CommentProps {
  comment: Comment;
}

const CommentComponent = ({ comment }: CommentProps) => {
  return (
    <div css={commentBoxCSS}>
      <div css={profileBoxCSS}>
        <div css={profileBestCSS}>
          {comment.isBest && <BestIcon />}
          <Profile
            image={comment.profile}
            name={comment.name}
            mbti={comment.mbti}
            badge={comment.badge}
          />
        </div>
        <div css={likeCountCSS}>
          <HeartIcon />
          <div>{comment.like}</div>
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
`;
