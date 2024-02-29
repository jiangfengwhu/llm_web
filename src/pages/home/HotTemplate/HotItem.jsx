import React, { useCallback } from "react";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { t2iAddr } from "@/api/common.js";

function HotItemCmp({ id, desc }) {
  const navigate = useNavigate();
  const goSubmit = useCallback(() => {
    navigate("/submit?id=" + id);
  }, [id, navigate]);
  return (
    <div className={"shadow-md rounded-md overflow-hidden"} onClick={goSubmit}>
      <figure>
        <img
          className={`aspect-[3/4] object-cover ${classes["img-ctn"]}`}
          src={`${t2iAddr}/res/template_cover/${id}.jpg`}
        />
      </figure>
      <div className="m-2">{desc}</div>
    </div>
  );
}

const HotItem = React.memo(HotItemCmp);

export default HotItem;
