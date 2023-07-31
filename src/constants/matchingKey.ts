export const mainMatchingKeys = {
  all: ["mainMatching"] as const,
};

export const mainTeacherKeys = {
  all: ["mainTeacher"] as const,
};

export const worryKeys = {
  all: ["worry-board"] as const,
  witing: ["worry-board","witing"] as const,
  solved: ["worry-board", "solved"] as const,
  detail: (id: number) => [...worryKeys.all, id] as const,
};
