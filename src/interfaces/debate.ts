import { User } from "./user";

export interface HotDebate extends User {
  id: number;
  title: string;
  content: string;
  participantCount: number;
  commentCount: number;
  createdAt: string;
  memberSimpleInfo: User;
  options: [
    {
      id: number;
      title: string;
      imgUrl: string;
      selectedPercent: string;
      selected: boolean;
    },
  ];
}
