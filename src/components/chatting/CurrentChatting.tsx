/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import { RightArrowIcon } from "../../assets/CommonIcons";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { ChattingHistory, MsseamProps } from "../../interfaces/chatting";
import EvaluationModal from "../modal/EvaluationModal";
import { useCreateEvaluation } from "../../hooks/worry/useEvaluation";
import { ChatRoom } from "../../interfaces/chatting";
import { useSolveWorry } from "../../hooks/worry/useWorrySolved";
import { mssaemAxios as axios } from "../../apis/axios";
interface CurrentChattingProps {
  chatRoom: ChatRoom;
}

const CurrentChatting = ({ chatRoom }: CurrentChattingProps) => {
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState<MsseamProps | null>(null);

  const worryBoardId = chatRoom.worryBoardId;

  const handleEvaluation = async () => {
    console.log(worryBoardId);
    try {
      const res = await getSolved(worryBoardId);
      console.log(res);
      setProfileData(res);
      setIsEvaluationModalOpen(true);
    } catch (error) {
      console.error("Error fetching solved data:", error);
    }
  };

  // const handleEvaluation = () => {
  //   const profile = getSolved(chatRoom.worryBoardId);
  //   setIsEvaluationModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsEvaluationModalOpen(false);
    setIsSubmitted(true);
  };

  const formData = {
    worryBoardId: worryBoardId,
    evaluations: [selectedOption],
  };

  async function getSolved(id: number): Promise<MsseamProps> {
    const { data } = await axios.patch(`/member/worry-board/${id}/solved`, {
      worrySolverId: id,
    });
    return data;
  }
  const createMutation = useCreateEvaluation(formData);

  const handleSubmit = (selectedOption: string) => {
    console.log(formData);
    setSelectedOption(selectedOption);
    if (selectedOption) {
      createMutation.mutate();
    }
  };

  return (
    <div css={MatchingBoxCSS}>
      <div css={leftCSS}>
        <div css={solveCSS}>
          {isSubmitted && <Badge mbti="해결 완료" color={COLOR.MAIN1} />}
          <div css={mbtiBoxCSS}>
            <Badge mbti={chatRoom.memberMbti} color={"#F8CAFF"} />
            <RightArrowIcon />
            <Badge mbti={chatRoom.targetMbti} color={"#5BE1A9"} />
          </div>
        </div>
        <div css={titleCSS}>{chatRoom.chatRoomTitle}</div>
      </div>
      <div css={rightCSS}>
        <Button
          onClick={handleEvaluation}
          addCSS={isSubmitted ? buttonCSS : buttonCSS2}
          disabled={isSubmitted}
        >
          해결완료
        </Button>
      </div>
      {isEvaluationModalOpen && profileData !== null && (
        <EvaluationModal
          isOpen={isEvaluationModalOpen}
          onClose={handleCloseModal}
          onClick={(option) => {
            handleSubmit(option);
          }}
          // profile={chatRoom.memberSimpleInfo}
          profile={profileData}
        />
      )}
    </div>
  );
};

export default CurrentChatting;

const buttonCSS = css`
  background: ${COLOR.GRAY3};
`;

const buttonCSS2 = css``;

const MatchingBoxCSS = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css`
  display: flex;
  align-items: center;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const mbtiBoxCSS = css`
  display: flex;
  align-items: center;
`;

const solveCSS = css`
  display: flex;
  color: ${COLOR.GRAY2};
  width: 5rem;
  margin: 0.3rem 0 0.8rem 0;
  align-items: center;
`;
