import { ItemList } from "@/components/itemlist";
import { promises as fs } from "fs";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/public/ratechart.json",
    "utf-8"
  );
  const data = JSON.parse(file);

  return (
    <main className="w-full">
      <div className="flex flex-col justify-center items-center py-5 text-zinc-700">
        <h1 className="underline text-2xl font-medium">
          Sunshine Beauty Salon
        </h1>
        <p className="text-base">Where Beauty Meets Elegance</p>
        <p className="text-xs">Since 2002</p>
      </div>

      <ItemList items={data.categories} />
    </main>
  );
}
