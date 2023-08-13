/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { SearchIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      setSearchHistory((prevHistory) => [searchQuery, ...prevHistory]);
      navigate(`/search/result?query=${searchQuery}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <>
      <div css={searchBarContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
          css={searchInput}
        />
        <button onClick={handleSearch} css={searchIconContainer}>
          <SearchIcon />
        </button>
      </div>

      <div css={searchHistoryContainer}>
        <h2>이전 검색어</h2>
        <div css={searchHistoryKeyword}>
          {searchHistory.map((query, index) => (
            <div css={historyKeyword} key={index}>
              {query}
            </div>
          ))}
          {/* {searchHistory.length > 0 && (
          <button onClick={clearSearchHistory}>지우기</button>
        )} */}
        </div>
      </div>
    </>
  );
};

const historyKeyword = css`
  background-color: ${COLOR.MAIN4};
  padding: 0.625rem;
  color: ${COLOR.GRAY3};
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  border-radius: 1.875rem;
  margin-right: 0.625rem;
`;

const searchHistoryKeyword = css`
  display: flex;
  margin-top: 0.6875rem;
`;
const searchBarContainer = css`
  display: flex;
  align-items: center;
  border-bottom: 0.0625rem solid ${COLOR.BLACK};
`;

const searchInput = css`
  border: none;
  padding: 0.25rem 0.75rem 0.25rem 0;
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
`;

export default SearchBar;
