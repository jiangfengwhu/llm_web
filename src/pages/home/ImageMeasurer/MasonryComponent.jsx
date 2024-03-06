import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from "react-virtualized";

export const columnWidth = 200;
export const defaultHeight = 250;
export const defaultWidth = columnWidth;
export const keyMapper = (item, index) => index;
// const
const viewportWidth = document.documentElement.clientWidth;
const viewportHeight = document.documentElement.clientHeight;
// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight,
  defaultWidth,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositionerConfig = {
  cellMeasurerCache: cache,
  columnCount: 6,
  columnWidth,
  spacer: 10,
};

const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);
const MasonryComponent = ({ itemsWithSizes, setRef, onClickItem, width }) => {
  const cellRenderer = ({ index, key, parent, style }, onClickItem) => {
    const item = itemsWithSizes?.[index]?.item;
    // const height = columnWidth * (size?.height / size?.width) || defaultHeight;
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div
          style={style}
          onClick={() => onClickItem(itemsWithSizes?.[index]?.item)}>
          {/*<div>{item.id}</div>*/}
          {item.url && (
            <img
              src={item.url}
              alt={item.id}
              style={{
                // height: height, // 高度自定义
                width: columnWidth,
                display: "block",
                borderRadius: 10,
              }}
            />
          )}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <Masonry
      cellCount={itemsWithSizes.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={item => cellRenderer(item, onClickItem)}
      height={viewportHeight}
      width={viewportWidth}
      keyMapper={keyMapper}
      ref={setRef}
    />
  );
};

export default MasonryComponent;
