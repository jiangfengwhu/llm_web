import { memo, useMemo } from "react";
import classes from "./index.module.css";
import { range } from "../../utils/common.js";
function GenButtonCmp({ txt = "提交", loading = false }) {
  const classIndex = useMemo(() => {
    return range(12, 1).map((ele) => {
      return `${classes.circle} ${classes["circle-" + ele]}`;
    });
  }, []);
  return (
    <button className={classes.uiverse} disabled={loading}>
      <div className={classes.wrapper}>
        <span>{loading ? "正在加油啦~" : txt}</span>
        {classIndex.reverse().map((ele) => {
          return <div key={ele} className={ele}></div>;
        })}
      </div>
    </button>
  );
}
const GenButton = memo(GenButtonCmp);
export default GenButton;
