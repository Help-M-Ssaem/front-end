/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";

type MessageItemProps = {
  message: string;
  createdAt: string;
  isCurrentUser: boolean;
  profile?: string;
};

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  createdAt,
  isCurrentUser,
  profile,
}) => {
  return (
    <div>
      {isCurrentUser ? (
         <div css={sendCSS}>
              <img
                 src={profile}
                 alt="Profile"
                 css={proflieimgCSS}
               />
               <div css={otherUserMessageCSS}>
               {message}
               </div>
               <div css={timeCSS}>
                 {createdAt}
           </div>
             </div>
           ) : (
             <div css={chatboxCSS}>
               <div css={timeCSS}>
                 {createdAt}
               </div>
               <div css={currentUserMessageCSS}>
                 {message}
               </div>
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
  border: 1px solid ${COLOR.GRAY4};
`;

const otherUserMessageCSS = css`
  ${messageBoxCSS};
  align-items: flex-start;
  background-color: ${COLOR.MAIN4};
  margin: 0.25rem 0.25rem 0.625rem 0.25rem;
`;

const proflieimgCSS= css`
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
  padding-bottom:0.5rem;
`;
