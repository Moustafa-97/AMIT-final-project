import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function PageLayout(props: Props) {
  return <div className=" w-[90%] m-auto font-[playfair]">{props.children}</div>;
}
