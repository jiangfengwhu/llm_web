import { useImperativeHandle, forwardRef, useRef } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from "react-virtualized";
import {
  defaultHeight,
  defaultWidth,
  keyMapper,
  columnWidth,
} from "./utils.js";

const MasonryComponent = forwardRef(({ data, client, onClickItem }, ref) => {
  const setMasonry = useRef(null);
  const viewportWidth =
    client.viewportWidth ?? document.documentElement.clientWidth;
  const viewportHeight =
    client.viewportHeight ?? document.documentElement.clientHeight;
  // Default sizes help Masonry decide how many images to batch-measure
  const cache = new CellMeasurerCache({
    defaultHeight,
    defaultWidth,
    fixedWidth: true,
  });

  // Our masonry layout will use 3 columns with a 10px gutter between
  const cellPositionerConfig = {
    cellMeasurerCache: cache,
    columnCount: Math.floor(viewportWidth / columnWidth),
    columnWidth,
    spacer: 10,
  };

  useImperativeHandle(ref, () => ({
    // 将子组件的实例传递给父组件
    setMasonry: setMasonry.current,
  }));

  const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);
  const cellRenderer = ({ index, key, parent, style }, onClickItem) => {
    const item = data?.[index];
    console.log(item, "item");
    // const { item, size } = itemsWithSizes?.[index];
    // const height = columnWidth * (size?.height / size?.width) || defaultHeight;
    const str = Math.random().toString(36).slice(-6); //随机字符串
    return (
      <CellMeasurer
        cache={cache}
        index={index}
        // key={key}
        key={`${item?.id}-${index}-${str}`}
        parent={parent}>
        {({ registerChild }) => {
          return (
            <div
              ref={element => {
                if (element && registerChild) {
                  registerChild(element);
                }
              }}
              style={style}
              onClick={() => onClickItem(data?.[index]?.item)}>
              {/*<div>{item.id}</div>*/}
              {item?.url && (
                <img
                  src={item.url}
                  alt={item.id}
                  style={{
                    height: defaultHeight, // 高度自定义
                    width: columnWidth,
                    display: "block",
                    borderRadius: 10,
                  }}
                />
              )}
            </div>
          );
        }}
      </CellMeasurer>
    );
  };

  return (
    <Masonry
      className={"bg-amber-100 scroll-bar-hide"}
      cellCount={data.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={item => cellRenderer(item, onClickItem)}
      height={viewportHeight}
      width={viewportWidth}
      keyMapper={keyMapper}
      ref={setMasonry}
    />
  );
});

MasonryComponent.displayName = "MasonryComponent";

export default MasonryComponent;
