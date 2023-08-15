/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import { RightArrowIcon } from "../../assets/CommonIcons";
import Button from "../button/Button";
import { useState } from "react";
import EvaluationModal from "../modal/EvaluationModal";
import { useCreateEvaluation } from "../../hooks/worry/useEvaluation";
import { ChatRoom } from "../../interfaces/chatting";

interface CurrentChattingProps {
  chatRoom: ChatRoom;
}

const CurrentChatting = ({ chatRoom }: CurrentChattingProps) => {
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEvaluation = () => {
    setIsEvaluationModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsEvaluationModalOpen(false);
    setIsSubmitted(true);
  };

  const formData = {
    worryBoardId: chatRoom.chatRoomId,
    evaluations: [selectedOption],
  };
  const createMutation = useCreateEvaluation(formData);
  const handleSubmit = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      createMutation.mutate();
    }
  };

  console.log(chatRoom);

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
        <Button onClick={handleEvaluation} addCSS={buttonCSS}>
          해결완료
        </Button>
      </div>
      {/* {isEvaluationModalOpen && (
        <EvaluationModal
          isOpen={isEvaluationModalOpen}
          onClose={handleCloseModal}
          onClick={() => {}}
          // profileData={profile}
        />
      )} */}
    </div>
  );
};

export default CurrentChatting;

const buttonCSS = css`
  background: ${COLOR.WHITE};
  color: ${COLOR.GRAY2};
`;

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
