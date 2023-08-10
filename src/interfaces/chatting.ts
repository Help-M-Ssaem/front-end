export interface ChattingHistory {
  //sender
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

export interface ChattingProps {
  Chattinghistory: ChattingHistory;
}
export interface EvaluationProps {
  worryBoardId: number;
  evaluations: string[];
}
