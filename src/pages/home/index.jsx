import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
// import HotTemplateBlock from "./HotTemplate/index.jsx";
import { FloatingBubble, SpinLoading, Empty, Button } from "antd-mobile";
import { PicturesOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { getHome } from "@/api/t2i.js";
import ImageMeasurerComponent from "./ImageMeasurer/index.jsx";
import debounce from "lodash/debounce";
import { t2iAddr } from "@/api/common.js";

/**
 * TODO 问题：
 * 1. 首次渲染拿到数据后，组件会有一个加载的过程，这个还没找到去哪里拿，这个时间还挺长的
 * 2. 需要监听下resize，然后更新瀑布流
 */

const Home = React.memo(function HomeCmp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: document.documentElement.clientHeight,
  });
  const imageMeasurerRef = useRef(null);
  const navigate = useNavigate();
  const goSubmit = useCallback(
    item => {
      navigate(`/submit?id=${item?.id}`);
    },
    [navigate]
  );
  const goTakePicture = useCallback(() => {
    navigate("/take-picture");
  }, [navigate]);

  // 加载数据
  const loadTemplates = () => {
    setLoading(true);
    getHome()
      .then(res => {
        const { data } = res ?? {};
        // 填充url
        const realData = data?.map(item => {
          return {
            ...item,
            url: `${t2iAddr}/res/home/${item.url}`,
          };
        });

        setData(realData);

        // TODO 页面布局需要时间，但是目前没找到组件获取这个时间的props，所以先加一个delay
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleResize = debounce(() => {
    // 在这里处理窗口大小变化的逻辑
    setClient({
      viewportWidth: document.documentElement.clientWidth,
      viewportHeight: document.documentElement.clientHeight,
    });
  }, 300); // 设置防抖延迟时间，单位为毫秒

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    // 添加窗口大小变化的事件监听器，并在组件卸载时移除
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    // 重新计算并更新所有单元格的位置
    if (imageMeasurerRef.current?.setMasonry?.recomputeCellPositions) {
      imageMeasurerRef.current.setMasonry.recomputeCellPositions();
    }
  }, [client.viewportWidth]);

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

  const onClickItem = item => {
    goSubmit(item);
  };

  return (
    <div>
      {loading ? <LoadingView /> : null}
      {/*{data?.length > 0 ? <HotTemplateBlock data={data} /> : <EmptyView />}*/}
      {data?.length > 0 ? (
        <ImageMeasurerComponent
          ref={imageMeasurerRef}
          data={data}
          client={client}
          onClickItem={onClickItem}
        />
      ) : (
        <EmptyView />
      )}
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
