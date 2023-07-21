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

export interface HomeBoard {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  boardMbti: string;
  likeCount: number;
  commentCount: number;
  createAt: string;
  memberSimpleInfo: {
    id: number;
    nickName: string;
    mbtiEnum: string;
    badge: string;
    profileImgUrl: string;
  };
}

export interface HotBoard extends HomeBoard {
  page: number;
  totalState: number;
  result: HomeBoard[];
}
