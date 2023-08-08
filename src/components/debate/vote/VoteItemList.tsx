/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import VoteItem from "./VoteItem";
import { Option } from "../../../interfaces/debate";

interface VoteItemListProps {
<<<<<<< HEAD
  options: Option[];
  debateId: number;
}

const VoteItemList = ({ options, debateId }: VoteItemListProps) => {
  return (
    <div css={imageContentCSS}>
      {options.map((data: Option, index: number) => {
        return (
          <VoteItem
            key={data.id}
            id={data.id}
            content={data.content}
            imgUrl={data.imgUrl}
            selectedPercent={data.selectedPercent}
            selected={data.selected}
            PostId={debateId}
          />
        );
      })}
    </div>
  );
};
=======
    options : Option[];
    debateId: number;
}

const VoteItemList = ({ options, debateId }: VoteItemListProps) => {
    return(
        <div css={imageContentCSS}>
            {options.map((data: Option, index:number) => {
            return(
                <VoteItem
                    key={data.id}
                    id={data.id}
                    content={data.content}
                    imgUrl={data.imgUrl}
                    selectedPercent={data.selectedPercent}
                    selected={data.selected}
                    PostId={debateId}
                />
            )
            })}
        </div>
    )
}
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f

export default VoteItemList;

const imageContentCSS = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  justify-content: center;
  place-items: center
  grid-auto-rows: minmax(0, auto);
<<<<<<< HEAD
`;
=======
`;
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
