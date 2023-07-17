import { atomFamily } from 'recoil';

export const choseState = atomFamily({
  key: "choseState",
  default: { id: 0, chose: false, index: -1 },
});

export const voteCountState = atomFamily<number[], { debateId: number; optionIndex: number }>({
    key: 'voteCountState',
    default: ({ debateId, optionIndex }) => {
      // 여기에서 debateId와 optionIndex를 기반으로 실제 데이터를 가져오는 로직을 구현할 수 있습니다.
      // 현재는 기본값으로 빈 배열을 반환하도록 설정되어 있습니다.
      return [];
    },
  });

