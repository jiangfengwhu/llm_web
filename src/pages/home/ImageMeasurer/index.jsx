import { useRef } from "react";
import ImageMeasurer from "react-virtualized-image-measurer";
import MasonryComponent, {
  defaultHeight,
  defaultWidth,
  keyMapper,
} from "./MasonryComponent.jsx";
const ImageMeasurerComponent = ({ data, onClickItem }) => {
  const setMasonry = useRef(null);
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
          setRef={setMasonry}
          itemsWithSizes={itemsWithSizes}
          onClickItem={onClickItem}
        />
      )}
    </ImageMeasurer>
  );
};

export default ImageMeasurerComponent;
