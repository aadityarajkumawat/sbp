"use client";

import { useState } from "react";
import { ItemList } from "./itemlist";

interface MainProps {
  data: any;
}

export function Main(props: MainProps) {
  const [chartOpen, setChartOpen] = useState(true);

  return <>{chartOpen ? <ItemList items={props.data} /> : <div></div>}</>;
}
