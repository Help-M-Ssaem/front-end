/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Button from "../button/Button";


interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string; // 주소 공유할 URL
  }

  const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  };
  if (!isOpen) return null;

  return (
    <div css={modalBackground} onClick={onClose}>
      <div css={modalMain} onClick={(e) => e.stopPropagation()}>
        <div css={modalcontentCSS}>
        <input
          css={inputCSS}
          type="text"
          value={url}
          placeholder={url}
          readOnly
        />
        <div  css ={copyButtonCSS}>
        <Button 
            onClick={handleCopyClick}
        >    
            {isCopied ? "복사 완료" : "복사"}
        </Button>
        </div>
        </div> 
      </div>
    </div>
  );
};

export default ShareModal;

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 900;
`;

const modalMain = css`
  position: absolute;
  display: flex;
  width: 35rem;
  height: 5rem;
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
const modalcontentCSS = css`
    position: relative;
    display: flex;
`;

const inputCSS = css`
  border: 1px solid ${COLOR.MAIN};
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.REGULAR};
  padding-left: 1rem;
  border-radius: 1.2rem;
  width: 30rem;
  height: 2.5rem;
  background-image: none;
  position: relative;
`;

const copyButtonCSS = css`
  position: absolute;
  top: 10%;
  right: 0.4rem;
  cursor: pointer;
  flex: 1;
`;
