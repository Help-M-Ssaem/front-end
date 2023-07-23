import { User } from "./user";

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

export interface HotBoardMore extends HotBoard {
  page: number;
  totalSize: number;
  result: HotBoard[];
}
