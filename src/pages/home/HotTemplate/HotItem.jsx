import React, { useCallback } from "react";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";

function HotItemCmp({ img, desc }) {
  const navigate = useNavigate();
  const goSubmit = useCallback(() => {
    navigate("/submit");
  }, [navigate]);
  return (
    <div className={"shadow-md rounded-md overflow-hidden"} onClick={goSubmit}>
      <figure>
        <img
          className={`aspect-[4/3] object-cover ${classes["img-ctn"]}`}
          src={img}
        />
      </figure>
      <div className="m-2">{desc}</div>
    </div>
  );
}

const HotItem = React.memo(HotItemCmp);

export default HotItem;
