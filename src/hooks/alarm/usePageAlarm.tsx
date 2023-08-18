import { mssaemAxios as axios } from "../../apis/axios";
import { AlarmList } from "../../interfaces/alarm";
import { useQuery } from "react-query";

export function useAlarmPaging ( page: number) {
  const alarmpageKey = "alramList";
  const { data : alarmList, refetch } = useQuery<AlarmList> (
    alarmpageKey,
    async () =>  {
      const { data } = await axios.get(
        `/member/notifications?page=${page}&size=${10}`
      );
      return data;
    }
  );
  return {alarmList, refetch}
};
  
  // export function useDebatePaging(path: string, page: number, postId: number) {
  //   const queryKey = path === 'discusstion' ? debateKeys.all : debateKeys.hot;
  //   const { data: debateList, refetch } = useQuery<DebateList>(
  //     queryKey,
  //     async () => {
  //       const { data } = await axios.get(
  //         `/discussions${path === 'discusstion' ? '' : '/hot'}?discussionId=${postId}&page=${page}&size=6`
  //       );
  //       return data;
  //     }
  //   );
  
  //   return { debateList, refetch };
  // }
  



  