import React, { useCallback, useEffect, useMemo, useState } from "react";
import HotTemplateBlock from "./HotTemplate/index.jsx";
import { FloatingBubble, SpinLoading, Empty, Button } from "antd-mobile";
import { PicturesOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { getTemplates } from "@/api/t2i.js";

const Home = React.memo(function HomeCmp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const goTakePicture = useCallback(() => {
    navigate("/take-picture");
  }, [navigate]);

  const loadTemplates = () => {
    setLoading(true);
    getTemplates()
      .then(data => {
        setData(data?.data ?? []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const bubbleStyle = useMemo(() => {
    return {
      "--initial-position-bottom": "24px",
      "--initial-position-right": "24px",
      "--edge-distance": "24px",
      "--background": "green",
    };
  }, []);

  const LoadingView = () => {
    return (
      <div className={"flex h-screen justify-center items-center"}>
        <SpinLoading color="primary" />
      </div>
    );
  };

  const EmptyView = () => {
    return (
      <div className={"flex h-screen justify-center items-center flex-col"}>
        <Empty imageStyle={{ width: 128 }} description="暂无数据" />
        <Button color="default" onClick={loadTemplates}>
          重新加载
        </Button>
      </div>
    );
  };
  return (
    <div className={"mt-2"}>
      {loading ? <LoadingView /> : null}
      {data?.length > 0 ? <HotTemplateBlock data={data} /> : <EmptyView />}
      {/*<InfiniteScroll loadMore={loadMore} hasMore={hasMore} />*/}
      <FloatingBubble
        axis="xy"
        magnetic="x"
        style={bubbleStyle}
        onClick={goTakePicture}>
        <PicturesOutline fontSize={28} />
      </FloatingBubble>
    </div>
  );
});
export default Home;
