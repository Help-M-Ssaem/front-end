/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import SearchBar from "../../components/search/SearchBar";

const Search: React.FC = () => {
  const trendingKeywords: string[] = [
    "ESFP",
    "INTP",
    "연애",
    "썸",
    "ISTJ",
    "스트레스",
    "친구",
    "잉뿌삐",
  ];

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
      <SearchBar></SearchBar>
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

const searchContainer = css`
  padding: 60px 170px 0 170px;
  display: flex;
  flex-direction: column;
`;

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

export default Search;
