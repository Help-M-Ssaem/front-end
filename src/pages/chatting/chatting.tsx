/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useEffect, useState } from "react";
import ChattingComponent from "../../components/chatting/ChattingComponent";
import { ChattingHistory } from "../../interfaces/chatting";
import Profile from "../../components/profile/Profile";
import Hamburger from "../../components/hamburger/Hamburger";
import CurrentChatting from "../../components/chatting/CurrentChatting";
import CurrentChattingForm from "../../components/chatting/CurrentChattingForm";
import MessageItem from "../../components/chatting/MessageItem";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import * as stomp from "stompjs";

const chattinglist1 = [
  {
    roomId: 0,
    name: "신강희",
    profile: "https://i.ibb.co/jJt16M0/image.png",
    mbti: "Infj",
    badge: "마스터",
    latestMessage: "카페에서 남자친구랑 싸웠어요..저도아이유최고얌",
    createdAt: "3분전",
    resolved: false,
    text: [
      { userId: "user1", message: "안녕하세요!", createdAt: "3분전" },
      {
        userId: "user2",
        message: "카페에서 남자친구랑 싸웠어요..저도아이유최고얌",
        createdAt: "4분전",
      },
    ],
  },
  {
    roomId: 1,
    name: "신강희",
    profile: "https://i.ibb.co/jJt16M0/image.png",
    mbti: "Infj",
    badge: "마스터",
    latestMessage: "네, 정말 좋은 날씨입니다!",
    createdAt: "5분전",
    resolved: false,
    text: [
      { userId: "user1", message: "안녕하세요!", createdAt: "5분전" },
      {
        userId: "user2",
        message: "안녕하세요! 반갑습니다!",
        createdAt: "6분전",
      },
      {
        userId: "user1",
        message: "오늘 날씨가 참 좋네요!",
        createdAt: "7분전",
      },
      {
        userId: "user2",
        message: "네, 정말 좋은 날씨입니다!",
        createdAt: "8분전",
      },
    ],
  },
  {
    roomId: 2,
    name: "배고파",
    profile: "https://i.ibb.co/jJt16M0/image.png",
    mbti: "Infj",
    badge: "엽떡마스터",
    latestMessage: "",
    createdAt: "5분전",
    text: [],
  },
];

interface Message {
  userId: string;
  message: string;
  createdAt: string;
}

