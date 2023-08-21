/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import MatchingComponent from "../Matching";
import { css } from "@emotion/react";
import COLOR from "../../../styles/color";
import FONT from "../../../styles/font";
import { useNavigate } from "react-router-dom";
import Text from "../../../components/text/Text";
import Container from "../../../components/container/Container";
import { RightArrowIcon, SmallArrowIcon } from "../../../assets/CommonIcons";
import Button from "../../button/Button";
import useFetchWorryBoardList from "../../../hooks/worry/UseFetchBoardList";
import MbtiList from "../mapingMatching/MbtiList";
import React from "react";
import SelectBox from "../../Pagination/SelectBox";
import ListPagination from "../../Pagination/ListPagination";

interface WorryProps {
  pathMove: string;
  SaW: string;
  postId: number
}

const WorryList: React.FC<WorryProps> = ({ pathMove, SaW, postId }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [openMbti1, setOpenMbti1] = useState(false);
  const [mbti1, setMbti1] = useState("전체");
  const [openMbti2, setOpenMbti2] = useState(false);
  const [mbti2, setMbti2] = useState("전체");

  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수
  const [page, setPage] = useState(1);
  const worryBoardLists = useFetchWorryBoardList(mbti1, mbti2, pathMove, page-1, postId);
  const limit = 10; //한 페이지당 아이템의 개수
  const totalPage = worryBoardLists ? worryBoardLists.totalSize : 1; //전체 페이지 수

  const handleOpenMbti1 = () => {
    setOpenMbti1(!openMbti1);
    setOpenMbti2(false);
  };
  const handleOpenMbti2 = () => {
    setOpenMbti2(!openMbti2);
    setOpenMbti1(false);
  };

  const handleMbti1Click = (mbti: string) => {
    setOpenMbti1(false);
    setMbti1(mbti);
  };
  const handleMbti2Click = (mbti: string) => {
    setOpenMbti2(false);
    setMbti2(mbti);
  };

  const handleMatchingClick = (id: number) => {
    navigate(`/match/${id}`);
    window.location.reload();
  };
  useEffect(() => {
    setMbti1("전체");
    setMbti2("전체");
  }, []);
  return (
    <>
      <Container addCSS={containerCSS}>
        <div css={buttonBoxCSS}>
          <div css={mbtiBoxCSS}>
            <Text>{SaW}</Text>
            <div css={mbtiSelectBoxCSS1}>
              <div css={mbtiCSS} onClick={handleOpenMbti1}>
                {mbti1} <SmallArrowIcon />
              </div>
              {openMbti1 && <MbtiList onClick={handleMbti1Click} />}
            </div>
            <RightArrowIcon />
            <div css={mbtiSelectBoxCSS2}>
              <div css={mbtiCSS} onClick={handleOpenMbti2}>
                {mbti2} <SmallArrowIcon />
              </div>
              {openMbti2 && <MbtiList onClick={handleMbti2Click} />}
            </div>
          </div>
          {pathMove === "waiting" && token && (
            <Button onClick={() => navigate("/match/create")}>글 쓰기</Button>
          )}
        </div>
        {worryBoardLists &&
          worryBoardLists.result.map((matching) => (
            <MatchingComponent
              matching={matching}
              solve={pathMove}
              key={matching.id}
              onClick={() => handleMatchingClick(matching.id)}
            />
          ))}
        <ListPagination
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          totalPage={totalPage}
        />
        <SelectBox />
      </Container>
    </>
  );
};

export default WorryList;

const containerCSS = css`
  margin-top: 1rem;
`;

const mbtiBoxCSS = css`
  display: flex;
  align-items: center;
`;

const mbtiSelectBoxCSS1 = css`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 0.5rem;
`;

const mbtiSelectBoxCSS2 = css`
  display: flex;
  align-items: center;
  position: relative;
  // margin-left: 0.5rem;
`;

const mbtiCSS = css`
  dispaly: flex;
  align-items: center;

  background: ${COLOR.WHITE};
  border: 1px solid ${COLOR.GRAY4};

  font-weight: ${FONT.WEIGHT.REGULAR};
  font-size: ${FONT.SIZE.BODY};
  color: ${COLOR.GRAY2};

  padding: 0.3rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid ${COLOR.MAIN};
`;
