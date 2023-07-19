/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import Container from "../../components/container/Container";
import { useState } from "react";
import FONT from "../../styles/font";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";
import { Option, PostData } from "../../interfaces/debate";
import PlusButton from "../../components/debate/plusbutton/PlusButton";

const CreateDebatePage = () => {
  //로그인을 통해 작성자의 정보를 받아서 글에 올려줄 것.
  const [postData, setPostData] = useState<PostData>({
    title: "",
    content: "",
    selectedOptions: [
      { textContent: "", imageContent: undefined ,voteCount: 0,},
      { textContent: "", imageContent: undefined ,voteCount: 0,},
    ],
    selectedOptionIndex: -1,
    totalVotes: 0,
    voted: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (
    key: keyof PostData,
    value: string | File | Option[] | undefined
  ) => {
    setPostData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("title", e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange("content", e.target.value);
  };

  const handleOptionTextChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedOptions = [...postData.selectedOptions];
    updatedOptions[index].textContent = e.target.value;
    handleInputChange("selectedOptions", updatedOptions);
  };

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedOptions = [...postData.selectedOptions];
      updatedOptions[index].imageContent = file;
      handleInputChange("selectedOptions", updatedOptions);
    }
  };

  //항목 추가/삭제
  const handleAddOption = () => {
    if (postData.selectedOptions.length < 4) {
      const updatedOptions = [
        ...postData.selectedOptions,
        { textContent: "", imageContent: undefined, voteCount: 0 },
      ];
      handleInputChange("selectedOptions", updatedOptions);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (postData.selectedOptions.length > 2) {
      const updatedOptions = [...postData.selectedOptions];
      updatedOptions.splice(index, 1);
      handleInputChange("selectedOptions", updatedOptions);
    }
  };

  //제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //데이터 그래서 어떻게함..?
    navigate(-1);
  };
  return (
    <div css={editorContainerCSS}>
      <Container background="#FFFFFF" style={{ padding: "2.5rem" }}>
        <div css={titleCSS}>과몰입 토론</div>
        <div css={contentCSS}>제목을 입력해주세요.</div>
        <input type="text" value={postData.title} onChange={handleTitleChange} css={inputCSS}/>
        <div css={imagecontentCSS}>선택지를 선택해주세요. (2~4개)</div>
        <div css={selectuplodGrid}>
          {postData.selectedOptions.map((option, index) => (
          <div css={selectuplodGridinContents} key={index}>
            <div css={selectuplodGridinContentsBox}>
              <div css={controlSize}>
                <div css={controlSizetop}>
                {postData.selectedOptions.length > 2 && (<Button onClick={() => handleRemoveOption(index)}>
                  X
                  </Button>
                ) }
                </div>

                <label css={uploadLabelCSS}>
                {option.imageContent ? (<img src={URL.createObjectURL(option.imageContent)} alt="Selected" css={imageCSS} />) 
                : (<PlusButton>+</PlusButton>)}
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} css={uploadInputCSS} />
                </label>
                
                <input type="text" value={option.textContent} onChange={(e) => handleOptionTextChange(index, e)} css={optionInputCSS} />

              </div>
            </div>
          </div>
          ))}
          {postData.selectedOptions.length < 4 
          && (<Button onClick={handleAddOption}>+</Button>)}
        </div>

        <div css={contentCSS}>내용을 입력해주세요. (선택)</div>
        <textarea value={postData.content} onChange={handleContentChange} css={textareaCSS} />

        <div css={buttonBoxCSS}>
          <Button style={{ marginRight: "0.5rem", background: COLOR.MAIN }} onClick={() => navigate(-1)}>
            취소하기
          </Button>

          <Button onClick={()=>handleSubmit}>글 쓰기</Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateDebatePage;

const editorContainerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 1.5rem 15rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  margin-bottom: 1rem;
`;

const imagecontentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  margin-bottom: 0.5rem;
`;

const selectuplodGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  justify-content: center;
  place-items: center;
`;

const selectuplodGridinContents = css`
  background-color: ${COLOR.WHITE};
  width: 100%; 
  height: 100%;
  min-height: 18rem;
  border-radius: 1.4rem;
  border: 1.5px solid ${COLOR.GRAY4};
  padding: 0.7rem;
`;

const selectuplodGridinContentsBox= css`
  width: 100%;
  height: 100%;
  minheight: 10rem;
  border-radius: 1.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
`;
const uploadLabelCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  // border: 1.5px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
`;
const uploadInputCSS = css`
  display: none;
`;
const imageCSS = css`
  width: 11rem; 
  height: auto; 
  max-height: 9rem;
  object-fit: contain; 
`;
const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  margin: 1.5rem 0 0.5rem 0;
`;

const inputCSS = css`
  width: 100%;
  height: 2.5rem;
  border: 1.5px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const optionInputCSS = css`
  width: 100%;
  height: 2.5rem;
  border: 1.5px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

const textareaCSS = css`
  width: 100%;
  height: 10rem;
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

const controlSize = css`
flex-direction: column;

align-items: center;
justify-content: center;
width: auto;
height: 70%;
`;

const controlSizetop = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;