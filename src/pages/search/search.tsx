/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import SearchBar from "../../components/search/SearchBar";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { usePopularSearch } from "../../hooks/keywords/useGetPopularSearch";
import { useSearch } from "../../hooks/keywords/usePostSearchWord";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Search: React.FC = () => {
  const { keywordList } = usePopularSearch();
  const [searchWord, setSearchWord] = useState("");
  const search = useSearch(searchWord);
  const navigate = useNavigate();
  const currentDate = new Date();
  const [idx, setIdx] = useState<number>(0);
  function formatDate(date: Date) {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes} 기준`;
  }

  const formattedDate = formatDate(currentDate);
  useEffect(() => {
    const interval = setInterval(() => {
      if (keywordList)
        setIdx((prevIndex) => (prevIndex + 1) % keywordList.length);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [keywordList]);
  const handleSearch = (clickedKeyword: string) => {
    setSearchWord(clickedKeyword);
    search.mutate();
    navigate(`/search/result?query=${clickedKeyword}`);
  };
  return (
    <div css={searchContainer}>
      <SearchBar />
      <div css={trendingKeywordsContainer}>
        <div css={trendingTitleWrapper}>
          <h2>인기 검색어</h2>
          <span css={timeNow}>{formattedDate}</span>
        </div>
        {/* 모션 넣기 */}
        {keywordList &&
          keywordList.map((keyword, index) => (
            <motion.div
              css={[trendingKeywordWrapper, index === idx && recentCSS]}
              key={index}
              onClick={() => handleSearch(keyword.keyword)}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: index === idx ? 1.07 : 1 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              <span css={indexStyle}>{index + 1}</span>
              <span css={trendingKeyword}>{keyword.keyword}</span>
            </motion.div>
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
  margin-bottom: 1.25rem;
  cursor: pointer;
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
  margin-bottom: 1.875rem;
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

const recentCSS = css`
  background: ${COLOR.MAIN4};
`;
export default Search;
