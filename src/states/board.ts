import { atom } from "recoil";

export const mbtiState = atom({
  key: "mbtiState",
  default: "전체",
});

export const replyCommentOpenState = atom({
  key: "replyCommentOpenState",
  default: false,
});

export const replyCommentIdState = atom({
  key: "replyCommentIdState",
  default: 0,
});
