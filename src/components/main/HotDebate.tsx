/** @jsxImportSource @emotion/react */
import Profile from "../profile/Profile";
import { HotDebate } from "../../interfaces/debate";
import { SerializedStyles, css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import VoteItemList from "../debate/vote/VoteItemList";
import RedButton from "../button/plusbutton/RedButton";
import { useNavigate } from "react-router";
interface HotDebateProps {
  hotDebate: HotDebate;
  addCSS?: SerializedStyles;
}

const HotDebateComponent = ({ hotDebate, addCSS }: HotDebateProps) => {
  const navigate = useNavigate();
  return (
    <div css={[containerCSS, addCSS]} key={hotDebate.id}>
      <div css={leftCSS} onClick={() => navigate(`/debate/${hotDebate.id}`)}>
        <div css={dateTop}>
          <div css={profileCSS}>
            <Profile
              image={hotDebate.memberSimpleInfo.profileImgUrl}
              name={hotDebate.memberSimpleInfo.nickName}
              mbti={hotDebate.memberSimpleInfo.mbti}
              badge={hotDebate.memberSimpleInfo.badge}
            />
          </div>
          <div css={[textCSS, marginRightCSS]}>{hotDebate.createdAt}</div>
        </div>
        <div css={titleCSS}>{hotDebate.title}</div>
        <div css={contentCSS}>
          {hotDebate.content.length > 30
            ? `${hotDebate.content.slice(0, 30)}...`
            : hotDebate.content}
        </div>
        <VoteItemList options={hotDebate.options} debateId={hotDebate.id} />
        <div css={detailCSS}>
          <RedButton
            count={`${hotDebate.participantCount}명이 참여중`}
          ></RedButton>
          <div css={[textCSS]}>댓글 {hotDebate.commentCount}</div>
        </div>
      </div>
      <div css={bottomLineCSS}>&nbsp;</div>
    </div>
  );
};

export default HotDebateComponent;

const containerCSS = css`
  background: ${COLOR.MAIN3};
  width: calc(50% - 0.5rem);
  margin-bottom: 4rem;
  border-radius: 1.2rem;
  padding: 1.5rem;
  position: relative;

  cursor: pointer;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 1.4rem;
`;

const profileCSS = css`
  margin-bottom: 0.6rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  margin-bottom: 0.3rem;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  margin-bottom: 0.8rem;
`;

const detailCSS = css`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const textCSS = css`
  font-size: ${FONT.SIZE.CAPTION};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;

const marginRightCSS = css`
  margin-left: 0.7rem;
  margin-bottom: 2.5rem;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

const dateTop = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const bottomLineCSS = css`
  content: "";
  display: block;
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  width: 100%;
  height: 1px;
  background: ${COLOR.GRAY4};
`;
