/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import { useDeleteBoard } from "../../hooks/worry/useDeleteWorry";
import { useWorryBoard } from "../../hooks/worry/useDetailPost";
import { useParams } from "react-router-dom";
import DeleteModal from "../../components/modal/DeletModal";
import WorryList from "../../components/matching/mapingMatching/WorryList";
import MatchingProfile from "../../components/profile/MatchingProfile";

const DetailMatchingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { worryBoard } = useWorryBoard(Number(id));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteOpen = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };
  const navigate = useNavigate();
  const handleStartChatting = () => {
    if (!worryBoard) {
      return;
    }
    navigate(`/chatting/${worryBoard.worryBoardId}`);
  };
  const deleteMutation = useDeleteBoard(Number(id));
  const handleMatchingDelete = () => {
    deleteMutation.mutate();
    navigate(-1);
  };

  if (!worryBoard) {
    return <div>없따</div>;
  }

  return (
    <>
    <Container addCSS={containerCSS}>
    {worryBoard.isEditAllowed &&
      <div css={buttonBoxCSS}>
        <Button
          onClick={() => navigate(`/match/${id}/update`)}
          addCSS={updateButtonCSS}
        >
          수정
        </Button>
        <Button onClick={handleDeleteOpen}>삭제</Button>
      </div>
    }
      <div css={detailCSS}>
        <div css={detailHeaderCSS}>
          <MatchingProfile
            image={worryBoard.memberSimpleInfo.profileImgUrl}
            name={worryBoard.memberSimpleInfo.nickName}
            memberMbti ={worryBoard.memberSimpleInfo.mbti}
            targetMbti = {worryBoard.targetMbti}
          />
          <div css={dateCSS}>{worryBoard.createdAt}</div>
        </div>
        <div css={titleCSS}>{worryBoard.title}</div>
        <div
          css={contentCSS}
          dangerouslySetInnerHTML={{ __html: worryBoard.content }}
        />
        {/* 고민글 생성 후, 내글/ 해결된 글 제외 시에 해결 있는지 확인 -> 힝 안된다 */}
        {/* {worryBoard.isChatAllowed && */}
        <div css={startButtonBoxCSS} onClick={handleStartChatting}>
          <Button>채팅 시작</Button>
        </div>
        
      </div>
      {isDeleteModalOpen && 
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteClose}
        onClick={handleMatchingDelete}/>
      }
    </Container>

    <WorryList pathMove={"waiting"} SaW={"M쌤 매칭을 기다리는 고민"} />
    <WorryList pathMove={"solved"} SaW={"해결 완료된 고민"} />
    </>
  );
};

export default DetailMatchingPage;

const containerCSS = css`
  margin-top: 1rem;
`;

const detailCSS = css``;

const detailHeaderCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const dateCSS = css`
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.8rem;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  padding-bottom: 3rem;
  line-height: 1.4rem;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const startButtonBoxCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  border-top: 1px solid ${COLOR.MAIN};
  padding-top: 2rem;
`;

const updateButtonCSS = css`
  margin-right: 0.5rem;
  background: ${COLOR.MAIN};
`;


