export const debateKeys = {
  all: ["debate"] as const,
  hot: ["debatehot"] as const,
  detail: (id: number) => [...debateKeys.all, id] as const,
  comment: (id: number) => [...debateKeys.all, id, "comment"] as const,
};
