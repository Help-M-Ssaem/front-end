export interface User {
  id: number;
  nickName: string;
  mbti: string;
  badge: string;
  profileImgUrl: string;
}

export interface UserProfile {
  teacherInfo: {
    id: number;
    nickName: string;
    mbti: string;
    badge: string;
    profileImgUrl: string;
    introduction: string;
  };
  badgeInfos: [];
  evaluationCount: {
    likeCount: number;
    usefulCount: number;
    funCount: number;
    sincereCount: number;
    hotCount: number;
  };
  boardHistory: {
    boardCount: number;
    boardCommentCount: number;
    likeAllCount: number;
  };
  discussionHistory: {
    discussionCount: number;
    discussionCommentCount: number;
    participationCount: number;
  };
  worryBoardHistory: {
    worryBoardCount: number;
    solvedWorryBoardCount: number;
    evaluationCount: number;
  };
}
