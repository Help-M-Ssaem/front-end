import { CompatClient, Stomp } from "@stomp/stompjs";
import { createContext, useContext, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { inputMessageState, messageState } from "../../states/chatting";

const ChatContext = createContext({
  connectHandler: (roomId: number) => {},
  disconnectHandler: () => {},
  sendHandler: (roomId: number) => {},
});

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children }: any) {
  const setMessages = useSetRecoilState(messageState);
  const [inputMessage, setInputMessage] = useRecoilState(inputMessageState);
  const token = localStorage.getItem("accessToken");

  // 채팅 연결 구독
  const client = useRef<CompatClient>();
  const connectHandler = (roomId: number) => {
    client.current = Stomp.over(() => {
      const sock = new WebSocket("wss://m-ssaem.com:8080/stomp/chat");
      return sock;
    });
    client.current.connect(
      {
        token: token,
      },
      () => {
        client.current &&
          client.current.subscribe(
            `/sub/chat/room/${roomId}`,
            onMessageReceived,
            {
              token: token!,
            },
          );
      },
    );
    return client;
  };
  const onMessageReceived = (message: any) => {
    setMessages((prevMessage) => [...prevMessage, JSON.parse(message.body)]);
  };

  // 채팅 나가기
  const disconnectHandler = () => {
    if (client.current) {
      client.current.disconnect(() => {
        window.location.reload();
      });
    }
  };
  // 채팅 보내기
  const sendHandler = (roomId: number) => {
    if (client.current && inputMessage.trim() !== "") {
      client.current.send(
        `/pub/chat/message`,
        {
          token: token,
        },
        JSON.stringify({
          roomId: roomId,
          message: inputMessage,
          type: "TALK",
        }),
      );
      setInputMessage("");
    }
  };

  const contextValue = {
    connectHandler,
    disconnectHandler,
    sendHandler,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}
