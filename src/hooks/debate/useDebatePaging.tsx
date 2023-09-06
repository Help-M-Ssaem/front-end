import { useQuery } from 'react-query';
import { mssaemAxios as axios } from '../../apis/axios';
import { DebateList } from '../../interfaces/debate';
import { debateKeys } from '../../constants/debateKey';

export function useDebatePaging(path: string, page: number, postId: number) {
  const queryKey = debateKeys.all;
  const { data: debateList, refetch } = useQuery<DebateList>(
    queryKey,
    async () => {
      const { data } = await axios.get(
        `/discussions${path === 'discusstion' ? '' : '/hot'}?discussionId=${postId}&page=${page}&size=6`
      );
      return data;
    }
  );

  return { debateList, refetch };
}
