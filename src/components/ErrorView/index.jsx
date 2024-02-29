import { Button, Empty } from "antd-mobile";
import React from "react";

function ErrorViewCmp({ onRetry }) {
  return (
    <div className={"flex flex-col items-center mt-20"}>
      <Empty
        status={"disconnected"}
        description={"罢工啦"}
        fullPage={true}
      ></Empty>
      <Button onClick={onRetry}>点击重试</Button>
    </div>
  );
}

const ErrorView = React.memo(ErrorViewCmp);
export default ErrorView;
