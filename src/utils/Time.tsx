import { ko } from "date-fns/locale";
import { format } from "date-fns";

const Time = ({ createdAt }: { createdAt: string }) => {
  const date = new Date(createdAt);
  const formattedTime = format(date, "a h:mm", {
    locale: ko,
  });

  return <div>{formattedTime}</div>;
};

export default Time;
