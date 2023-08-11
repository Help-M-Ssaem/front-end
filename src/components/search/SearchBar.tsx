/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { SearchIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";

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
  background-color: #f4efff;
  padding: 10px;
  color: #a7a7a7;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  margin-right: 10px;
`;

const searchHistoryKeyword = css`
  display: flex;
  margin-top: 11px;
`;
const searchBarContainer = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

const searchInput = css`
  border: none;
  padding: 4px 12px 4px 0;
  font-size: 18px;
  width: 100%;
  &::placeholder {
    color: #d4d3d3;
    font-size: 18px;
    font-weight: 700;
  }
`;

const searchHistoryContainer = css`
  margin-top: 20px;
  h2 {
    font-weight: 700;
    color: #222;
  }
`;

const searchIconContainer = css`
  margin-left: auto;
`;

export default SearchBar;
