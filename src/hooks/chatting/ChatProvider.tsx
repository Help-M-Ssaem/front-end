import { CompatClient, Stomp } from "@stomp/stompjs";
import { createContext, useContext, useMemo, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../states/chatting";

const ChatContext = createContext(
  {} as {
    connect: (roomId: number) => void;
    disconnect: () => void;
    send: (roomId: number, message: string) => void;
  },
);

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children }: any) {
  const setMessages = useSetRecoilState(messageState);
  const token = localStorage.getItem("accessToken");
  // let token =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNjg5MzU2NTQwLCJleHAiOjE2OTQ1NDA1NDB9.nvOIStUQzS_-C2mLMX9tuNSUWqVYbPNa9p_5HlMyoDI";

  // 채팅 연결 구독
  const client = useRef<CompatClient>();
  const connect = (roomId: number) => {
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
  const disconnect = () => {
    if (client.current) {
      client.current.disconnect(() => {
        window.location.reload();
      });
    }
  };
  // 채팅 보내기
  const send = (roomId: number, message: string) => {
    if (client.current) {
      client.current.send(
        `/pub/chat/message`,
        {
          token: token,
        },
        JSON.stringify({
          roomId: roomId,
          message: message,
          type: "TALK",
        }),
      );
    }
  };

  const handlers = useMemo(() => ({ connect, disconnect, send }), []);

  return (
    <ChatContext.Provider value={handlers}>{children}</ChatContext.Provider>
  );
}
