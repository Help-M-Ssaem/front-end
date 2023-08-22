/** @jsxImportSource @emotion/react */
import {  useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { Editor } from "@toast-ui/react-editor";
import { useCreateBoard } from "../../hooks/worry/useCreateWorry";
import { mssaemAxios as axios } from "../../apis/axios";

const categoryList = [
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

const CreateMatchingPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // TODO: mbti는 로그인한 유저의 mbti로 설정
  const [category, setCategory] = useState("ISFJ");
  const [image, setImage] = useState<string[]>([]); // 업로드된 모든 이미지 리스트
  const [uploadImage, setUploadImage] = useState<string[]>([]); // 최종 업로드 이미지 리스트
  const [openCategory, setOpenCategory] = useState(false);
  const navigate = useNavigate();

  const handleCategoryButtonClick = () => {
    setOpenCategory(!openCategory);
  };
  const handleCategoryClick = (category: string) => {
    setOpenCategory(false);
    setCategory(category);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const formData = new FormData();

  const data = {
    title: title,
    content: content,
    targetMbti: category,
  };

  formData.append(
    "postWorryReq",
    new Blob([JSON.stringify(data)], { type: "application/json" }),
  );
  formData.append(
    "image",
    new Blob([JSON.stringify(image)], { type: "application/json" }),
  );
    formData.append(
    "uploadImage",
    new Blob([JSON.stringify(uploadImage)], { type: "application/json" }),
  );

  // 현재 글에 있는 이미지 url 추출
  const extractImageUrls = (content: string) => {
    const imgTagRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
    const matches = content.match(imgTagRegex);
    if (!matches) {
      return [];
    }
    const imageUrls = matches.map((match) => {
      const srcMatch = match.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : null;
    });
    return imageUrls.filter((url) => url !== null);
  };

  const editorRef = useRef<any>(null);
  const handleContentChange = () => {
    setContent(editorRef.current.getInstance().getHTML());
    const content = editorRef.current.getInstance().getHTML();
    const extractedImageUrls = extractImageUrls(content);
    const filteredImageUrls = extractedImageUrls.filter(
      (url) => url !== null,
    ) as string[];
    setUploadImage(filteredImageUrls);
  };

  const createMutation = useCreateBoard(formData);
  const handleSubmit = () => {
    if(title.trim() === ""){
      window.alert("제목은 공백이면 안됩니다.");
      return;
    }else if(title.length < 2){
      window.alert("제목은 2글자 이상입니다.");
      return;
    }
    if(content.trim() !== ""){
      window.alert("내용은 공백이면 안됩니다.");
      return;
    }else if(content.length < 1){
      window.alert("내용은 1글자 이상입니다.");
      return;
    }
    createMutation.mutate();
    navigate(-1);
  };

  const handleUploadImage = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("image", blob);
    const imgUrl = await axios.post("/member/worry-boards/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return imgUrl.data;
  };

  return (
    <div css={editorContainerCSS}>
      <Container addCSS={containerCSS}>
        <div css={titleBoxCSS}>
          <div css={titleCSS}>M쌤 매칭 고민글</div>
        </div>
        <div>
          <div css={contentCSS}>매칭을 원하는 M쌤 유형을 선택해주세요.</div>
          <div css={inputBoxCSS}>
            <input
              css={[inputCSS, pointerCSS]}
              value={category}
              onClick={handleCategoryButtonClick}
            />
            {openCategory && (
              <div css={categoryBoxCSS}>
                {categoryList.map((category) => (
                  <div
                    css={categoryCSS}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
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
          ref={editorRef}
          initialValue=" "
          previewStyle="vertical"
          height="30rem"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          onChange={handleContentChange}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const imgUrl = await handleUploadImage(blob);
              setImage((prev) => [...prev, imgUrl]);
              callback(imgUrl, "image");
            },
          }}
        />
        <div css={buttonBoxCSS}>
          <Button addCSS={buttonCSS} onClick={() => navigate(-1)}>
            취소하기
          </Button>
          <Button onClick={handleSubmit}>글 쓰기</Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateMatchingPage;

const containerCSS = css`
  background: ${COLOR.WHITE};
  pading: 2.5rem;
`;

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
  margin-bottom: 0.8rem;
`;

const categoryBoxCSS = css`
  display: flex;
  flex-wrap: wrap;
  width: 40%;

  border: 1px solid ${COLOR.GRAY4};
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 2rem;
  margin-bottom: 1rem;

  position: absolute;
  left: 0;
  top: 2.8rem;
  background: ${COLOR.WHITE};
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const categoryCSS = css`
  flex-basis: 20%;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  cursor: pointer;
  padding: 0.5rem 0;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  margin: 0.5rem 0;
`;

const inputBoxCSS = css`
  position: relative;
`;

const inputCSS = css`
  width: 100%;
  height: 2.5rem;
  border: 1.5px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
  padding: 0.5rem 0.7rem;
  margin-bottom: 1rem;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const buttonCSS = css`
  margin-right: 0.5rem;
  background: ${COLOR.MAIN};
`;

const pointerCSS = css`
  cursor: pointer;
`;