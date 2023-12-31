/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import COLOR from "../../styles/color";
import ExitModal from "../modal/ExitModal";
import ReportModal from "../modal/ReportModal";
import { HamburgerIcon } from "../../assets/ChattingIcons";
import { useChatContext } from "../../hooks/chatting/ChatProvider";
import { useEffect, useRef } from "react";
import { useChatRoomDelete } from "../../hooks/chatting/useChatRoomDelete";
import { useRecoilState } from "recoil";
import { activeRoomIdState } from "../../states/chatting";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdState);
  const chatRoomDeleteMutation = useChatRoomDelete(activeRoomId);

  const { disconnect } = useChatContext();

  const handleChattingExit = () => {
    disconnect();
    setIsExitModalOpen(false);
    chatRoomDeleteMutation.mutate();
  };

  const handleMenuToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleReport = () => {
    setIsReportModalOpen(true);
    setIsOpen(false);
  };
  const handleExit = () => {
    setIsExitModalOpen(true);
    setIsOpen(false);
  };
  const handleCloseModal = () => {
    setIsReportModalOpen(false);
    setIsExitModalOpen(false);
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div css={hamburgerMenuCSS} ref={menuRef}>
      <div css={hamburgerIconCSS} onClick={handleMenuToggle}>
        <HamburgerIcon />
      </div>
      {isOpen && (
        <div css={menuItemsCSS} onClick={(e) => e.stopPropagation()}>
          <div css={topCSS} onClick={handleExit}>
            채팅 나가기
          </div>
          <div css={bottomCSS} onClick={handleReport}>
            신고하기
          </div>
        </div>
      )}
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={handleCloseModal}
          onClick={() => {}}
          isType="MEMBER"
        />
      )}

      {/* 채팅 나가기 모달 */}
      {isExitModalOpen && (
        <ExitModal
          isOpen={isExitModalOpen}
          onClose={handleCloseModal}
          onClick={handleChattingExit}
        />
      )}
    </div>
  );
};

export default Hamburger;

const hamburgerMenuCSS = css`
  position: relative;
`;

const hamburgerIconCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const menuItemsCSS = css`
  margin-top: 1rem;
  justify-content: center;
  padding: 1rem;
  width: 8rem;
  height: 5rem;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  border: 1px solid ${COLOR.GRAY4};
  border-radius: 12px;
  display: flex;
  padding: 1.5rem;
  align-items: center;

  color: ${COLOR.GRAY2};
  div:hover {
    color: ${COLOR.BLACK};
  }
`;

const topCSS = css`
  border-bottom: 1px solid ${COLOR.GRAY4};
  padding-bottom: 0.5rem;
  cursor: pointer;
`;

const bottomCSS = css`
  margin-top: 0.5rem;
  cursor: pointer;
`;
