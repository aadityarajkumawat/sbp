"use server";

import { Main } from "@/components/main";
import { promises as fs } from "fs";
import { ItemList } from "@/components/itemlist";
import { playfair } from "./fonts";
// import { v4 } from "uuid";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/public/ratechart1.json",
    "utf-8"
  );
  const data = JSON.parse(file);

  // const categories = data.categories;

  // for (let cate of categories) {
  //   const items = cate.items;
  //   for (let item of items) {
  //     item.id = v4();
  //     item.description = "Some description about the item";
  //   }
  // }

  // fs.writeFile(process.cwd() + "/public/ratechart1.json", JSON.stringify(data));

  return (
    <main className="w-full relative flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center py-3 text-zinc-700 h-[120px]">
        <h1
          className={
            "underline text-3xl font-medium" + " " + playfair.className
          }
        >
          Sunshine Beauty Salon
        </h1>
        <p className="text-xs">Where Beauty Meets Elegance</p>
        <i className="text-xs">Since 2002</i>
      </div>

      <ItemList items={data.categories} />
    </main>
  );
}
