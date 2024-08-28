import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuCard(props: any) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/Item/${props.id}`)}
        className="m-auto text-center grid grid-cols-1 grid-rows-10 gap-1 w-full h-[50vh] rounded-xl border border-[#DBDFD0] stroke-[100%]"
      >
        <div className=" w-full h-full row-span-7">
          <img
            className="m-auto w-full h-full object-cover rounded-t-xl"
            src={props.image}
            alt="menu"
          />
        </div>
        <p className="m-auto text-[#AD343E] font-bold text-[24px] leading-[30px]">
          ${props.Price}
        </p>
        <p className="m-auto text-[#2C2F24] font-bold text-[20px] leading-[26px]">
          {props.ItemName}
        </p>
        <p className="m-auto text-[#414536]  text-[16px] leading-[24px]">
          {`${
            props.ItemDescription.length >= 15
              ? `${props.ItemDescription.slice(0, 15)}...`
              : props.ItemDescription
          }`}
        </p>
      </div>
    </>
  );
}
