import { User } from "./user";

export interface Comment {
  commentId: number;
  likeCount: number;
  parentId: number;
  createdAt: string;
  isLiked: boolean;
  isEditAllowed: boolean;
  memberSimpleInfo: User;
  content: string;
}

export interface CommentList {
  page: number;
  totalSize: number;
  result: Comment[];
}
