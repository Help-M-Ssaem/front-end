import { atomFamily } from 'recoil';
import { Debate } from '../interfaces/debate';

export const debateState = atomFamily<Debate, number>({
    key: 'debateState',
    default: (id) => ({
      id: id,
      name: '',
      profile: '',
      mbti: '',
      badge: '',
      title: '',
      content: '',
      selectedOptions: [],
      selectedOptionIndex: -1,
      totalVotes: 0,
      voted: false,
      createdAt: '',
      comment: 0,
    }),
  });
  
  
  
  
  
  