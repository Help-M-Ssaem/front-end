/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Debate } from "../../interfaces/debate";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Profile from "../profile/Profile";
import Button from "../button/Button";
import RedButton from "../button/plusbutton/RedButton";
import VoteItemList from "./vote/VoteItemList";
import { useState } from "react";
import { useNavigate } from "react-router";
interface DebateProps {
  debate: Debate;
  onClick: (id: number) => void;
  index: number;
}

const DebateComponent = ({ debate, onClick, index }: DebateProps) => {
  const navigate = useNavigate();
  return (
    <div css={debateBoxCSS}>
      <div css={buttonBoxCSS}>
        {index % 6 === 0 && (
          <Button onClick={() => navigate("/debate/create")}>글 쓰기</Button>
        )}
      </div>
      <div css={leftCSS}>
        <div css={dateTop}>
          <div css={profileBoxCSS}>
            <Profile
              image={debate.memberSimpleInfo.profileImgUrl}
              name={debate.memberSimpleInfo.nickName}
              mbti={debate.memberSimpleInfo.mbti}
              badge={debate.memberSimpleInfo.badge}
            />
          </div>
          <div css={marginRightCSS}>{debate.createdAt}</div>
        </div>
        <div onClick={() => onClick(debate.id)}>
          <div css={titleCSS}>{debate.title}</div>
          <div css={contentCSS}>{debate.content}</div>
        </div>
        <VoteItemList options={debate.options} debateId={debate.id} />

        <div css={detailCSS}>
          <RedButton
            count={`${debate.participantCount}명이 참여중`}
          ></RedButton>
          <div css={{ cursor: "pointer" }}>댓글 {debate.commentCount}</div>
        </div>
      </div>
      <div css={bottomLineCSS}>&nbsp;</div>
    </div>
  );
};
const debateBoxCSS = css`
  padding: 1.5rem;
  margin: 0 0 4rem 0;
  background: ${COLOR.MAIN3};
  border-radius: 1.4rem;
  position: relative;
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

const leftCSS = css`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  flex-grow: 1;
=======
  flex-grow: 1; 
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
  padding-top: 1.4rem;
`;

const dateTop = css`
<<<<<<< HEAD
  display: flex;
  justify-content: space-between;
  align-items: center;
=======
    display: flex;
    justify-content: space-between;
    align-items: center;
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
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

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${COLOR.MAIN};
  padding-bottom: 1.4rem;
`;

//=---------------------------------------------

export default DebateComponent;
