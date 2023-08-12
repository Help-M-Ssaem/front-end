/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Profile from "../../components/profile/Profile";
import Input from "../../components/input/Input";
import { useDeleteBoard } from "../../hooks/worry/useDeleteWorry";
import { useWorryBoard } from "../../hooks/worry/useDetailPost";
import { useParams } from "react-router-dom";
import DeleteModal from "../../components/modal/DeletModal";
import WorryList from "../../components/matching/mapingMatching/WorryList";

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

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 채팅 시작 버튼
  const handleStartChatting = () => {
    navigate(`/chatting`);
  };

  return (
    <>
      <Container addCSS={containerCSS}>
        {worryBoard && (
          <>
            <div css={buttonBoxCSS}>
              {worryBoard.isEditAllowed && (
                <>
                  <Button
                    onClick={() => navigate(`/match/${id}/update`)}
                    addCSS={updateButtonCSS}
                  >
                    수정
                  </Button>
                  <Button onClick={handleDeleteOpen}>삭제</Button>
                </>
              )}
            </div>
            <div css={detailCSS}>
              <div css={detailHeaderCSS}>
                <Profile
                  image={worryBoard.memberSimpleInfo.profileImgUrl}
                  name={worryBoard.memberSimpleInfo.nickName}
                  mbti={worryBoard.memberSimpleInfo.mbti}
                  badge={worryBoard.memberSimpleInfo.badge}
                />
                <div css={dateCSS}>{worryBoard.createdAt}</div>
              </div>
              <div css={titleCSS}>{worryBoard.title}</div>
              <div
                css={contentCSS}
                dangerouslySetInnerHTML={{ __html: worryBoard.content }}
              />
              {/* 이미지 찍는걸 어케하지 */}
              <div css={startButtonBoxCSS} onClick={handleStartChatting}>
                <Button>채팅 시작</Button>
              </div>
            </div>
          </>
        )}
        <div css={commentTextCSS}>댓글 쓰기</div>
        <hr css={hrCSS} />
        <form css={submitButtonBoxCSS} onSubmit={handleCommentSubmit}>
          <Input />
          <Button addCSS={submitButtonCSS}>등록</Button>
        </form>
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeleteClose}
            onClick={handleMatchingDelete}
          />
        )}
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

const detailCSS = css`
  padding: 1.2rem 0;
  border-top: 1px solid ${COLOR.MAIN};
  border-bottom: 1px solid ${COLOR.MAIN};
`;

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
`;

const startButtonBoxCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  border-top: 1px solid ${COLOR.MAIN};
  padding-top: 2rem;
`;

const commentTextCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  margin-top: 3rem;
`;

const hrCSS = css`
  border: 1px solid ${COLOR.MAIN};
  margin: 1rem 0;
`;

const submitButtonBoxCSS = css`
  display: flex;
`;

const updateButtonCSS = css`
  margin-right: 0.5rem;
  background: ${COLOR.MAIN};
`;

const submitButtonCSS = css`
  margin-left: 0.5rem;
  width: 5rem;
`;
