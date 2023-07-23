//로그인 확인용
import { atom } from "recoil";

export const loginIdState = atom({
    key: "loginIdState",
    default: 1,//로그인 상태로 가정.
  });
  