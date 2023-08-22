/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Container from "../container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useGetProfile } from "../../hooks/user/useProfile";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import { useParams } from "react-router-dom";

const ActivityList = (props: any) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useMemberInfo();
  const userId = Number(id);
  const myId = user?.id;
  const { profileData } = useGetProfile(userId);

  useEffect(() => {
    if (profileData?.worryBoardHistory) {
    }
  }, [profileData]);

  return (
    <Container addCSS={box3CSS}>
      {/* 받은 평가 / 게시판 활동 */}
      <div css={spaceBetween}>
        {/* 받은평가 */}
        <div>
          <p css={subTitleCSS}>받은평가</p>
          <div css={contentContainer}>
            <div css={contentBox}>
              <p>좋아요</p>
              <p css={contentNumber}>
                {profileData?.evaluationCount?.likeCount}
              </p>
            </div>
            <div css={contentBox}>
              <p>유익해요</p>
              <p css={contentNumber}>
                {profileData?.evaluationCount?.usefulCount}
              </p>
            </div>
            <div css={contentBox}>
              <p>재밌어요</p>
              <p css={contentNumber}>
                {profileData?.evaluationCount?.funCount}
              </p>
            </div>
            <div css={contentBox}>
              <p>성의있어요</p>
              <p css={contentNumber}>
                {profileData?.evaluationCount?.sincereCount}
              </p>
            </div>
            <div css={contentBox}>
              <p>화끈해요</p>
              <p css={contentNumber}>
                {profileData?.evaluationCount?.hotCount}
              </p>
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
              <p css={contentNumber}>{profileData?.boardHistory?.boardCount}</p>
            </div>
            {/* 전체 게시글 */}
            <div css={contentBox}>
              <p>전체 댓글</p>
              <p css={contentNumber}>
                {profileData?.boardHistory?.boardCommentCount}
              </p>
            </div>
            {/* 받은 좋아요 */}
            <div css={contentBox}>
              <p>받은 좋아요</p>
              <p css={contentNumber}>
                {profileData?.boardHistory?.likeAllCount}
              </p>
            </div>
            {/* 누른 좋아요 */}
            <div css={contentBox}>
              <p>누른 좋아요</p>
              <p css={contentNumber}>
                {/* 누른좋아요 데이터는 없음 */}
                {profileData?.boardHistory?.likeAllCount}
              </p>
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
              <p css={contentNumber}>
                {profileData?.discussionHistory?.discussionCount}
              </p>
            </div>
            <div css={contentBox}>
              <p>전체 댓글</p>
              <p css={contentNumber}>
                {profileData?.discussionHistory?.discussionCommentCount}
              </p>
            </div>
            <div css={contentBox}>
              <p>전체 참여자</p>
              <p css={contentNumber}>
                {profileData?.discussionHistory?.participationCount}
              </p>
            </div>
          </div>
        </div>
        {/* M쌤 매칭 */}
        <div>
          <p css={subTitleCSS}>M쌤 매칭</p>
          <div css={contentContainer}>
            <div css={contentBox}>
              <p>전체 고민</p>
              <p css={contentNumber}>
                {profileData?.worryBoardHistory?.worryBoardCount}
              </p>
            </div>

            <div css={contentBox}>
              <p>전체 해결</p>
              <p css={contentNumber}>
                {profileData?.worryBoardHistory?.solvedWorryBoardCount}
              </p>
            </div>

            <div css={contentBox}>
              <p>전체 평가</p>
              <p css={contentNumber}>
                {" "}
                {profileData?.worryBoardHistory?.evaluationCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ActivityList;

const box3CSS = css`
  display: flex;
  flex-direction: column;
  height: 26rem;
  width: 50%;
`;

const subTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.GRAY1};
`;

const spaceBetween = css`
  display: flex;
  margin-right: 17%;
  margin-left: 17%;
  justify-content: space-between;
  // justify-content: space-around;
`;
const spaceBetweenWithMargin = css`
  display: flex;
  margin-right: 17%;
  margin-left: 17%;
  justify-content: space-between;
  // justify-content: space-around;
  margin-top: 2.8125rem;
`;

const contentContainer = css`
  margin: 1.25rem 0;
  display: flex;
  flex-direction: column;
  row-gap: 0.625rem;
`;

const contentBox = css`
  display: flex;
  justify-content: space-between;
  width: 7.1875rem;
`;

const contentNumber = css`
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
`;
