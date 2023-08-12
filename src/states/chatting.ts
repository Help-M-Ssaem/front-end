import { atom } from "recoil";
import * as Stomp from "stompjs";

export const stompClientState = atom<any>({
  key: "stompClientState",
  default: null,
});

export const messageState = atom<string[]>({
  key: "messageState",
  default: [],
});

export const activeRoomIdState = atom<number>({
  key: "activeRoomIdState",
  default: 1,
});
