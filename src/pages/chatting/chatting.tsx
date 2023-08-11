/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useEffect, useRef, useState } from "react";
import ChattingComponent from "../../components/chatting/ChattingComponent";
import Profile from "../../components/profile/Profile";
import Hamburger from "../../components/hamburger/Hamburger";
import CurrentChatting from "../../components/chatting/CurrentChatting";
import MessageItem from "../../components/chatting/MessageItem";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { useChatRooms } from "../../hooks/chatting/useChatRooms";
import Input from "../../components/input/Input";
import { PhotoIcon } from "../../assets/ChattingIcons";
import { useRecoilState } from "recoil";
import {
  activeRoomIdState,
  messageState,
  stompClientState,
} from "../../states/chatting";

const ChattingPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdState);
  const [stompClient, setStompClient] = useRecoilState(stompClientState);
  const [message, setMessage] = useRecoilState(messageState);
  const { chatRooms, isLoading } = useChatRooms();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 채팅 보내기
  const sendHandler = () => {
    if (stompClient && inputMessage.trim() !== "") {
      stompClient.send(
        `/pub/chat/message`,
        {
          token: token,
        },
        JSON.stringify({
          roomId: activeRoomId,
          message: inputMessage,
          type: "TALK",
        }),
      );
      setInputMessage("");
    }
  };
  // 채팅 보내기 함수 실행
  const handleChattingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendHandler();
  };

  const handleItemClick = (roomId: number) => {
    setActiveRoomId(roomId);
  };

  return (
    <div css={editorContainerCSS}>
      <Container addCSS={containerCSS}>
        <div css={alignmentCSS}>
          <div css={boderRightCSS}>
            <div css={titleCSS}>채팅목록</div>
          </div>
          <div css={ChatProfileCSS}>
            {isLoading ? <div>채팅 내역을 가져오는 중 ..</div> : null}
            {chatRooms && (
              <>
                <div>
                  {chatRooms.map((chatRoom) => {
                    if (chatRoom.roomId === activeRoomId) {
                      return (
                        <Profile
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
                {chatRooms.map((chatRoom) => {
                  return (
                    <li
                      onClick={() => handleItemClick(chatRoom.roomId)}
                      key={chatRoom.roomId}
                      css={[activeRoomId === chatRoom.roomId && activeStyle]}
                    >
                      <ChattingComponent chatRoom={chatRoom} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div css={chattingRightCSS}>
            {!chatRooms ? (
              <div css={noChatCSS}>
                <img
                  css={smallImgCSS}
                  src="https://i.ibb.co/YRZSTTL/rhdiddl4.png"
                  alt="rhdiddl4"
                />
                <div css={topFontSIZE}>나의 채팅</div>
                <div css={bottomFontSIZE}>M쌤이 되어 고민을 해결해보세요</div>
                <Button onClick={() => navigate("/match/matching")}>
                  고민 보러가기
                </Button>
              </div>
            ) : (
              <>
                {/* 고민글이랑 프로필 받아오는 부분 */}
                {/* <div css={dateTop}>
                  <CurrentChatting profile={selectedChattingData} />
                </div> */}
                {/* 채팅창 */}
                <div css={dateMiddle}>
                  <div css={{ padding: "0.8rem" }}>
                    {message ? (
                      message.map((message, index) => (
                        <MessageItem key={index} message={message} />
                      ))
                    ) : (
                      <div css={[noChatCSS, noMassageCSS]}>
                        <div css={bottomFontSIZE}>
                          익명성을 악욕한 욕설, 비방, 불건전한 정보 유통 등
                          상대방을 불쾌하게 하는 행위를 저지를 시
                        </div>
                        <div css={bottomFontSIZE}>
                          커뮤니티 가이드 라인에 따라 불이익을 받거나 심한경우
                          계정이 해지될 수 있습니다.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* 채팅 입력폼 */}
                <div css={dateBottom}>
                  <form
                    css={submitButtonBoxCSS}
                    onSubmit={handleChattingSubmit}
                  >
                    <div css={inlineInputCSS}>
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                      />
                      <label css={labelContainerCSS}>
                        <PhotoIcon />
                        <input
                          type="file"
                          name="photo"
                          id="photo"
                          accept="image/*"
                          css={fileInputCSS}
                        />
                      </label>
                    </div>
                    <Button addCSS={buttonCSS}>등록</Button>
                  </form>
                </div>
              </>
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
  height: 4.95rem;
  width: 100%;
`;

const dateMiddle = css`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
  height: 21rem;
`;

const dateBottom = css`
  display: flex;
  width: 100%;
  height: 4rem;
  padding: 0.8rem 2rem 0.8rem 2rem;
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
  padding-top: 7rem;
`;

// 채팅 입력창
const buttonCSS = css`
  margin-left: 0.5rem;
  width: 5rem;
`;

const submitButtonBoxCSS = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const inlineInputCSS = css`
  display: flex;
  width: 100%;
  position: relative;
`;

const labelContainerCSS = css`
  display: flex;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  align-items: center;
`;

const fileInputCSS = css`
  display: none;
`;
