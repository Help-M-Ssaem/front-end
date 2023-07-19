/** @jsxImportSource @emotion/react */
import DebateComponent from "../../components/debate/debate";
import Button from "../../components/button/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import FONT from "../../styles/font";

const PostListDebatePage = () => {
  const navigate = useNavigate();

  const mbtiBoardList = [
  {
    id: 0,
    name: "신강희짱",
    profile: "https://i.ibb.co/jJt16M0/image.png",

    mbti: "Infj",
    badge: "비추마스터",

    title: "이중에서 제일 화나는 유형 골라봐",
    content: "조별과제할 때",
    selectedOptions: [
      {textContent:"어쩌구 저쩌구 하는 ENTP",imageContentURL:"https://i.ibb.co/w04Prt6/c1f64245afb2.gif", voteCount: 0},
      {textContent:"어쩌구 저쩌구 하는 ENTP",imageContentURL:"https://i.ibb.co/w04Prt6/c1f64245afb2.gif", voteCount: 0},
      {textContent:"어쩌구 저쩌구 하는 ENTP",imageContentURL:"https://i.ibb.co/w04Prt6/c1f64245afb2.gif", voteCount: 1},
      {textContent:"어쩌구 저쩌구 하는 ENTP",imageContentURL:"https://i.ibb.co/w04Prt6/c1f64245afb2.gif", voteCount: 0},
  ],
    createdAt: "23.06.14",
    selectedOptionIndex: 2,
    totalVotes: 1,
    voted: true,
    comment: 10,
},
{
  id: 1,
  name: "신강희짱",
  profile: "https://i.ibb.co/jJt16M0/image.png",

  mbti: "Infj",
  badge: "비추마스터",

  title: "이중에서 제일 화나는 유형 골라봐",
  content: "조별과제할 때",
  selectedOptions: [
    {textContent:"어쩌구 저쩌구 하는 ENTP",imageContentURL:"https://i.ibb.co/w04Prt6/c1f64245afb2.gif", voteCount: 2},
    {textContent:"어쩌구 저쩌구 하는 ENTP",imageContentURL:"https://i.ibb.co/w04Prt6/c1f64245afb2.gif", voteCount: 2},
    {textContent:"어쩌구 저쩌구 하는 ENTP",imageContentURL:"https://cdn.eyesmag.com/content/uploads/posts/2022/08/08/main-ad65ae47-5a50-456d-a41f-528b63071b7b.jpg", voteCount: 6},
  ],
  createdAt: "23.06.14",
  selectedOptionIndex: -1,
  totalVotes: 10,
  voted: false,
  comment: 10,
},
{
  id: 2,
  name: "신강희짱",
  profile: "https://i.ibb.co/jJt16M0/image.png",

  mbti: "Infj",
  badge: "비추마스터",

  title: "친구가 지각했는데 미안하다고 안한다",
  content: "어떻게 할거임?",
  selectedOptions: [
    {textContent: "손절한다", voteCount: 3},
    {textContent:"봐준다", voteCount: 7},
],
  createdAt: "23.06.14",
  selectedOptionIndex: -1,
  totalVotes: 10,
  voted: false,
  comment: 10,
}];

  return (
    <>
      <div css={headerCSS}>
        <div css={titleBoxCSS}>MBTI 과몰입 토론</div>
        <div css={buttonBoxCSS}>
        <Button onClick={() => navigate("/debate/create")}>글 쓰기</Button>
        </div>
      </div>

      <div>
        {mbtiBoardList.map((debate) => (
          <DebateComponent debate={debate} key={debate.id} />
        ))}
      </div>
    </>
  );
};
export default PostListDebatePage;

const headerCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% + 30rem);
  margin-left: -15rem;
  padding: 0 15rem;
  margin-bottom: 1rem;
`;

const titleBoxCSS = css`
  align-items: center;
  margin: 1rem 0;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
`;


const buttonBoxCSS = css`
  margin-left: auto;
  margin: 1rem 0;
`;
