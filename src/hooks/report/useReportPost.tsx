import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { reportKeys } from "../../constants/reportKey"

async function postReport(    
  id : number,
	type : string,
	content : string
  ): Promise<void> {
  const report = {
    resourceId: id,
    reportType: type,
    content: content,
  };
  await axios.post(`/member/reports`, report, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    console.log("Response:", response.data);
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
	type : string,
	content : string
  ): UseCreateBoard {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => postReport( id, type, content), {
    onSuccess: () => {
      queryClient.invalidateQueries(reportKeys.all);
    },
  });
  return { mutate };
}