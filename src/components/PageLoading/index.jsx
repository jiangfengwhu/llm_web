import { SpinLoading } from "antd-mobile";
import React from "react";

const LoadingViewCmp = () => {
  return (
    <div className={"flex h-screen justify-center items-center"}>
      <SpinLoading color="primary" />
    </div>
  );
};

const PageLoading = React.memo(LoadingViewCmp);
export default PageLoading;
