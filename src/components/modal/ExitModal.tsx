/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Button from "../button/Button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

const ExitModal: React.FC<ModalProps> = ({ isOpen, onClose, onClick }) => {
  if (!isOpen) return null;

  return (
    <div css={modalBackground} onClick={onClose}>
      <div css={modalMain} onClick={(e) => e.stopPropagation()}>
        <div css={modalHeader}>
            <div css={modaltext}>
                <div css={{ marginBottom: "0.4rem"}}>한번 나간 채팅은 복구할수 없습니다</div>
                <div>채팅을 나가시겠습니까?</div>
            </div>
        </div>
        <div css={buttonBoxCSS}>
            <Button onClick={onClose} style={{ marginRight: "0.5rem", background: COLOR.MAIN }}>취소하기</Button>
            <Button onClick={onClick} style={{ marginRight: "0.5rem"}}>채팅 나가기</Button>
        </div>
        </div>
    </div>
  );
};

export default ExitModal;

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
    height: 11rem;
    background-color: ${COLOR.WHITE};
    border-radius: 1rem;
    flex-direction: column;
`;

const modalHeader = css`
  display: flex;
  justify-content: start;
  align-items: center;
  min-height: 7rem;
  border-bottom: 1px solid ${COLOR.GRAY4};
`;
const modaltext = css`
    display: flex;
    flex-direction: column;
    color: ${COLOR.BLACK};
    padding-left: 2rem;
    font-size: ${FONT.SIZE.BODY}
    font-weight: ${FONT.WEIGHT.REGULAR};
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;