/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";
import WhiteBtn from "../../buttons/WhiteBtn";
import PageLayout from "../../../../Layout/PageLayout";
const menuPic = require("./img/images.png");

export default function MenuPageItems() {
  const category = useSelector(
    (state: any) => state.category.category
  ).toLowerCase();
  const user: string = useSelector(
    (state: any) => state.Login.user.user?.account
  );

  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/item`)
      .then((res) => setAllItems(res.data?.menuItems))
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
      <PageLayout>
        <div className=" grid lg:grid-cols-3 grid-flow-row grid-cols-1 m-auto mt-5 mb-5 lg:w-full w-[80%] gap-8 ">
          {items &&
            items.map((item: any) => (
              <div key={Math.random()} className="m-auto cursor-pointer w-full">
                <MenuCard
                  id={item._id}
                  Price={item.price}
                  ItemDescription={item.itemDescription}
                  ItemName={item.itemName}
                  image={item.image === "" ? menuPic : item.image}
                />
              </div>
            ))}
        </div>
        {user === "admin" ? (
          <div
            key={Math.random()}
            className="flex items-center justify-center m-auto cursor-pointer mb-4"
          >
            <WhiteBtn name="Add Item" link="/admin/addItem" />
          </div>
        ) : null}
      </PageLayout>
    </>
  );
}
