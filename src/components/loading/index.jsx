import classes from "./index.module.css";
import { useMemo } from "react";
import { range } from "@/utils/common.js";

function LoadingView() {
  const classIndex = useMemo(() => {
    return range(4, 1).map(ele => {
      return `${classes.side} ${classes["side" + ele]}`;
    });
  }, []);
  return (
    <div className={classes["pyramid-loader"]}>
      <div className={classes.wrapper}>
        {classIndex.map(ele => {
          return <span key={ele} className={ele}></span>;
        })}
        <span className={classes.shadow}></span>
      </div>
    </div>
  );
}
export default LoadingView;
