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
import { useChatContext } from "../../hooks/chatting/ChatProvider";
import { useChatExist } from "../../hooks/worry/chatting/useChatExist";

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

  const deleteMutation = useDeleteBoard(Number(id));
  const handleMatchingDelete = () => {
    deleteMutation.mutate();
    navigate(-1);
  };

  const { connect } = useChatContext();
  const chatRoomId = worryBoard && worryBoard.chatRoomId;

  const handleStartChatting = () => {
    navigate(`/chatting`);
    connect(chatRoomId!!);
  };

  const { chatExist } = useChatExist(Number(id));
  console.log(chatExist);

  return (
    <>
      {worryBoard && (
        <Container addCSS={containerCSS}>
          {worryBoard.isEditAllowed && (
            <div css={buttonBoxCSS}>
              <Button
                onClick={() => navigate(`/match/${id}/update`)}
                addCSS={updateButtonCSS}
              >
                수정
              </Button>
              <Button onClick={handleDeleteOpen}>삭제</Button>
            </div>
          )}
          <div css={detailCSS}>
            <div css={detailHeaderCSS}>
              <MatchingProfile
                image={worryBoard.memberSimpleInfo.profileImgUrl}
                name={worryBoard.memberSimpleInfo.nickName}
                memberMbti={worryBoard.memberSimpleInfo.mbti}
                targetMbti={worryBoard.targetMbti}
              />
              <div css={dateBoxCSS}>
                <div css={dateCSS}>조회수 {worryBoard.hits}회</div>
                <div css={dateCSS}>|</div>
                <div css={dateCSS}>{worryBoard.createdAt}</div>
              </div>
            </div>
            <div css={titleCSS}>{worryBoard.title}</div>
            <div
              css={contentCSS}
              dangerouslySetInnerHTML={{ __html: worryBoard.content }}
            />
             <div css={startButtonBoxCSS}>
              {(worryBoard.isChatAllowed && chatExist) ? (
                <Button onClick={handleStartChatting}>채팅 시작</Button>) : (
                  !(worryBoard.isEditAllowed) &&
                  <Button disabled={true}>다른 사용자와 채팅 중입니다.</Button>)
              }
              </div>
          </div>
          {isDeleteModalOpen && (
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={handleDeleteClose}
              onClick={handleMatchingDelete}
            />
          )}
        </Container>
      )}

      <WorryList pathMove={"waiting"} SaW={"M쌤 매칭을 기다리는 고민"} postId={Number(id)}/>
      <WorryList pathMove={"solved"} SaW={"해결 완료된 고민"} postId={Number(id)}/>
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
  margin-left: 0.5rem;
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
const dateBoxCSS = css`
  display: flex;
`;