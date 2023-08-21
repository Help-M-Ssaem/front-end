import { User } from "./user";
import { WorryList } from "./worry";
import { DebateList } from "./debate";

export interface Board {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  boardMbti: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  memberSimpleInfo: User;
  createdDate: string;
}

export interface BoardDetail {
  memberSimpleInfo: User;
  boardId: number;
  title: string;
  content: string;
  imgUrlList: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isAllowed: boolean;
  isLiked: boolean;
  boardMbti: string;
  hits: number;
}

export interface BoardList {
  page: number;
  totalSize: number;
  result: Board[];
}

export interface MultipleBoardList {
  boardSimpleInfos: BoardList;
  getWorriesRes: WorryList;
  discussionSimpleInfo: DebateList;
}

export interface CategoryBookmark {
  mbti: [string];
}

export interface HotThree {
  boardId?: number;
  boardTitle?: string;
  boardContent?: string;
  discussionId?: number;
  discussionTitle?: string;
  discussionContent?: string;
  worryBoardId?: number;
  worryBoardTitle?: string;
  worryBoardContent?: string;
}

export interface HotBoard {
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

export interface HotBoardMore {
  page: number;
  totalSize: number;
  result: HotBoard[];
}
