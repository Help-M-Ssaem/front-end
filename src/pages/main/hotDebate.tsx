import Text from "../../components/text/Text";
import PageDebate from "../../components/debate/pageMapingDebate/PageDebate";

const HotDebatePage = () => {
  return (
    <>
      <Text>HOT 토론글</Text>
      <PageDebate
      pathMov = {"hotDiscusstion"}
      />
    </>
  );
};

export default HotDebatePage;
