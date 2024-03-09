import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FloatingBubble, SpinLoading, Empty, Button } from "antd-mobile";
import { PicturesOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { getHome } from "@/api/t2i.js";
import { t2iAddr } from "@/api/common.js";
import { Velustro, Lumiflex, Novatrix, Tranquiluxe } from "uvcanvas";

/**
 * TODO 问题：
 * 1.
 */

// 随机背景
const uvCanvas = [Velustro, Lumiflex, Novatrix, Tranquiluxe];
const CanvasBg =
  uvCanvas[Math.floor(Math.random() * uvCanvas.length)] ?? Lumiflex;

const Home = React.memo(function HomeCmp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // 洗牌算法
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 生成随机位置
      [array[i], array[j]] = [array[j], array[i]]; // 交换当前元素和随机位置的元素
    }
    return array;
  }

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

        // 数据随机打乱
        // const shuffledData = shuffleArray(realData);
        setData(realData);
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

  const onClickItem = item => {
    goSubmit(item);
  };

  return (
    <div className={"w-full h-full"}>
      <div className={"fixed -z-50 w-full h-full box-border"}>
        <CanvasBg style={{ width: "100%", height: "100%" }} />
      </div>

      <div className={"flex justify-center items-center"}>
        {loading ? (
          <LoadingView />
        ) : data?.length > 0 ? (
          <div>
            <div
              className={
                "mt-20 mb-20 text-5xl text-amber-300 text-center font-serif"
              }>
              绘图大师
            </div>
            <div
              className={`max-w-screen-xl xl:columns-6 lg:columns-5 md:columns-3 columns-2`}>
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => onClickItem(item)}
                    className="aspect-square mb-3 w-full">
                    <img
                      src={item.url}
                      alt={item.id}
                      className="w-full object-cover rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
    </div>
  );
});
export default Home;
