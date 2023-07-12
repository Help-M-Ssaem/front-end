/** @jsxImportSource @emotion/react */
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import BoardComponent from "../../components/board/Board";
import { useNavigate } from "react-router";
import { css } from "@emotion/react";

const FreeBoardPage = () => {
  // dummy data 서버 완료 후 변경
  const freeBoardList = [
    {
      id: 1,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
      comment: 4,
    },
    {
      id: 2,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
      comment: 4,
    },
    {
      id: 3,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
      comment: 4,
    },
    {
      id: 4,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
      comment: 4,
    },
  ];

  const navigate = useNavigate();

  return (
    <Container>
      <div css={buttonBoxCSS}>
        <Button text="글 쓰기" onClick={() => navigate("/board/create")} />
      </div>
      {freeBoardList.map((board) => (
        <BoardComponent board={board} key={board.id} />
      ))}
    </Container>
  );
};

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export default FreeBoardPage;
