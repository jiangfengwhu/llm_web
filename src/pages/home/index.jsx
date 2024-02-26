import React, { useCallback, useEffect, useMemo, useState } from "react";
import HotTemplateBlock from "./HotTemplate/index.jsx";
import { FloatingBubble } from "antd-mobile";
import { PicturesOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { getTemplates } from "../../api/t2i.js";

const Home = React.memo(function HomeCmp() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const goTakePicture = useCallback(() => {
    navigate("/take-picture");
  }, [navigate]);
  useEffect(() => {
    getTemplates().then((data) => {
      setData(data?.data ?? []);
    });
  }, []);
  const bubbleStyle = useMemo(() => {
    return {
      "--initial-position-bottom": "24px",
      "--initial-position-right": "24px",
      "--edge-distance": "24px",
      "--background": "green",
    };
  }, []);
  return (
    <div className={"mt-2"}>
      <HotTemplateBlock data={data} />
      {/*<InfiniteScroll loadMore={loadMore} hasMore={hasMore} />*/}
      <FloatingBubble
        axis="xy"
        magnetic="x"
        style={bubbleStyle}
        onClick={goTakePicture}
      >
        <PicturesOutline fontSize={28} />
      </FloatingBubble>
    </div>
  );
});
export default Home;
