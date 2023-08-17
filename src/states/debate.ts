import { atom } from "recoil";

export const replyCommentOpenState = atom({
  key: "replyCommentOpenState",
  default: false,
});

export const replyCommentIdState = atom({
  key: "replyCommentIdState",
  default: 0,
});