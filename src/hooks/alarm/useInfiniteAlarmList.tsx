import { useInfiniteQuery } from 'react-query';
import { getAlarmList } from './useGetAlarm';

export function useInfiniteAlarmList() {
  return useInfiniteQuery(['alarmList'], ({ pageParam = 0 }) => getAlarmList(pageParam, 10), {
    getNextPageParam: (lastPage) => {
      if (lastPage.totalSize-lastPage.page > 1) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}