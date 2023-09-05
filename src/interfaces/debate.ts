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

export interface Debates {
  debates: Debate[];
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