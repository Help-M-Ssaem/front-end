import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { reportKeys } from "../../constants/reportKey"

async function postReport(    
  id : number,
  target: string,
  reason: string,
	content : string |null,
  ): Promise<void> {
  const report = {
    resourceId: id,
    reportTarget: target,
    reportReason: reason,
    content: content,
  };
  await axios.post(`/member/reports`, report, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

interface UseCreateBoard {
  mutate: () => void;
}

export function usePostReport(    
  id : number,
  target: string,
  reason: string,
	content : string|null,
  ): UseCreateBoard {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => postReport( id, target,
    reason, content), {
    onSuccess: () => {
      queryClient.invalidateQueries(reportKeys.all);
      window.alert("신고되었습니다.");
    },
    // 나중에 에러처리할때 넣기
    // onError: (error: any) => {
    //   queryClient.invalidateQueries(reportKeys.all);
    //   if (error.response) {
    //     const status = error.response.status;
    //     if (status === NOT_FOUND) {
    //       window.alert("존재하지 않는 게시물입니다.");
    //     } else if (status === CONFLICT) {
    //       window.alert("이미 신고한 이력이 있습니다.");
    //     } else if (status === INTERNAL_SERVER_ERROR) {
    //       window.alert("메일 전송에 실패했습니다.");
    //     }
    //   }
    // }
  });
  return { mutate };
}