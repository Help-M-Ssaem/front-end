import Container from "../../components/container/Container";
import Text from "../../components/text/Text";
import { useHotDebateMore } from "../../hooks/main/useHotDebateMore";

const HotDebatePage = () => {
  const { hotDebateMore } = useHotDebateMore(1, 6);

  return (
    <>
      <Text>HOT 게시글</Text>
      <Container></Container>
    </>
  );
};

export default HotDebatePage;
