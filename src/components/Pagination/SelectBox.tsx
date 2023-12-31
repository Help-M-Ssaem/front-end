/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SetStateAction, useState } from "react";
import { SmallArrowIcon } from "../../assets/CommonIcons";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "../../hooks/keywords/usePostSearchWord";
import { useNavigate } from "react-router-dom";

interface SelectBoxProps {
  boardName: String;
  setSearchType: (searchType: number) => void;
}

const selectList = ["제목+내용", "제목", "내용", "글쓴이"];

const SelectBox: React.FC<SelectBoxProps> = ({ boardName, setSearchType }) => {
  const first = selectList[0];
  const navigate = useNavigate();
  const [option, setOption] = useState(first);
  const [open, setOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const search = useSearch(searchWord);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0); // 초기값 설정

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOption = (index: number, selectedOption: string) => {
    setSelectedOptionIndex(index);
    setOption(selectedOption);
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSearch = () => {
    setSearchType(selectedOptionIndex);
    search.mutate();
    if (searchWord.length > 0) {
      if (boardName === "mbtiboard") {
        // navigate(`/search/result?query=${searchWord}`);
        navigate(
          `/search/moreBoard?searchType=${selectedOptionIndex}&query=${searchWord}`,
        );
      } else if (boardName === "discussion") {
        navigate(
          `/search/moreDebate?searchType=${selectedOptionIndex}&query=${searchWord}`,
        );
      } else if (boardName === "matching") {
        navigate(
          `/search/moreMatching?searchType=${selectedOptionIndex}&query=${searchWord}`,
        );
      }
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div css={bottomCSS}>
      <div css={WraperCSS}>
        <div css={selectCSS} onClick={handleOpen}>
          <div css={selectedCSS}>{option}</div>
          <SmallArrowIcon />
        </div>
        {open && (
          <div css={optionsCSS}>
            {selectList.map((item, index) => (
              <div
                css={optionCSS}
                onClick={() => handleOption(index, item)}
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <div css={inputWrapperCSS}>
        <input
          css={inputCSS}
          type="text"
          value={searchWord}
          onChange={handleInputChange}
          placeholder="검색어를 입력해주세요"
          onKeyDown={handleOnKeyPress}
        />
        {searchWord.length === 0 && <FaSearch css={searchIconCSS} />}
        {searchWord.length > 0 && (
          <div css={clearIconCSS} onClick={() => setSearchWord("")}>
            &times;
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectBox;

const bottomCSS = css`
  display: flex;
  padding-top: 1rem;
  justify-content: center;
`;

const WraperCSS = css`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: ${FONT.SIZE.TITLE3};
`;
const selectCSS = css`
  width: 6rem;
  height: 2.3rem;
  border: 0.1rem solid ${COLOR.GRAY4};
  border-radius: 0.3rem;
  color: ${COLOR.GRAY2};
  background-color: #ffffff;
  padding: 0.3rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const selectedCSS = css`
  flex: 1;
  padding-right: 0.3rem;
`;

const optionsCSS = css`
  width: 6rem;
`;
const optionCSS = css`
  background-color: #ffffff;
  box-sizing: border-box;
  color: ${COLOR.GRAY2};
  border-radius: 0.3rem;
  padding: 0.1rem;
  font-size: ${FONT.SIZE.TITLE3};
`;

const inputCSS = css`
  border: 0.1rem solid ${COLOR.GRAY4};
  color: ${COLOR.GRAY2};
  border-radius: 0.3rem;
  width: 17rem;
  height: 2.3rem;
  font-size: ${FONT.SIZE.TITLE3};
  padding-left: 0.5rem;
  background-image: none;

  ::placeholder {
    color: ${COLOR.GRAY2};
    padding-left: 0.5rem;
  }
`;

const inputWrapperCSS = css`
  position: relative;
  width: 17rem;
  height: 3rem;
`;

const searchIconCSS = css`
  position: absolute;
  top: 0.7rem;
  right: 0.5rem;
  margin-left: 0.5rem;
  pointer-events: none;
  color: ${COLOR.GRAY3};
`;

const clearIconCSS = css`
  position: absolute;
  color: ${COLOR.GRAY3};
  top: -0.2rem;
  font-size: 2rem;
  right: 0.5rem;
  cursor: pointer;
`;
