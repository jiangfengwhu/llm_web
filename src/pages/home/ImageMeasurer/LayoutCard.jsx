import { columnWidth } from "@pages/home/ImageMeasurer/utils.js";

const LayoutCard = ({ registerChild, style, onClick, item }) => {
  console.log(123123);
  return (
    <div
      ref={element => {
        if (element && registerChild) {
          registerChild(element);
        }
      }}
      style={style}
      onClick={onClick}>
      {/*<div>{item.id}</div>*/}
      {item?.url && (
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
  );
};

export default LayoutCard;
