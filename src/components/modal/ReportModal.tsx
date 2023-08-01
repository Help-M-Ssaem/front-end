/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Button from "../button/Button";
import { useState } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

const options = [
    { id: "option1", label: "부적절한 홍보 채팅", value: "option1_value" },
    { id: "option2", label: "음란성 또는 청소년에게 부적합한 내용", value: "option2_value" },
    { id: "option3", label: "증오 또는 악의적인 콘텐츠", value: "option3_value" },
    { id: "option4", label: "괴롭힘 또는 폭력", value: "option4_value" },
    { id: "option5", label: "권리 침해", value: "option5_value"},
    { id: "option6", label: "기타", value: "option6_value" },
  ];
const ReportModal: React.FC<ModalProps> = ({ isOpen, onClose, onClick }) => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    if (!isOpen) return null;
  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
  };
  const handleModalConfirm = (selectedOptionValue:string) => {
    setSelectedOption(selectedOptionValue);
    //저장한 옵션값 처리할 필요가 있따따따
  };
  return (
    <div css={modalBackground} onClick={onClose}>
      <div css={modalMain} onClick={(e) => e.stopPropagation()}>
        <div css={modalHeader}>
            <div css={modaltext}>채팅 신고</div>
        </div>
        <div css={optionBoxCSS}>
          {/* 여기에 옵션들을 출력합니다. */}
          {options.map((option) => (
            <div 
                key={option.id} 
                className={`optionItem ${selectedOption === option.value ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
        <div css={textBoxCSS}>
        <div css={textCSS}>게시글과 사용자가 신고되면 어쩌고저쩌고 담장자가 검토해서 커뮤니티 가이드라이 어쩌고 저쩌고 뭐시기 계정은 불이익? 받을지도..? 반복적이거나 심각한 위반이 발생한 경우에는 계정이 해지될 수 있습니다.</div>
        </div>
        
        <div css={buttonBoxCSS}>
            <Button onClick={onClose} style={{ marginRight: "0.5rem", background: COLOR.MAIN }}>취소하기</Button>
            <Button onClick={onClick} style={{ marginRight: "0.5rem"}}>신고하기</Button>
        </div>
        </div>
    </div>
  );
};

export default ReportModal;

const modalBackground = css`
  position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
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
    height: 27rem;
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
width:100%;
display: flex;
`;

const textCSS=css`
color: ${COLOR.GRAY2};
font-size: ${FONT.SIZE.FOOTNOTE};
font-weight: ${FONT.WEIGHT.REGULAR};
width: 30rem;
overflow-wrap: break-word
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