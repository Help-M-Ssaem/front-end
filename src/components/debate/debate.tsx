/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Debate } from "../../interfaces/debate";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Profile from "../profile/Profile";
import Button from "../button/Button";
import RedButton from "../button/plusbutton/RedButton";
import VoteItemList from "./vote/VoteItemList";
import { useNavigate } from "react-router";
import Text from "../text/Text";
import { useState } from "react";

interface DebateProps {
  debate: Debate;
  mode: string;
  index: number;
}

const DebateComponent = ({ debate, mode, index }: DebateProps) => {
  const navigate = useNavigate();
  const isNotSearchResult = !window.location.href.includes("search");
  const [isNotSearch, setIsNotSearch] = useState(isNotSearchResult);
  const token = localStorage.getItem("accessToken");
  const hadleDetail = () => {
    navigate(`/debate/${debate.id}`);
    window.location.reload();
  }
  const debateBoxCSS = css`
    padding: ${isNotSearch && "0 1.5rem 1.5rem 1.5rem"};
    margin: ${isNotSearch && "0 0 4rem 0"};
    background: ${COLOR.MAIN3};
    border-radius: 1.4rem;
    position: relative;
  `;
  return (
    <div 
      css={[debateBoxCSS]} 
      >
        {index % 6 === 0 && isNotSearch && (
          <div css={buttonBoxCSS}>
          {mode === "discusstion" ? <Text>MBTI 과몰입 토론</Text> : <Text>HOT 토론글</Text>}
          {token && <Button onClick={() => navigate("/debate/create")}>글 쓰기</Button>}
          </div>
        )}
      <div>
      <div css={[leftCSS, onclickCSS]} onClick={hadleDetail}>
        <div css={dateTop}>
          <div css={profileBoxCSS}>
            <Profile
              id={debate.memberSimpleInfo.id}
              image={debate.memberSimpleInfo.profileImgUrl}
              name={debate.memberSimpleInfo.nickName}
              mbti={debate.memberSimpleInfo.mbti}
              badge={debate.memberSimpleInfo.badge}
            />
          </div>
          <div css={marginRightCSS}>{debate.createdAt}</div>
        </div>
          <div css={titleCSS}>{debate.title}</div>
          <div css={contentCSS}>{debate.content}</div>
        </div>
        <VoteItemList options={debate.options} debateId={debate.id} />

        <div css={[detailCSS, onclickCSS]} onClick={hadleDetail}>
          <RedButton
            count={`${debate.participantCount}명이 참여중`}
          ></RedButton>
          <div>댓글 {debate.commentCount}</div>
        </div>
        </div>
      <div css={bottomLineCSS}>&nbsp;</div>
    </div>
  );
};

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
  flex-grow: 1; 
  padding-top: 1.4rem;
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
  line-height: 1.4rem;
`;

const marginRightCSS = css`
  margin-bottom: 2.6rem;
  margin-left: auto;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.BODY};
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
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
  margin-top: 1rem;
  margin-right: 1rem;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top:1.5rem;
  border-bottom: 1px solid ${COLOR.MAIN};
  padding-bottom: 1.4rem;
`;

const onclickCSS = css`
cursor: pointer;
`;

//=---------------------------------------------

export default DebateComponent;