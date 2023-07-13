import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const navbarState = atom({
  key: "navbarState",
  default: "/",
  effects_UNSTABLE: [persistAtom],
});
