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
  padding-bottom: 20px;
`;

const indexStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-right: 20px;
`;

const trendingKeyword = css`
  font-size: 16px;
  font-weight: 400;
  color: #222;
`;

const trendingTitleWrapper = css`
  display: flex;
  align-items: baseline;
  margin-bottom: 30px;
`;

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

const searchContainer = css`
  padding: 60px 170px 0 170px;
  display: flex;
  flex-direction: column;
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

const trendingKeywordsContainer = css`
  margin-top: 70px;
  h2 {
    color: #222;
    font-size: 18px;
    font-weight: 700;
    margin-right: 7px;
  }
`;

const timeNow = css`
  color: #a7a7a7;
  font-size: 12px;
  font-weight: 400;
`;

const searchIconContainer = css`
  margin-left: auto;
`;

export default SearchBar;
