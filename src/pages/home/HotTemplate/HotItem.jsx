import React, { useCallback, useEffect, useState } from "react";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { getT2IAddr } from "../../../api/t2i.js";

function HotItemCmp({ id, desc }) {
  const navigate = useNavigate();
  const [resAddr, setResAddr] = useState("");
  useEffect(() => {
    getT2IAddr().then((addr) => {
      setResAddr(addr);
    });
  });
  const goSubmit = useCallback(() => {
    navigate("/submit");
  }, [navigate]);
  return (
    <div className={"shadow-md rounded-md overflow-hidden"} onClick={goSubmit}>
      <figure>
        <img
          className={`aspect-[4/3] object-cover ${classes["img-ctn"]}`}
          src={`${resAddr}/res/template_cover/${id}.jpg`}
        />
      </figure>
      <div className="m-2">{desc}</div>
    </div>
  );
}

const HotItem = React.memo(HotItemCmp);

export default HotItem;
