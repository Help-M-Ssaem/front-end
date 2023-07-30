import { User } from "./user";

export interface Board {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  boardMbti: string;
  likeCount: number;
  createdAt: string;
  memberSimpleInfo: User;
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
}

export interface BoardList {
  page: number;
  totalSize: number;
  result: Board[];
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
