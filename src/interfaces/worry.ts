import { User } from "./user";

export interface worry {
  postWorryReq: {
    title: string;
    content: string;
    targetMbti: string;
  };
  image: [string];
}

export interface WorryBoard extends User {
  title: string;
  content: string;
  imgUrl: string;
  memberMbti: string;
  targetMbti: string;
  createDate: number;
}

export interface UseWarryBoard extends WorryBoard {
  page: number;
  totalSize: number;
  result: WorryBoard[];
}