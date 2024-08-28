import React from "react";
import TablePageItems from "./TablePageItems";
import TableHeader from "./TableHeader";

export default function TablePage() {
  return (
    <>
      <div>
        <TableHeader header="Tables" />
      </div>
      <div>
        <TablePageItems />
      </div>
    </>
  );
}
