import React from "react";
import { useState } from "react";
import db from "../database/db.json";
import Item from "./Item";

const ItemList = () => {
  const [travelData, setTravelData] = useState(db);

  const dataList = travelData.data;
  return (
    <div className="travelItem-container">
      {dataList.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
