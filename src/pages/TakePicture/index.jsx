import { memo, useMemo } from "react";
import { AutoCenter, PasscodeInput } from "antd-mobile";

function TakePictureCmp() {
  const cellStyles = useMemo(() => {
    return {
      "--cell-size": "50px",
      "--cell-gap": "10px",
    };
  }, []);
  return (
    <div
      className={"flex flex-col items-center justify-center bg-amber-100 h-svh"}
    >
      <AutoCenter>
        <div className={"text-2xl mb-6"}>请输入取图码</div>
      </AutoCenter>
      <div className={"flex flex-row items-center justify-center"}>
        <PasscodeInput
          seperated
          plain
          style={cellStyles}
          className={"justify-center items-center self-center"}
        />
      </div>
    </div>
  );
}
const TakePicture = memo(TakePictureCmp);
export default TakePicture;
