/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { ChatMessage } from "../../interfaces/chatting";

interface MessageItemProps {
  message: ChatMessage;
  profile: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, profile }) => {
  return (
    <div>
      {message.sendWho === 1 ? (
        <div css={chatboxCSS}>
          <div css={timeCSS}>{message.createdAt}</div>
          <div css={currentUserMessageCSS}>{message.message}</div>
        </div>
      ) : (
        <div css={sendCSS}>
          <img src={profile} alt="Profile" css={proflieimgCSS} />
          <div css={otherUserMessageCSS}>{message.message}</div>
          <div css={timeCSS}>{message.createdAt}</div>
        </div>
      )}
    </div>
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
  padding: 0.625rem;
  border-radius: 2rem;
  line-height: 1.5rem;
  color: ${COLOR.GRAY2};
`;

const currentUserMessageCSS = css`
  ${messageBoxCSS};
  // align-self: flex-end;
  justify-content: end;
  background-color: ${COLOR.WHITE};
  margin: 0.25rem 1.3rem 0.625rem 0.25rem;
  border: 1px solid ${COLOR.MAIN};
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
