/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import Container from "../../components/container/Container";
import { useState } from "react";
import FONT from "../../styles/font";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";
import { Debate, Option } from "../../interfaces/debate";
import { User } from "../../interfaces/user";
import PlusButton from "../../components/button/plusbutton/PlusButton";

//서버연결 x
const CreateDebatePage = () => {
  //로그인을 통해 작성자의 정보를 받아서 글에 올려줄 것.
  const [userData,setUserData] = useState<User>({
    id: 0,
    nickName: "",
    mbti: "",
    badge: "",
    profileImgUrl: "",
  })
  const [debateData, setDebateData] = useState<Debate>(() => {
    const initialOptions: Option[] = [];
    while (initialOptions.length < 2) {
      initialOptions.push({
        id: initialOptions.length,
        content: "",
        imgUrl: undefined,
        selectedPercent: "",
        selected: false,
      });
    }
    return {
      id: 0,
      title: "",
      content: "",
      participantCount: 0,
      commentCount: 0,
      createdAt: "",
      memberSimpleInfo: userData,
      options: initialOptions,
    };
  });
  
  const navigate = useNavigate();
  const handleInputChange = (
    key: keyof Debate,
    value: string | File |number |undefined|Option[]|null
  ) => {
    setDebateData((prevData) => ({
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
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedOptions = [...debateData.options];
    // updatedOptions[index].title = e.target.value;
    handleInputChange("options", updatedOptions[index].content);
  };

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedOptions = [...debateData.options];
      // updatedOptions[index].imgContent = file;
      handleInputChange("options", updatedOptions[index].imgUrl);
    }
  };
  const handleAddOption = () => {
    if (debateData.options.length < 4) {
      const newIndex = debateData.options.length;
      const updatedOptions = [
        ...debateData.options,
        { 
          id: newIndex,
          content: "",
          imgUrl: undefined,
          imgContent: undefined,
          selectedCount: 0,
          selectedPercent: "",
          selected: false,
        }
      ];
      handleInputChange("options",updatedOptions);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (debateData.options.length > 2) {
      const updatedOptions = [...debateData.options];
      updatedOptions.splice(index, 1);
      handleInputChange("options", updatedOptions);
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
      <Container addCSS={containerCSS}>
        <div css={titleCSS}>과몰입 토론</div>
        <div css={contentCSS}>제목을 입력해주세요.</div>
        <input 
          type="text" 
          value={debateData.title} 
          onChange={handleTitleChange} 
          css={inputCSS}/>
        <div css={imagecontentCSS}>선택지를 선택해주세요. (2~4개)</div>
        <div css={selectuplodGrid}>
          {debateData.options.map((option, index) => (
          <div css={selectuplodGridinContents} key={index}>
            <div css={selectuplodGridinContentsBox}>
              <div css={controlSize}>
                <div css={controlSizetop}>
                {debateData.options.length > 2 && (<Button onClick={() => handleRemoveOption(index)}>
                  X
                  </Button>
                ) }
                </div>

                <label css={uploadLabelCSS}>
                {option.imgUrl ? (<img src={option.imgUrl} alt="Selected" css={imageCSS} />) 
                : (<PlusButton>+</PlusButton>)}
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} css={uploadInputCSS} />
                </label>
                
                <input type="text" value={option.content} onChange={(e) => handleOptionTextChange(index, e)} css={optionInputCSS} />
                  <input
                    type="text"
                    value={option.content}
                    onChange={(e) => handleOptionTextChange(index, e)}
                    css={optionInputCSS}
                  />
                </div>
              </div>
            </div>
          ))}
          {debateData.options.length < 4 
            && (<Button onClick={handleAddOption}>+</Button>)}
        </div>

        <div css={contentCSS}>내용을 입력해주세요. (선택)</div>
        <textarea value={debateData.content} onChange={handleContentChange} css={textareaCSS} />

        <div css={buttonBoxCSS}>
          <Button addCSS={buttonCSS} onClick={() => navigate(-1)}>
            취소하기
          </Button>

          <Button onClick={() => handleSubmit}>글 쓰기</Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateDebatePage;

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

const selectuplodGridinContentsBox = css`
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

const buttonCSS = css`
  margin-right: 0.5rem;
  background: ${COLOR.MAIN};
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
