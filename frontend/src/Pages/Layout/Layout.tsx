import React from "react";
// import Navbar from "../Navbar/Navbar";

export default function Layout(props: any) {
  return (
    <>
      <div className=" min-h-screen">{props.children}</div>
    </>
  );
}
