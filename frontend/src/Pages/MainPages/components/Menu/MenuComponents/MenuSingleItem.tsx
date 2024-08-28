import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RedBtn from "../../buttons/RedBtn";
import axios from "axios";
import { userData } from "../../../../../Redux/reduxTools/HandleUserLogin";
import NotLogged from "../../NotLogged/NotLogged";
import PageLayout from "../../../../Layout/PageLayout";
// import { useNavigate } from "react-router-dom";
const menuPic = require("./img/images.png");

interface itemDetails {
  _id: String;
  itemName: String;
  price: Number;
}

interface userOrder {
  itemDetails: itemDetails;
  quantity: Number;
}

export default function MenuSingleItem(props: any) {
  const dispatch = useDispatch();
  const item = props.item;

  const user: string = useSelector(
    (state: any) => state.Login.user.user?.account
  );
  const userState: boolean = useSelector(
    (state: any) => state.Login.user?.state
  );

  const [itemQuantity, setItemQuantity] = useState(1);

  const [userOrder, setUserOrder] = useState<userOrder>({
    itemDetails: {
      _id: "",
      itemName: "",
      price: 0,
    },
    quantity: 0,
  });

  useEffect(() => {
    setUserOrder({
      itemDetails: {
        _id: item._id,
        itemName: item.itemName,
        price: item.price ? item.price : 0,
      },
      quantity: itemQuantity,
    });
  }, [item.itemName, item.price, item._id, itemQuantity]);

  const handleAction = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/cart`, {
        order: userOrder,
      })
      .then((res) => {
        dispatch(userData(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleRemove = (e: any) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/removeItem`, {
        id: e,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  /*
  flex justify-center items-start 
              lg:flex-row flex-col
  */

  return (
    <>
      <PageLayout>
        {userState ? (
          props.item && (
            <div className="lg:w-[80%] w-full h-screen m-auto flex justify-center items-center">
              <div
                className="
               grid grid-cols-5 grid-rows-3 gap-6
              m-auto h-[75%] 
              w-full 
              "
              >
                <div className="w-full m-auto  h-full col-span-2 row-span-2 object-cover">
                  <img
                    className=" w-full h-full object-cover"
                    src={item.image === "" ? menuPic : item.image}
                    alt="foodpic"
                  />
                </div>
                <div className="w-full h-full m-auto col-span-3 row-span-2 ">
                  <header className="flex justify-start items-start flex-col m-auto w-full gap-5 mb-[30px] h-[85%] ">
                    <h2 className=" font-[playfair] text-[80px] leading-[96px] capitalize">
                      {item.itemName}
                    </h2>
                    <p className=" leading-7 text-[20px]">
                      {item.itemDescription}
                    </p>
                  </header>
                </div>
                <div className=" row-span-1 col-span-5 m-auto w-full h-full">
                  {user === "admin" ? (
                    <div className="flex justify-center items-start m-auto w-full h-full lg:flex-row flex-col">
                      <RedBtn
                        name="Edit"
                        isFunction={false}
                        link={`/editItem/${item._id}`}
                      />
                      <RedBtn
                        name="Remove"
                        isFunction={true}
                        function={() => handleRemove(item._id)}
                        link="/Menu"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full m-auto grid grid-cols-4 grid-rows-1  ">
                      <div className="w-full h-full m-auto col-start-3 col-span-1 flex items-center justify-center gap-5">
                        <span className="leading-7 text-[20px] text-center m-auto">Quantity</span>
                        <button
                          className=" bg-[#AD343E] px-2 py-0 border-black border-1 rounded-full flex items-center justify-center m-auto"
                          onClick={() =>
                            itemQuantity <= 1
                              ? setItemQuantity(1)
                              : setItemQuantity(itemQuantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className=" bg-white px-4 py-2 border-black border-2 rounded-full">
                          {itemQuantity}
                        </span>
                        <button
                          className=" bg-[#AD343E] px-2 py-0 border-black border-1 rounded-full flex items-center justify-center m-auto"
                          onClick={() =>
                            itemQuantity >= 100
                              ? setItemQuantity(100)
                              : setItemQuantity(itemQuantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="w-full h-full m-auto flex flex-1 items-center justify-center">
                        <RedBtn
                          name="Add to cart"
                          link="/"
                          isFunction={true}
                          function={handleAction}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        ) : (
          <NotLogged />
        )}
      </PageLayout>
    </>
  );
}
