/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import { useSelector } from "react-redux";
import WhiteBtn from "../../components/buttons/WhiteBtn";
const menuPic = require("./img/images.png");

export default function TablePageItems() {
  const category = useSelector(
    (state: any) => state.category.category
  ).toLowerCase();
  const user: string = useSelector(
    (state: any) => state.Login.user.user?.account
  );

  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/table`)
      .then((res) => setAllItems(res.data.tableItems))
      .catch((err) => console.log(err));
  }, []);
  

  const items = allItems.filter((item: any) => {
    if (category === "all") {
      return allItems;
    } else {
      return item.category === category;
    }
  });

  return (
    <>
      <div className=" flex items-center justify-center flex-wrap m-auto mt-5 mb-5 lg:w-[80%] w-full gap-8 ">
        {items &&
          items.map((item: any) => (
            <div key={Math.random()} className="m-auto cursor-pointer">
              <TableCard
                id={item._id}
                Price={item.price}
                ItemDescription={item.itemDescription}
                ItemName={item.itemName}
                image={item.image === "" ? menuPic : item.image}
              />
            </div>
          ))}
        {user === "admin" ? (
          <div key={Math.random()} className=" m-auto cursor-pointer">
            <WhiteBtn name="Add Table" link="/admin/addTable" />
          </div>
        ) : null}
      </div>
    </>
  );
}
