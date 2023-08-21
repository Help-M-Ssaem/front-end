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
  try {
    await axios.post(`/member/reports`, report, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.alert("신고되었습니다.");

  } catch (error: any) {
    if (error.response && error.response.data) {
      window.alert(error.response.data.message);
      return error.response.data;
    } else {
      console.error("Unknown error:", error);
    }
  }
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
    },
  });
  return { mutate };
}