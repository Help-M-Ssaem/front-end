/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import BoardComponent from "../board/Board";



const ActivityList = () => {
  return (
        <div css={box3CSS}>
          {/* 받은 평가 / 게시판 활동 */}
          <div css={spaceBetween}>
            {/* 받은평가 */}
            <div>
              <p css={subTitleCSS}>받은평가</p>
              <div css={contentContainer}>
                <div css={contentBox}>
                  <p>좋아요</p>
                  <p css={contentNumber}>11</p>
                </div>
                <div css={contentBox}>
                  <p>유익해요</p>
                  <p css={contentNumber}>13</p>
                </div>
                <div css={contentBox}>
                  <p>재밌어요</p>
                  <p css={contentNumber}>21</p>
                </div>
                <div css={contentBox}>
                  <p>성의있어요</p>
                  <p css={contentNumber}>11</p>
                </div>
                <div css={contentBox}>
                  <p>화끈해요</p>
                  <p css={contentNumber}>11</p>
                </div>
              </div>
            </div>
            {/* 게시판 활동 */}
            <div>
              <p css={subTitleCSS}>게시판 활동</p>
              <div css={contentContainer}>
                {/* 전체 게시글 */}
                <div css={contentBox}>
                  <p>전체 게시글</p>
                  <p css={contentNumber}>11</p>
                </div>
                {/* 전체 게시글 */}
                <div css={contentBox}>
                  <p>전체 댓글</p>
                  <p css={contentNumber}>13</p>
                </div>
                {/* 받은 좋아요 */}
                <div css={contentBox}>
                  <p>받은 좋아요</p>
                  <p css={contentNumber}>21</p>
                </div>
                {/* 누른 좋아요 */}
                <div css={contentBox}>
                  <p>누른 좋아요</p>
                  <p css={contentNumber}>11</p>
                </div>
              </div>
            </div>
          </div>
          {/* 과몰입토론 활동 / M쌤 매칭 */}
          <div css={spaceBetweenWithMargin}>
            {/* 과몰입토론 활동  */}
            <div>
              <p css={subTitleCSS}>과몰입토론 활동</p>
              <div css={contentContainer}>
                <div css={contentBox}>
                  <p>전체 토론글</p>
                  <p css={contentNumber}>11</p>
                </div>
                <div css={contentBox}>
                  <p>전체 댓글</p>
                  <p css={contentNumber}>13</p>
                </div>
                <div css={contentBox}>
                  <p>전체 참여자</p>
                  <p css={contentNumber}>21</p>
                </div>
              </div>
            </div>
            {/* M쌤 매칭 */}
            <div>
              <p css={subTitleCSS}>M쌤 매칭</p>
              <div css={contentContainer}>
                <div css={contentBox}>
                  <p>전체 고민</p>
                  <p css={contentNumber}>11</p>
                </div>

                <div css={contentBox}>
                  <p>전체 해결</p>
                  <p css={contentNumber}>13</p>
                </div>

                <div css={contentBox}>
                  <p>전체 평가</p>
                  <p css={contentNumber}>21</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default ActivityList;


const box3CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  min-width: 532px;
  height: 433px;
  border-radius: 30px;
  margin-right: 46px;
  padding: 39px 93px 39px 67px;
`;

const subTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.GRAY1};
`;

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
`;
const spaceBetweenWithMargin = css`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
`;

const contentContainer = css`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const contentBox = css`
  display: flex;
  justify-content: space-between;
  width: 115px;
`;

const contentNumber = css`
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
`;
