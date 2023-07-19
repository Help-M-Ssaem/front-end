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