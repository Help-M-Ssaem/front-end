/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { Alarm } from "../../interfaces/alarm";
import { useReadPostAlarm } from "../../hooks/alarm/useReadAlarm";
import { useDeleteAlarm } from "../../hooks/alarm/useDeletAlarm";
import { RedButtonIcons, XButtonIcons } from "../../assets/side/RedButtonIcons";
interface AlarmProps {
  alarm: Alarm;
  // onClick: (id: number) => void;
}

const AlarmComponent = ({ alarm }: AlarmProps) => {
  const markAsReadMutation = useReadPostAlarm(alarm.resourceId);
  const deleteAlarmMutation = useDeleteAlarm(alarm.resourceId);

  const handleReadPost = () => {
    markAsReadMutation.mutate();
  };
  const handleDelete = () => {
    deleteAlarmMutation.mutate();
  };
  const userContent = alarm.content.replace(/\\n/g, "\n");
  const splittedData = userContent.split('\n');
  //데이터 분리
  const title = splittedData[0];
  const content = splittedData[1];
  return (
    <div css={boardBoxCSS}>
      <div css ={haderCSS}>
        <div css={titleCSS}>{title}</div>
        <div css={readDetailCSS}>
          {!alarm.state && <div css={marginRightTopCSS}><RedButtonIcons/></div>}
          {alarm.state && <div css={marginRightTopCSS}><XButtonIcons onClick={handleDelete}/></div>}
        </div>
      </div>
      <div onClick={handleReadPost}>
      <div css={leftCSS}>
        <div css={contentCSS}>{content}</div>
      </div>
      <div css={detailCSS}>
          <div css={marginRightCSS}>{alarm.createdAt}</div>
        </div>
        </div>
    </div>
  );
};

const boardBoxCSS = css`
  display: flex;
  padding: 1.2rem;
  border-radius: 1.2rem;
  border: 1px solid ${COLOR.MAIN};
  cursor: pointer;
  flex-direction: column;
  background: ${COLOR.WHITE};
  margin-top: 0.4rem;
  box-shadow: 0.1rem 0.3rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const haderCSS = css`
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  line-height: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const marginRightCSS = css`
  margin-right: 1rem;
`;

const marginRightTopCSS = css`
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;
const detailCSS = css`
  display: flex;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  justify-content: end;
`;
const readDetailCSS = css`
  display: flex;
`;

export default AlarmComponent;
