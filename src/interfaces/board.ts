import { User } from "./user";

export interface Board {
  id: number;
  name: string;
  profile: string;
  thumbnail: string;
  mbti: string;
  badge: string;
  title: string;
  content: string;
  createdAt: string;
  like: number;
  comment: number;
}

export interface HotBoard extends User {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  boardMbti: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  memberSimpleInfo: User;
}
