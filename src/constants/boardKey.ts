export const boardKeys = {
  all: ["board"] as const,
  detail: (id: number) => [...boardKeys.all, id] as const,
};

export const categoryBookmarkKeys = {
  all: ["categoryBookmark"] as const,
};

export const hotThreeKeys = {
  all: ["hotThree"] as const,
};

export const hotBoardKeys = {
  all: ["hotBoard"] as const,
};

export const hotDebateKeys = {
  all: ["hotDebate"] as const,
};

export const hotTeacherKeys ={
  all: ["teacher"] as const,
}
