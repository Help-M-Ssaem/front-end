/** @jsxImportSource @emotion/react */
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import Container from "../../components/container/Container";
import { useEffect, useRef, useState } from "react";
import FONT from "../../styles/font";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";
import { ArrowIcon } from "../../assets/CommonIcons";
import { useUpdateBoard } from "../../hooks/board/useUpdateBoard";
import { useParams } from "react-router-dom";
import { useBoardDetail } from "../../hooks/board/useBoardDetail";
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

const UpdateBoardPage = () => {
  const { id } = useParams();
  const { board } = useBoardDetail(parseInt(id!!));

  const [title, setTitle] = useState(board!!.title);
  const [content, setContent] = useState(board!!.content);
  const [category, setCategory] = useState(board!!.boardMbti);

  // 현재 글에 있는 이미지 url 추출
  const [image, setImage] = useState<string[]>([]);
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
    mbti: category,
  };
  formData.append(
    "patchBoardReq",
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

  const extractedImageUrls = extractImageUrls(content);
  const filteredImageUrls = extractedImageUrls.filter(
    (url) => url !== null,
  ) as string[];
  useEffect(() => {
    setImage(filteredImageUrls);
  }, []);

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
  const updateMutation = useUpdateBoard(formData, board!!.boardId);
  const handleSubmit = () => {
    updateMutation.mutate();
    navigate(-1);
  };

  const handleUploadImage = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("image", blob);
    const imgUrl = await axios.post("/member/boards/files", formData, {
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
          <div css={titleCSS}>{category} 게시판</div>
          <ArrowIcon onClick={handleCategoryButtonClick} />
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
          initialValue={content}
          previewStyle="vertical"
          height="30rem"
          initialEditType="wysiwyg"
          onChange={handleContentChange}
          useCommandShortcut={true}
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

export default UpdateBoardPage;

const containerCSS = css`
  background: ${COLOR.WHITE};
  padding: 2.5rem;
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
  margin-right: 0.8rem;
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
  top: 2.5rem;
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
  margin-bottom: 0.5rem;
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
