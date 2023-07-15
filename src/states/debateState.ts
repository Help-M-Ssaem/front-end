import { atomFamily } from 'recoil';

export const choseState = atomFamily({
    key: "choseState",
    default: { id: 0, chose: false, index: -1 },
});