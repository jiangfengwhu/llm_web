import { useRef, useImperativeHandle, forwardRef } from "react";
import ImageMeasurer from "react-virtualized-image-measurer";
import MasonryComponent from "./MasonryComponent.jsx";
import { defaultHeight, defaultWidth, keyMapper } from "./utils.js";
const ImageMeasurerComponent = forwardRef(
  ({ data, onClickItem, client }, ref) => {
    const setMasonry = useRef(null);

    // 使用 useImperativeHandle 来定义暴露给父组件的接口
    useImperativeHandle(ref, () => ({
      // 将子组件的实例传递给父组件
      setMasonry: setMasonry.current,
    }));

    return (
      <ImageMeasurer
        items={data}
        image={item => item.url}
        keyMapper={keyMapper}
        onError={(error, item, src) => {
          console.error(
            "Cannot load image",
            src,
            "for item",
            item,
            "error",
            error
          );
        }}
        defaultHeight={defaultHeight}
        defaultWidth={defaultWidth}>
        {({ itemsWithSizes }) => (
          <MasonryComponent
            client={client}
            setRef={setMasonry}
            itemsWithSizes={itemsWithSizes}
            onClickItem={onClickItem}
          />
        )}
      </ImageMeasurer>
    );
  }
);

ImageMeasurerComponent.displayName = "ImageMeasurerComponent";

export default ImageMeasurerComponent;
