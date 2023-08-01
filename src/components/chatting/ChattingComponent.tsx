/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import { ChattingProps } from "../../interfaces/chatting";


const ChattingComponent = ({ Chattinghistory }: ChattingProps) => {
  
  return (
    <li css={[dateTop]}>
    <div css={profileBoxCSS}>
  <img
    css={[profileImgCSS, leftCSS]}
    src={Chattinghistory.profile}
    alt="profile"
  />
  <div css={[profileCSS]}>
    <div css={ rightCSS }>
    <div css={nameCSS}>{Chattinghistory.name} 님</div>
    <div css={profileDetailCSS}>
      <Badge mbti={Chattinghistory.mbti} color={"#F8CAFF"} />
      <Badge mbti={Chattinghistory.badge} color={"#5BE1A9"} />
    </div>
    <div css={marginRightCSS}>{Chattinghistory.createdAt}</div>
    </div>
    <div css={latestMessageCSS}>
        {Chattinghistory.latestMessage}
        </div>
    </div>
   </div>
   </li>
  );
};

export default ChattingComponent;

const dateTop = css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${COLOR.GRAY4};
    padding: 0.8rem;
`;


const profileBoxCSS = css`
  display: flex;
  align-items: center;
  margin: 0 0.4rem 0 0.8rem;
`;

const leftCSS = css`
  flex-direction: column;
  flex-grow: 1; 
`;

const rightCSS = css`
display: flex;
flex-direction: row;
padding-bottom: 0.5rem;
`;

const profileImgCSS = css`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const profileCSS = css`
  flex-direction: column;
`;

const profileDetailCSS = css`
  display: flex;
  margin-left: 0.8rem;
`;

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  align-items: center;
  justify-content: center;
`;

const marginRightCSS = css`
  margin-left: auto;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

const latestMessageCSS = css`
    flex-direction: column;
    text-overflow: ellipsis;
    overflow: hidden;
`;
