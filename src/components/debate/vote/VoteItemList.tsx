/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import VoteItem from "./VoteItem";
import { Option } from "../../../interfaces/debate";
interface VoteItemListProps {
    options : Option[];
    debateId: number;
}

const VoteItemList = ({ options, debateId }: VoteItemListProps) => {
    const optionSelected = options.some((option) => option.selected === true);

    return(
        <div css={imageContentCSS}>
            {options.map((data: Option) => {
            return(
                <VoteItem
                    key={data.id}
                    id={data.id}
                    content={data.content}
                    imgUrl={data.imgUrl}
                    selectedPercent={data.selectedPercent}
                    selected={data.selected}
                    PostId={debateId}
                    optionSelected = {optionSelected}
                />
            )
            })}
        </div>
    )
}

export default VoteItemList;

const imageContentCSS = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  justify-content: center;
  place-items: center
  grid-auto-rows: minmax(0, auto);
`;