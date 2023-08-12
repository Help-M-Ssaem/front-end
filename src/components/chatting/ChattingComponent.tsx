/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import { ChatRoom } from "../../interfaces/chatting";

interface ChattingComponentProps {
  chatRoom: ChatRoom;
}

const MAX_CONTENT_LENGTH = 15;

const ChattingComponent = ({ chatRoom }: ChattingComponentProps) => {
  const truncatedMessage =
    chatRoom.lastMessage.length > MAX_CONTENT_LENGTH
      ? chatRoom.lastMessage.substring(0, MAX_CONTENT_LENGTH) + "..."
      : chatRoom.lastMessage;

  return (
    <div css={chattingItemCSS}>
      <img
        css={[profileImgCSS, leftCSS]}
        src={chatRoom.memberSimpleInfo.profileImgUrl}
        alt="profile"
      />
      <div css={profileCSS}>
        <div css={rightCSS}>
          <div css={nameCSS}>{chatRoom.memberSimpleInfo.nickName} 님</div>
          {/* <div css={profileDetailCSS}>
            <Badge mbti={chatRoom.memberSimpleInfo.mbti} color={"#F8CAFF"} />
            {chatRoom.memberSimpleInfo.badge && (
              <Badge mbti={chatRoom.memberSimpleInfo.badge} color={"#5BE1A9"} />
            )}
          </div> */}
          <div css={marginRightCSS}>{chatRoom.lastSendAt}</div>
        </div>
        <div css={latestMessageCSS}>{truncatedMessage}</div>
      </div>
    </div>
  );
};

export default ChattingComponent;

const chattingItemCSS = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLOR.GRAY4};
  width: 100%;
  height: 5rem;
  cursor: pointer;
  padding: 0 1rem;
  &:hover {
    background-color: ${COLOR.MAIN4};
    transition: 0.3s;
  }
`;

const leftCSS = css`
  flex-direction: column;
`;

const rightCSS = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-bottom: 0.3rem;
`;

const profileImgCSS = css`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const profileCSS = css`
  flex-direction: column;
  width: 100%;
`;

const profileDetailCSS = css`
  display: flex;
`;

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const marginRightCSS = css`
  margin-left: auto;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
  white-space: nowrap;
`;

const latestMessageCSS = css`
  flex-direction: column;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;