const ChattingPage = () => {
  const [selectedChattingData, setSelectedChattingData] =
    useState<ChattingHistory | null>(null);
  const [messageData, setMessageData] = useState<Message[] | null>(null);
  const navigate = useNavigate();

  // 채팅서버연결
  const [activeRoomId, setActiveRoomId] = useState<number>(-1); // 현재 선택된 채팅방의 아이디를 저장하는 상태 변수
  const [message, setMessage] = useState<string[]>([]); // 채팅 메세지를 저장하는 상태 변수
  const [inputMessage, setInputMessage] = useState(""); // 사용자가 입력한 메세지를 저장하는 상태 변수
  const [stompClient, setstompClient] = useState<stomp.Client | null>(null); // stomp 클라이언트를 저장하는 상태 변수

  const connectAndSendMessages = (roomId: number, inputMessage: string) => {
    // 웹 소켓을 생성하고, stomp 클라이언트를 생성하여 서버와 연결
    const socket = new WebSocket("wss://m-ssaem.com:8080/stomp/chat");
    const client = stomp.over(socket);
    // 서버와 연결이 성공하면 stomp 클라이언트를 저장하고, 채팅 메세지 구독
    client.connect({}, () => {
      setstompClient(client);
      client.subscribe(`/sub/chat/room/${activeRoomId}`, onMessageReceived);

      // 메세지를 보내는 함수
      const sendMessage = () => {
        if (inputMessage.trim() !== "") {
          client.send("", {}, inputMessage);
          setInputMessage("");
        }
      };
      sendMessage();
    });
    // 컴포넌트가 언마운트될 때 연결을 종료
    return () => {
      client.disconnect(() => {
        console.log("Disconnected");
      }, []);
    };
  };

  useEffect(() => {
    if (activeRoomId !== -1) {
      connectAndSendMessages(activeRoomId, inputMessage);
    }
  }, [activeRoomId]);

  // 채팅 메세지를 받았을 때 호출되는 콜백 함수
  const onMessageReceived = (message: stomp.Message) => {
    setMessage((prevMessage) => [...prevMessage, message.body]);
  };
  // 입력 필드에 변화가 있을 때 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };
  // 메세지를 보내는 함수
  const sendMessage = () => {
    // stomp 클라이언트가 있고, 입력한 메세지가 비어있지 않을 경우에만 메세지 전송
    if (stompClient && inputMessage.trim() !== "") {
      stompClient.send("", {}, inputMessage);
      setInputMessage("");
    }
  };

  const handleButtonClick = () => {
    navigate("/match/maching");
  };
  const handleItemClick = (roomId: number) => {
    setActiveRoomId((prevId) => (prevId === roomId ? -1 : roomId));

    const selectedChattingHistory =
      chattinglist1.length > 0
        ? (chattinglist1.find(
            (chattinghistory) => chattinghistory.roomId === roomId,
          ) as ChattingHistory)
        : null;

    setSelectedChattingData(selectedChattingHistory);

    if (selectedChattingHistory) {
      if (selectedChattingHistory.text.length > 0) {
        setMessageData(selectedChattingHistory.text);
      } else setMessageData(null);
    } else {
      setMessageData(null);
    }
  };

  return (
    <div css={editorContainerCSS}>
      <Container addCSS={containerCSS}>
        <div css={alignmentCSS}>
          <div css={boderRightCSS}>
            <div css={titleCSS}>채팅목록</div>
          </div>
          <div css={ChatProfileCSS}>
            {chattinglist1.length !== 0 && (
              <>
                <div>
                  {selectedChattingData && (
                    <Profile
                      image={selectedChattingData.profile}
                      name={selectedChattingData.name}
                      mbti={selectedChattingData.mbti}
                      badge={selectedChattingData.badge}
                    />
                  )}
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
            {chattinglist1.length !== 0 && (
              <ul>
                {chattinglist1.map((chattinghistory) => (
                  <li
                    key={chattinghistory.roomId}
                    onClick={() => handleItemClick(chattinghistory.roomId)}
                    css={[
                      activeRoomId === chattinghistory.roomId && activeStyle,
                    ]}
                  >
                    <ChattingComponent Chattinghistory={chattinghistory} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div css={chattingRightCSS}>
            {chattinglist1.length === 0 ? (
              <div css={noChatCSS}>
                <img
                  css={smallImgCSS}
                  src="https://i.ibb.co/YRZSTTL/rhdiddl4.png"
                  alt="rhdiddl4"
                />
                <div css={topFontSIZE}>나의 채팅</div>
                <div css={bottomFontSIZE}>M쌤이 되어 고민을 해결해보세요</div>
                <Button onClick={handleButtonClick}>고민 보러가기</Button>
              </div>
            ) : (
              <>
                {/* 서버 연결하시면 이것도 바꿔야해여.. 고민글이랑 프로필 받아오는 부분 */}
                <div css={dateTop}>
                  <CurrentChatting profile={selectedChattingData} />
                </div>
                {/* 채팅창 */}
                <div css={dateMiddle}>
                  <div css={{ padding: "0.8rem" }}>
                    {messageData !== null ? (
                      messageData &&
                      messageData.map((message, index) => (
                        <MessageItem
                          key={index}
                          message={message.message}
                          createdAt={message.createdAt}
                          isCurrentUser={message.userId === "user1"}
                          profile={selectedChattingData?.profile}
                        />
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
                {/* 보내는 거 */}
                <div css={dateBottom}>
                  <CurrentChattingForm />
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
