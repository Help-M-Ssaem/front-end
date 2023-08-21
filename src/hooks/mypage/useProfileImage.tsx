import { useMutation, useQuery, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function useprofileImage(formData: FormData) {
  const response = await axios.post("/member/profile/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
export function useProfileImage() {
  const queryClient = useQueryClient();

  const mutation = useMutation(useprofileImage, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });

  return mutation;
}
