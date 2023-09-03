/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Button from "../button/Button";
import { ChattingHistory, MsseamProps } from "../../interfaces/chatting";
import Badge from "../badge/Badge";
import { CancelIcon } from "../../assets/CommonIcons";
import { useCreateEvaluation } from "../../hooks/worry/useEvaluation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: (result: string) => void;
  profile: MsseamProps | null;
}

const options = [
  { id: "LIKE", value: "좋아요" },
  { id: "USEFUL", value: "유익해요" },
  { id: "FUN", value: "재밌어요" },
  { id: "SINCERE", value: "성의있어요" },
  { id: "HOT", value: "화끈해요" },
];
const EvaluationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  profile,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [profileData, setProfileData] = useState<MsseamProps | null>(profile);
  const worryBoardId = profile!!.worryBoardId;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const formData = {
    worryBoardId: worryBoardId,
    evaluations: selectedOptions, // Use the selectedOptions array
  };

  const createMutation = useCreateEvaluation(formData);

  useEffect(() => {
    if (profile !== undefined) {
      setProfileData(profile);
      console.log(profile);
    }
  }, [profile, profileData]);

  if (!isOpen || profileData === null) return null; // 모달 열리기 전에 데이터가 없으면 null 반환

  const handleOptionClick = (optionValue: string) => {
    const option = options.find((option) => option.value === optionValue);
    setSelectedOption(optionValue);
    if (option) {
      const updatedSelectedOptions = selectedOptions.includes(option.id)
        ? selectedOptions.filter((selected) => selected !== option.id)
        : [...selectedOptions, option.id];
      setSelectedOptions(updatedSelectedOptions);
    }
  };
  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      createMutation.mutate();
      setIsSubmitted(true);
      onClose();
    }
  };

  return (
    <div css={modalBackground} onClick={onClose}>
      <div css={modalMain} onClick={(e) => e.stopPropagation()}>
        <div css={modalHeader}>
          <div css={modaltext}>M쌤이 도움이 되셨나요?</div>
          <div css={calcelCSS}>
            <CancelIcon onClick={onClose} />
          </div>
        </div>
        <div css={contentBackBoxCSS}>
          <div css={[boXTopCSS, boXCSS]}>
            {profile !== undefined ? (
              <div>
                <img
                  css={profileImgCSS}
                  src={profile?.memberSimpleInfo.profileImgUrl}
                />
                <div css={profileDetailCSS}>
                  {profile?.memberSimpleInfo.nickName}
                </div>
                <div css={[profileDetailCSS, marginLeftCSS]}>
                  <Badge mbti={profile?.memberSimpleInfo.mbti || ""} />
                  <Badge mbti={profile?.memberSimpleInfo.badge || ""} />
                </div>
              </div>
            ) : (
              <div>Loading profile...</div>
            )}
          </div>
          <div css={[boXBottomCSS, boXCSS]}>
            <div>어울리는 키워드를 골라주세요. (0~5개)</div>

            <div css={buttonBoxCSS}>
              {options.map((option) => (
                <div
                  css={marginLeftCSS}
                  key={option.id}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <button
                    css={buttonCSS}
                    className={`optionItem ${
                      selectedOptions.includes(option.id) ? "selected" : ""
                    }`}
                  >
                    {option.id}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div css={bottombuttonBoxCSS}>
          <Button
            onClick={handleSubmit}
            addCSS={selectedOption ? submitButtonCSS : submitButtonCSS2}
            disabled={!selectedOption}
          >
            제출하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const modalMain = css`
  position: absolute;
  display: flex;
  width: 35rem;
  height: 30rem;
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  flex-direction: column;
`;

const modalHeader = css`
  display: flex;
  justify-content: start;
  align-items: center;
  min-height: 3rem;
  border-bottom: 1px solid ${COLOR.GRAY4};
  margin: 1rem;
`;
const modaltext = css`
  display: flex;
  flex-direction: column;
  color: ${COLOR.BLACK};
  padding-left: 2rem;
  font-size: ${FONT.SIZE.TITLE1}
  font-weight: ${FONT.WEIGHT.BOLD};
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: center;
  padding: 0.9rem;
  .optionItem {
    cursor: pointer;
    &:hover {
      background-color: ${COLOR.MAIN4};
    }
  }
`;

const contentBackBoxCSS = css`
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 22rem;
  display: flex;
  flex-direction: column;
`;

const boXCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const boXTopCSS = css`
  display: flex;
  justify-content: center;
  width: 15rem;
  min-height: 13rem;
`;

const boXBottomCSS = css`
  width: 100%;
  min-height: 7rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 0.8rem;
`;

const profileImgCSS = css`
  // width: 100%;
  // height: 100%;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
`;

const profileDetailCSS = css`
  display: flex;
  padding-top: 0.6rem;
  justify-content: center;
`;

const marginLeftCSS = css`
  padding-left: 1rem;
`;

const buttonCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${COLOR.BLACK};
  background: ${COLOR.GRAY4};
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.BOLD};

  padding: 0.5rem 1rem;
  border-radius: 2rem;

  &.selected {
    background-color: ${COLOR.MAIN4};
  }
`;

const bottombuttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem 0.8rem 0;
`;

const submitButtonCSS = css`
  background: ${COLOR.MAIN};
  color: ${COLOR.WHITE};
`;

const submitButtonCSS2 = css`
  background: ${COLOR.GRAY4};
  color: ${COLOR.BLACK};
`;

const calcelCSS = css`
  display: flex;
  margin-left: auto;
`;
