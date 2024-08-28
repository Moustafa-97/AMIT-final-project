import React from "react";

interface Props {
  header: string;
}
export default function TableHeader(props: Props) {
  return (
    <>
      <header className="flex justify-center items-center flex-col m-auto lg:w-[35%] text-center gap-5 mb-[50px]">
        <h2 className=" font-[playfair] text-[100px] leading-[96px]">
          {props.header}
        </h2>
      </header>
    </>
  );
}
