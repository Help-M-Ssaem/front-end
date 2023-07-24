import { User } from "./user";

export interface Option {
  imageContent?: File;
  imageContentURL?: string;
  textContent: string;
  voteCount: number;
}

export interface PostData {
  title: string;
  content: string;
  selectedOptions: Option[];
  selectedOptionIndex: number;
  totalVotes: number;
  voted: boolean;
}

export interface Debate extends PostData {
  id: number;
  name: string;
  profile: string;
  mbti: string;
  badge: string;
  createdAt: string;
  comment: number;
}
export interface DebateProps {
  debate: Debate;
}

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

export interface HotDebateMore extends HotDebate {
  page: number;
  totalSize: number;
  result: HotDebate[];
}
