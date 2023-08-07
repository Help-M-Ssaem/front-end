/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { SearchIcon } from "../../assets/CommonIcons";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "연애",
    "썸",
    "스트레스",
    "친구",
  ]);
  const trendingKeywords: string[] = [
    "ESFP",
    "INTP",
    "ISFP",
    "ISFP",
    "ISFP",
    "ISFP",
    "ISFP",
    "ISFP",
    "ISFP",
    "ISFP",
    "ISFP",
  ];

  const handleSearch = () => {
    if (searchQuery) {
      setSearchHistory((prevHistory) => [searchQuery, ...prevHistory]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const currentDate = new Date();

  function formatDate(date: Date) {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes} 기준`;
  }

  const formattedDate = formatDate(currentDate);

  return (
    <div css={searchContainer}>
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

      <div css={trendingKeywordsContainer}>
        <div css={trendingTitleWrapper}>
          <h2>인기 검색어</h2>
          <span css={timeNow}>{formattedDate}</span>
        </div>

        {trendingKeywords.map((keyword, index) => (
          <div css={trendingKeywordWrapper} key={index}>
            <span css={indexStyle}>{index + 1}</span>
            <span css={trendingKeyword}>{keyword}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const trendingKeywordWrapper = css`
  padding-bottom: 1.25rem;
`;

const indexStyle = css`
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin-right: 1.25rem;
`;

const trendingKeyword = css`
  font-size: 1rem;
  font-weight: 400;
  color: #222;
`;

const trendingTitleWrapper = css`
  display: flex;
  align-items: baseline;
  margin-bottom: 1.875rem;
`;

const historyKeyword = css`
  background-color: #f4efff;
  padding: 0.625rem;
  color: #a7a7a7;
  font-size: 1rem;
  font-weight: 600;
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
  border-bottom: 0.0625rem solid black;
`;

const searchContainer = css`
  padding: 3.75rem 10.625rem 0 10.625rem;
  display: flex;
  flex-direction: column;
`;

const searchInput = css`
  border: none;
  padding: 0.25rem 0.75rem 0.25rem 0;
  font-size: 1.125rem;
  width: 100%;
  &::placeholder {
    color: #d4d3d3;
    font-size: 1.125rem;
    font-weight: 700;
  }
`;

const searchHistoryContainer = css`
  margin-top: 1.25rem;
  h2 {
    font-weight: 700;
    color: #222;
  }
`;

const trendingKeywordsContainer = css`
  margin-top: 4.375rem;
  h2 {
    color: #222;
    font-size: 1.125rem;
    font-weight: 700;
    margin-right: 0.4375rem;
  }
`;

const timeNow = css`
  color: #a7a7a7;
  font-size: 0.75rem;
  font-weight: 400;
`;

const searchIconContainer = css`
  margin-left: auto;
`;

export default SearchBar;
