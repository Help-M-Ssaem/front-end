import { User } from "./user";

export interface ChattingHistory {
  name: string;
  profile: string;
  mbti: string;
  badge: string;

  roomId: number;
  latestMessage: string;
  createdAt: string;

  text: text[];
}

export interface text {
  userId: string;
  message: string;
  createdAt: string;
}
export interface ChattingTitle {
  roomid: number;
  senderbadge: string;
  receiverbadge: string;
  title: string;
  progress: string;
}

export interface EvaluationProps {
  worryBoardId: number;
  evaluations: string[];
}

export interface ChatRoom {
  roomId: number;
  chatRoomTitle: string;
  state: boolean;
  lastMessage: string;
  lastSendAt: string;
  memberSimpleInfo: User;
}

export interface ChatMessage {
  chatRoomId: number;
  message: string;
  createdAt: string;
  sender: string;
  sendWho: number;
}
