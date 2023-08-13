/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import SearchBar from "../../components/search/SearchBar";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

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
      <SearchBar />
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
  padding: 3.75rem 10.625rem 0 10.625rem;
  display: flex;
  flex-direction: column;
`;

const trendingKeywordWrapper = css`
  padding-bottom: 1.25rem;
`;

const indexStyle = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  color: ${COLOR.MAINDARK};
  margin-right: 1.25rem;
`;

const trendingKeyword = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.MAINDARK};
`;

const trendingTitleWrapper = css`
  display: flex;
  align-items: baseline;
  margin-bottom: 30px;
`;

const trendingKeywordsContainer = css`
  margin-top: 4.375rem;
  h2 {
    color: ${COLOR.MAINDARK};
    font-size: ${FONT.SIZE.TITLE3};
    font-weight: ${FONT.WEIGHT.BOLD};
    margin-right: 0.4375rem;
  }
`;

const timeNow = css`
  color: ${COLOR.GRAY3};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

export default Search;
