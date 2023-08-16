/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import { RightArrowIcon } from "../../assets/CommonIcons";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import {
  ChatRoom,
  ChattingHistory,
  MsseamProps,
} from "../../interfaces/chatting";
import EvaluationModal from "../modal/EvaluationModal";
import { useCreateEvaluation } from "../../hooks/worry/useEvaluation";
import { useSolveWorry } from "../../hooks/worry/useWorrySolved";

import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";

//데이터 받아서 해야되는뎅...
const matching = {
  id: 1,
  thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
  title: "학생회장 선배 도와주세요ㅠㅠ",
  content: "마음이 있는 것 같나요?",
  createdAt: "2분전",
  mbti1: "EsFP",
  mbti2: "ISTJ",
  color1: "#94E3F8",
  color2: "#F8CAFF",
  nickName: "희희",
};

interface Profile {
  profile: ChatRoom | undefined;
}

const CurrentChatting: React.FC<Profile> = ({ profile }) => {
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileData, setProfileData] = useState<MsseamProps | null>(null);
  console.log(profile);

  const worryBoardId = 24;

  const handleOpenModalWithData = async () => {
    try {
      const res = await getSolved(worryBoardId);
      console.log(res);
      setProfileData(res);
      setIsEvaluationModalOpen(true);
    } catch (error) {
      console.error("Error fetching solved data:", error);
    }
  };

  async function getSolved(id: number): Promise<MsseamProps> {
    const { data } = await axios.patch(`/member/worry-board/${id}/solved`, {
      worrySolverId: id,
    });
    return data;
  }

  const evaluationData = {
    worryBoardId: matching.id,
    evaluations: [selectedOption],
  };
  const createEvaluation = useCreateEvaluation(evaluationData);

  const handleCloseModal = () => {
    setIsEvaluationModalOpen(false);
  };

  const handleEvaluation = async (selectedOption: string) => {
    if (selectedOption !== "") {
      setIsSubmitted(true);
      setSelectedOption(selectedOption);
      evaluationData.evaluations[0] = selectedOption;
      createEvaluation.mutate();
      setIsEvaluationModalOpen(true);
    }
  };

  return (
    <div css={MatchingBoxCSS}>
      <div css={leftCSS}>
        <div css={solveCSS}>
          {isSubmitted && <Badge mbti="해결 완료" color={COLOR.MAIN1} />}
          <div css={mbtiBoxCSS}>
            <Badge mbti={matching.mbti1} color={matching.color1} />
            <RightArrowIcon />
            <Badge mbti={matching.mbti2} color={matching.color2} />
          </div>
        </div>
        <div css={titleCSS}>{matching.title}</div>
      </div>
      <div css={rightCSS}>
        <Button
          onClick={handleOpenModalWithData}
          addCSS={isSubmitted ? buttonCSS : buttonCSS2}
          disabled={isSubmitted}
        >
          해결완료
        </Button>
      </div>
      {!isSubmitted && isEvaluationModalOpen && profileData !== null && (
        <EvaluationModal
          isOpen={isEvaluationModalOpen}
          onClose={handleCloseModal}
          onClick={(result) => {
            handleEvaluation(result);
          }}
          profile={profileData}
        />
      )}
    </div>
  );
};

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

export default CurrentChatting;
