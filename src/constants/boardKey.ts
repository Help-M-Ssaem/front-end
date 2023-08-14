export const boardKeys = {
  all: ["board"] as const,
  detail: (id: number) => [...boardKeys.all, id] as const,
  comment: (id: number) => [...boardKeys.all, id, "comment"] as const,
};

export const categoryBookmarkKeys = {
  all: ["categoryBookmark"] as const,
};

export const categoryCountKeys = {
  all: ["categoryCount"] as const,
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

export const worryBoardKeys = {
  all: ["worryBoard"] as const,
};
