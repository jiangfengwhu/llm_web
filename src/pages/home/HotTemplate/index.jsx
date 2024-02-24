import HotItem from "./HotItem.jsx";
import { memo } from "react";

function HotTemplateBlockCmp({ data }) {
  return (
    <div className={"grid grid-cols-2 gap-2 ml-2 mr-2"}>
      {data.map((ele) => {
        return <HotItem key={ele} />;
      })}
    </div>
  );
}

const HotTemplateBlock = memo(HotTemplateBlockCmp);
export default HotTemplateBlock;
