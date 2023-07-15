export interface Option {
    imageContent?: File;
    imageContentURL?: string;//이미지 복붙이 안된다..?
    textContent: string;
  }
  
export interface PostData {
    title: string;
    content: string;
    selectedFile?: File;
    selectedOptions: Option[];
  }

export interface Debate extends PostData {
    id: number;
    name: string;
    profile: string;

    mbti: string;
    badge: string;

    //포스트는 PostData로 받기->근데 코멘이랑 작성날짜는..?
    createdAt: string;
    voteratio: number[];

    participants: number;
    comment: number;
    chose:boolean;
}

  
