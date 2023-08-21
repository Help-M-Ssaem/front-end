/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Button from "../button/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostReport } from "../../hooks/report/useReportPost";
import { useNavigate } from "react-router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  isType: string;
}

const options = [
  { id: "option1", label: "부적절한 홍보 채팅", value: "PROMOTIONAL_POST" },
  {
    id: "option2", label: "음란성 또는 청소년에게 부적합한 내용", value: "LEWDNESS",
  },
  { id: "option3", label: "증오 또는 악의적인 콘텐츠", value: "HATRED" },
  { id: "option4", label: "괴롭힘 또는 폭력", value: "TORMENT" },
  { id: "option5", label: "권리 침해", value: "INFRINGEMENT" },
  { id: "option6", label: "기타", value: "ETC" },
];
const ReportModal: React.FC<ModalProps> = ({ isOpen, onClose, onClick, isType }) => {
  const { id } = useParams();
  const reportID = parseInt(id!!);//게시글 id 따오기
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [content, setContent] = useState<string|undefined>();
  const [sendContent, setSendContent] = useState<string|null>(null);
  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
  };
  const createMutation = usePostReport(reportID,isType,selectedOption, sendContent);
  const handleSubmit = () => {
    createMutation.mutate();
    navigate(-1);
  };
  const handleEctChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if(content === undefined){
      setSendContent(null);
    } else {
      setSendContent(content);
    }
  };

  return (
    <div css={modalBackground} onClick={onClose}>
      <div css={modalMain} onClick={(e) => e.stopPropagation()}>
        <div css={modalHeader}>
          <div css={modaltext}>{isType === "MEMBER" && "채팅"}{isType !== "MEMBER" && "게시글"} 신고</div>
        </div>
        <div css={optionBoxCSS}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`optionItem ${
                selectedOption === option.value ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
          {selectedOption === "ETC" && 
          <div css = {textDiv}>
           <textarea
              value={content}
              onChange={handleEctChange}
              css={inputCSS}
              maxLength={60}
            />
            <div css={characterCount}>{content ? `${content.length}/45` : ''}</div>
            </div>
          }
        </div>
        <div css={textBoxCSS}>
          <div css={textCSS}>
            익명성을 악욕한 욕설, 비방, 불건전한 정보 유통 등 상대방을 불쾌하게 하는 행위를 저지를 경우커뮤니티 가이드 라인에 따라 불이익을 받거나 심한 경우 계정이 해지될 수 있습니다.
          </div>
        </div>

        <div css={buttonBoxCSS}>
          <Button onClick={onClose} addCSS={buttonCSS}>
            취소하기
          </Button>
          <Button onClick={handleSubmit} addCSS={exitButtonCSS}>
            신고하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;

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
  height: auto;
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  flex-direction: column;
`;

const modalHeader = css`
  display: flex;
  justify-content: start;
  align-items: center;
  min-height: 5rem;
  border-bottom: 1px solid ${COLOR.GRAY4};
`;

const modaltext = css`
    display: flex;
    flex-direction: column;
    color: ${COLOR.BLACK};
    padding-left: 4rem;
    font-size: ${FONT.SIZE.TITLE1}
    font-weight: ${FONT.WEIGHT.BOLD};
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const textBoxCSS = css`
  padding-top: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
`;

const textCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  width: 30rem;
  overflow-wrap: break-word;
`;

const optionBoxCSS = css`
  padding-left: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  .optionItem {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.7rem 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${COLOR.GRAY5};
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0.7rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${COLOR.WHITE};
      border: 2px solid ${COLOR.GRAY2};
      transform: translate(-50%, -50%);
    }
  }

  .selected {
    &::before {
      border-color: ${COLOR.GRAY2};
      background-color: ${COLOR.BLACK};
    }
  }
`;

const buttonCSS = css`
  margin-right: 0.5rem;
  background: ${COLOR.MAIN};
`;

const exitButtonCSS = css`
  margin-right: 0.5rem;
`;
const textDiv = css`
font-weight: ${FONT.WEIGHT.REGULAR};
color: ${COLOR.GRAY2};
position: relative;
margin-bottom: 1rem;
`;
const inputCSS = css`
  width: 90%;
  height: auto;
  min-heght: 2rem;
  border: 1.5px solid ${COLOR.MAIN4};
  border-radius: 1.2rem;
  padding: 1.7rem;
  font-size: ${FONT.SIZE.BODY};
`;

const characterCount = css`
  bottom: 10%;
  right: 13%;
  position: absolute;
  font-size: ${FONT.SIZE.CAPTION};
`;
