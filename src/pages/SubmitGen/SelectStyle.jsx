import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Image, Popup } from "antd-mobile";

function SelectStyleCmp({ list = [] }, ref) {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  const open = useCallback(() => {
    setVisible(true);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
  }, []);
  return (
    <Popup
      visible={visible}
      onMaskClick={close}
      onClose={close}
      bodyStyle={{ height: "40vh" }}
    >
      <div className={"grid grid-cols-3 gap-2 p-2"}>
        {list.map((ele) => {
          return <Image key={ele} src={ele} lazy={true} fit={"cover"} />;
        })}
      </div>
    </Popup>
  );
}
const SelectStyle = memo(forwardRef(SelectStyleCmp));
export default SelectStyle;
