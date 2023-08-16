export interface Matching {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  thumbnail?: string;
  mbti1: string;
  mbti2: string;
  color1?: string;
  color2?: string;
}

export interface MainMatching {
  id: number;
  title: string;
  content: string;
  memberMbti: string;
  targetMbti: string;
  createdDate: string;
  imgUrl: string;
}

export interface MainTeacher {
  id: number;
  nickName: string;
  mbti: string;
  badge: string;
  profileImgUrl: string;
  introduction: string;
}
