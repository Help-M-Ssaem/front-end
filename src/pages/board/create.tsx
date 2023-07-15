/** @jsxImportSource @emotion/react */
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import Container from "../../components/container/Container";
import { useState } from "react";
import FONT from "../../styles/font";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";
import { ArrowIcon } from "../../assets/CommonIcons";

const CreateBoardPage = () => {
  const [title, setTitle] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    setOpenCategory(!openCategory);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const categoryList = [
    "전체",
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  return (
    <div css={editorContainerCSS}>
      <Container background="#FFFFFF" style={{ padding: "2.5rem" }}>
        <div css={titleBoxCSS}>
          <div css={titleCSS}>전체 게시판</div>
          <ArrowIcon onClick={handleCategoryClick} />
          {openCategory && (
            <div css={categoryBoxCSS}>
              {categoryList.map((category) => (
                <div css={categoryCSS}>{category}</div>
              ))}
            </div>
          )}
        </div>
        <div css={contentCSS}>제목을 입력해주세요.</div>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          css={inputCSS}
        />
        <div css={contentCSS}>내용을 입력해주세요.</div>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="30rem"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
        />
        <div css={buttonBoxCSS}>
          <Button
            style={{ marginRight: "0.5rem", background: COLOR.MAIN }}
            onClick={() => navigate(-1)}
          >
            취소하기
          </Button>
          <Button onClick={() => navigate(-1)}>글 쓰기</Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateBoardPage;

const editorContainerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 1.5rem 15rem;
`;

const titleBoxCSS = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  margin-right: 0.8rem;
`;

const categoryBoxCSS = css`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  position: absolute;
  left: 0;
  top: 2.5rem;
  background: ${COLOR.WHITE};
  z-index: 2;
`;

const categoryCSS = css`
  flex-basis: 20%;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  margin: 0 0.5rem 0.5rem 0;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  margin-bottom: 0.5rem;
`;

const inputCSS = css`
  width: 100%;
  height: 2.5rem;
  border: 1.5px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
