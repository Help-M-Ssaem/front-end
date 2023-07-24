import { User } from "./user";

export interface BoardCreate {
  postBoardReq: {
    id?: number;
    title: string;
    content: string;
    mbti: string;
    memberId: number;
  };
  image: [];
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

