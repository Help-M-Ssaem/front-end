/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import ChattingComponent from "../../components/chatting/ChattingComponent";
import Profile from "../../components/profile/Profile";
import Hamburger from "../../components/hamburger/Hamburger";
import MessageItem from "../../components/chatting/MessageItem";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { useChatRooms } from "../../hooks/chatting/useChatRooms";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeRoomIdState, messageState } from "../../states/chatting";
import { useEffect, useRef, useState } from "react";
import { ChattingForm } from "../../components/chatting/ChattingForm";
import CurrentChatting from "../../components/chatting/CurrentChatting";
import { CatLogoIcon } from "../../assets/CommonIcons";

const ChattingPage = () => {
  const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdState);
  const [active, setActive] = useState(false);
  const messages = useRecoilValue(messageState);
  const { chatRooms } = useChatRooms();
  const activeRoomMessages = messages[activeRoomId] || [];

  const navigate = useNavigate();
  let profileUrl = "";

  const handleChatRoomClick = (roomId: number) => {
    setActiveRoomId(roomId);
    setActive(true);
  };
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div css={editorContainerCSS}>
      <Container addCSS={containerCSS}>
        <div css={alignmentCSS}>
          <div css={boderRightCSS}>
            <div css={titleCSS}>채팅목록</div>
          </div>
          <div css={ChatProfileCSS}>
            {chatRooms && active && (
              <>
                <div>
                  {Array.isArray(chatRooms) &&
                    chatRooms.map((chatRoom) => {
                      if (chatRoom.chatRoomId === activeRoomId) {
                        profileUrl = chatRoom.memberSimpleInfo.profileImgUrl;
                        return (
                          <Profile
                            id={chatRoom.memberSimpleInfo.id}
                            image={chatRoom.memberSimpleInfo.profileImgUrl}
                            name={chatRoom.memberSimpleInfo.nickName}
                            mbti={chatRoom.memberSimpleInfo.mbti}
                            badge={chatRoom.memberSimpleInfo.badge}
                          />
                        );
                      }
                    })}
                </div>
                <div css={ChatMenuCSS}>
                  <Hamburger />
                </div>
              </>
            )}
          </div>
        </div>

        <div css={chattingInnerCSS}>
          <div css={chattingLeftCSS}>
            {chatRooms && (
              <ul>
                {Array.isArray(chatRooms) &&
                  chatRooms.map((chatRoom) => {
                    return (
                      <li
                        onClick={() => handleChatRoomClick(chatRoom.chatRoomId)}
                        key={chatRoom.chatRoomId}
                        css={[
                          activeRoomId === chatRoom.chatRoomId &&
                            active &&
                            activeStyle,
                        ]}
                      >
                        <ChattingComponent chatRoom={chatRoom} />
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          <div css={chattingRightCSS}>
            {!chatRooms && (
              <div css={noChatCSS}>
                <CatLogoIcon />
                <div css={topFontSIZE}>나의 채팅</div>
                <div css={bottomFontSIZE}>M쌤이 되어 고민을 해결해보세요</div>
                <Button onClick={() => navigate("/match/matching")}>
                  고민 보러가기
                </Button>
              </div>
            )}
            {chatRooms && active ? (
              <>
                <div css={dateTop}>
                  {Array.isArray(chatRooms) &&
                    chatRooms.map((chatRoom) => {
                      if (chatRoom.chatRoomId === activeRoomId) {
                        return <CurrentChatting chatRoom={chatRoom} />;
                      }
                    })}
                </div>
                <div css={dateMiddle} ref={scrollRef}>
                  <div css={chattingBox}>
                    {activeRoomMessages &&
                      activeRoomMessages.map((message: any, index: number) => (
                        <MessageItem
                          key={index}
                          message={message}
                          profile={profileUrl}
                        />
                      ))}
                  </div>
                </div>
                <ChattingForm chatRoomId={activeRoomId} />
              </>
            ) : (
              <div css={[noChatCSS, noMassageCSS]}>
                <div css={bottomFontSIZE}>
                  익명성을 악욕한 욕설, 비방, 불건전한 정보 유통 등 상대방을
                  불쾌하게 하는 행위를 저지를 경우
                </div>
                <div css={bottomFontSIZE}>
                  커뮤니티 가이드 라인에 따라 불이익을 받거나 심한 경우 계정이
                  해지될 수 있습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChattingPage;

const containerCSS = css`
  background: ${COLOR.WHITE};
  padding: 0;
`;

const editorContainerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 1.5rem 15rem;
`;

const boderRightCSS = css`
  border-right: 1px solid ${COLOR.GRAY4};
  height: 100%;
  align-items: center;
  display: flex;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  padding-left: 3rem;
`;

const ChatProfileCSS = css`
  padding: 0 2rem 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMenuCSS = css`
  display: flex;
  justify-content: end;
`;

const alignmentCSS = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLOR.GRAY4};
  display: grid;
  grid-template-columns: 1.91fr 5fr;
  grid-template-rows: 1fr;
  height: 5rem;
`;

const chattingInnerCSS = css`
  display: flex;
  justify-content: start;
  width: 100%;
  height: 30rem;
  display: grid;
  grid-template-columns: 1.9fr 5fr;
`;

const chattingLeftCSS = css`
  background-color: ${COLOR.WHITE};
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const chattingRightCSS = css`
  border-left: 1px solid ${COLOR.GRAY4};
`;

const activeStyle = css`
  background-color: ${COLOR.MAIN4};
`;

const dateTop = css`
  display: flex;
  align-items: center;
  padding: 0.8rem 2rem 0.8rem 2rem;
  background-color: ${COLOR.MAIN4};
  height: 5rem;
  width: 100%;
`;

const dateMiddle = css`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
  height: 21rem;
`;

const noChatCSS = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const smallImgCSS = css`
  width: 7rem;
  height: 7rem;
`;

const topFontSIZE = css`
  padding-bottom: 0.5rem;
  font-size: ${FONT.SIZE.TITLE2};
  color: ${COLOR.GRAY2};
`;
const bottomFontSIZE = css`
  padding-bottom: 0.5rem;
  font-size: ${FONT.SIZE.HEADLINE};
  color: ${COLOR.GRAY2};
`;

const noMassageCSS = css`
  display: flex;
`;

// 채팅 박스
const chattingBox = css`
  padding: 0.8rem;
`;
