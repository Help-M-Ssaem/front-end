import { MainMatching } from "./matching";
import { User } from "./user";

export interface worry {
  postWorryReq: {
    title: string;
    content: string;
    targetMbti: string;
  };
  image: [string];
}

export interface WorryBoard {
  //차피 받아온 배열을 result로 줄거니깐 이걸로 처리
  id: number;
  title: string;
  content: string;
  memberMbti: string; //user에서 받아오기
  targetMbti: string;
  createdDate: string;
  imgUrl: string;
  solved: string;
}

export interface WorryList {
  page: number;
  totalSize: number;
  result: WorryBoard[];
}

export interface UseWorryBoard extends WorryList {
  departMbti: string;
  endMbti: string;
}

export interface DetailWorry {
  memberSimpleInfo: User;
  worryBoardId: number;
  targetMbti: string;
  title: string;
  content: string;
  createdAt: string;
  imgList: string[];
  isEditAllowed: boolean;
  isChatAllowed: boolean;
  isSolved: boolean;
  chatRoomId?: number;
  hits: number;
}
