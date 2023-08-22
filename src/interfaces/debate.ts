import { User } from "./user";

export interface CreateDebateOption {
  content: string;
  hasImage: boolean;
  image: string|null;
}

export interface Option {
  id: number;
  content: string;
  imgUrl: string|null;
  selectedPercent?: string;
  selected: boolean;
};

export interface Debate {
  id: number;
  title: string;
  content: string;
  participantCount: number;
  commentCount: number;
  createdAt: string;
  memberSimpleInfo: User;
  options: Option[];
}

export interface DebateDetail {
  discussionSimpleInfo: Debate;
  isEditAllowed: boolean;
}
export interface DebateList {
  page: number;
  totalSize: number;
  result: Debate[];
}


export interface HotDebate {
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
      content: string;
      imgUrl: string;
      selectedPercent: string;
      selected: boolean;
    },
  ];
}

export interface HotDebateMore {
  page: number;
  totalSize: number;
  result: HotDebate[];
}
