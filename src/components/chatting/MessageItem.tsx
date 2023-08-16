/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { ChatMessage } from "../../interfaces/chatting";
import FONT from "../../styles/font";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import Time from "../../utils/Time";

interface MessageItemProps {
  message: ChatMessage;
  profile: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, profile }) => {
  const { user } = useMemberInfo();

  return (
    <>
      {message.type === "ENTER" && <div css={enterCSS}>{message.message}</div>}
      {message.type === "TALK" && message.sender === `${user?.nickName}` && (
        <div css={chatboxCSS}>
          <div css={timeCSS}>
            <Time createdAt={message.createdAt} />
          </div>
          <div css={currentUserMessageCSS}>{message.message}</div>
        </div>
      )}
      {message.type === "TALK" && message.sender !== `${user?.nickName}` && (
        <div css={sendCSS}>
          <img src={profile} alt="Profile" css={proflieimgCSS} />
          <div css={otherUserMessageCSS}>{message.message}</div>
          <div css={timeCSS}>
            <Time createdAt={message.createdAt} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageItem;

const chatboxCSS = css`
  display: flex;
  justify-content: flex-end;
`;

const sendCSS = css`
  display: flex;
`;

const messageBoxCSS = css`
  max-width: 50%;
  flex-wrap: wrap;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  line-height: 1.5rem;
  color: ${COLOR.GRAY2};

  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
`;

const currentUserMessageCSS = css`
  ${messageBoxCSS};
  // align-self: flex-end;
  justify-content: end;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.MAIN};
  margin: 0.25rem 1.3rem 0.625rem 0.25rem;
`;

const otherUserMessageCSS = css`
  ${messageBoxCSS};
  align-items: flex-start;
  background-color: ${COLOR.MAIN4};
  margin: 0.25rem 0.25rem 0.625rem 0.25rem;
`;

const proflieimgCSS = css`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin-left: 0.8rem;
  object-fit: cover;
`;

const timeCSS = css`
  font-size: 0.75rem;
  color: ${COLOR.GRAY3};
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.5rem;
`;

const enterCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};

  background: ${COLOR.GRAY5};
  border-radius: 1rem;

  color: ${COLOR.GRAY2};
  display: flex;
  justify-content: center;

  padding: 0.3rem 0;
  margin-bottom: 0.5rem;
`;
