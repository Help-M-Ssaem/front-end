/** @jsxImportSource @emotion/react */
import Profile from "../profile/Profile";
import { HotDebate } from "../../interfaces/debate";
import { SerializedStyles, css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import VoteItemList from "../debate/vote/VoteItemList";
import RedButton from "../button/plusbutton/RedButton";
import { useNavigate } from "react-router";
import Container from "../container/Container";
interface HotDebateProps {
  hotDebate: HotDebate;
  addCSS?: SerializedStyles;
}

const HotDebateComponent = ({ hotDebate, addCSS }: HotDebateProps) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div
        css={[leftCSS, onclickCSS]}
        onClick={() => navigate(`/debate/${hotDebate.id}`)}
      >
        <div css={dateTop}>
          <div css={profileBoxCSS}>
            <Profile
              id={hotDebate.memberSimpleInfo.id}
              image={hotDebate.memberSimpleInfo.profileImgUrl}
              name={hotDebate.memberSimpleInfo.nickName}
              mbti={hotDebate.memberSimpleInfo.mbti}
              badge={hotDebate.memberSimpleInfo.badge}
            />
          </div>
          <div css={marginRightCSS}>{hotDebate.createdAt}</div>
        </div>
        <div css={titleCSS}>{hotDebate.title}</div>
        <div css={contentCSS}>
          {hotDebate.content.length > 30
            ? `${hotDebate.content.slice(0, 30)}...`
            : hotDebate.content}
        </div>
      </div>
      <VoteItemList options={hotDebate.options} debateId={hotDebate.id} />

      <div css={detailCSS}>
        <RedButton
          count={`${hotDebate.participantCount}명이 참여중`}
        ></RedButton>
        <div>댓글 {hotDebate.commentCount}</div>
      </div>
    </Container>
  );
};
export default HotDebateComponent;

const leftCSS = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const dateTop = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const contentCSS = css`
  margin-bottom: 1rem;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

const marginRightCSS = css`
  margin-bottom: 2.6rem;
  margin-left: auto;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

const profileBoxCSS = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const detailCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  margin-top: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const onclickCSS = css`
  cursor: pointer;
`;
