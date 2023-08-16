/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useState } from "react";
import AlarmComponent from "../../components/alarm/Alarm";
import { useReadALLAlarm } from "../../hooks/alarm/useReadALLAlarm";
import { useDeleteAllAlarm } from "../../hooks/alarm/useDeletAllAlarm";
import ListPagination from "../../components/Pagination/ListPagination";
import useAlarmPaging from "../../hooks/alarm/usePageAlarm";

const AlarmPage = () => {
  const allReadMutation = useReadALLAlarm();
  const allDeleteAlarmMutation = useDeleteAllAlarm();
  const [page, setPage] = useState(1);
  const alarmList = useAlarmPaging(page-1)
  const limit = 10;
  const totalPage = alarmList ? alarmList.totalSize : 1;
  const [blockNum, setBlockNum] = useState(0);

  const handleAllReadPost = () => {
    allReadMutation.mutate();
  };
  const handleDelete = () => {
    allDeleteAlarmMutation.mutate();
  };
  return (
   <Container>
    <div css={AlarmHeaderBoxCSS}>
      <div>전체알림 </div>
      <div css={AlarmControlCSS}>
        <div css={ReadCSS}
          onClick={handleAllReadPost}
        >전체 읽음</div>
        <>|</>
        <div css={DeleteCSS}
          onClick={handleDelete}
        >전체 삭제</div>
      </div>
    </div>
    <div>
      {alarmList &&
        alarmList.result.map((alarm) => (
          <AlarmComponent
            alarm={alarm}
          key={alarm.resourceId}
          
        />
        ))}
        <ListPagination
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          totalPage={totalPage}
        />
    </div>
   </Container>
  );
};

export default AlarmPage;


const AlarmHeaderBoxCSS = css`
  display: flex;
  justify-content: space-between;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const AlarmControlCSS = css`
  display: flex;
`;

const ReadCSS = css`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const DeleteCSS = css`
  margin-left: 0.5rem;
  cursor: pointer;
`;


