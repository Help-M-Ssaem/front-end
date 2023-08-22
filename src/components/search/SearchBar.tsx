/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { SearchIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useRecentSearch } from "../../hooks/keywords/useGetRecentSearch";
import { useSearch } from "../../hooks/keywords/usePostSearchWord";

const SearchBar: React.FC = () => {
  const { keywords } = useRecentSearch();
  const [searchWord, setSearchWord] = useState("");
  const search = useSearch(searchWord);
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSearch = () => {
    if(searchWord.trim() !== ""){
    search.mutate();
    navigate(`/search/result?query=${searchWord}`);
  } else{
      window.alert("공백은 검색이 안됩니다.")
    }
  };


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleRecentSearch = (clickedKeyword: string) => {
    setSearchWord(clickedKeyword);
    search.mutate();
    navigate(`/search/result?query=${clickedKeyword}`);
  };

  return (
    <>
      <div css={searchBarContainer}>
        <input
          type="text"
          value={searchWord}
          onChange={handleInputChange}
          css={searchInput}
          onKeyUp={handleKeyPress}
        />
        <SearchIcon css={searchIconContainer} onClick={handleSearch} />
      </div>

      <div css={searchHistoryContainer}>
        <h2>이전 검색어</h2>
        <div css={searchHistoryKeyword}>
          {keywords &&
            keywords.map((word, index) => (
              <div
                css={historyKeyword}
                key={index}
                onClick={() => handleRecentSearch(word.keyword)}
              >
                {word.keyword}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const historyKeyword = css`
  background-color: ${COLOR.MAIN};
  padding: 0.8rem;
  color: ${COLOR.WHITE};
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  border-radius: 1.2rem;
  margin: 0.5rem 0.5rem 0 0;
  word-break: break-all;
  cursor: pointer;
`;

const searchHistoryKeyword = css`
  display: flex;
  flex-wrap: wrap;
`;
const searchBarContainer = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLOR.BLACK};
`;

const searchInput = css`
  border: none;
  padding: 0.25rem 0.75rem 0.25rem 0;
  // background-color: ${COLOR.MAIN3};
  font-size: ${FONT.SIZE.TITLE2};
  width: 100%;
  &::placeholder {
    color: ${COLOR.GRAY4};
    font-size: ${FONT.SIZE.TITLE2};
    font-weight: ${FONT.WEIGHT.BOLD};
  }
`;

const searchHistoryContainer = css`
  margin-top: 1.25rem;
  h2 {
    font-weight: ${FONT.WEIGHT.BOLD};
    color: ${COLOR.MAINDARK};
  }
`;

const searchIconContainer = css`
  margin-left: auto;
  cursor: pointer;
`;

export default SearchBar;
