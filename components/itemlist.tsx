"use client";

import { useState } from "react";
import { Accordion } from "./accordion";
import { motion } from "framer-motion";

interface Item {
  name: string;
  items: {
    name: string;
    price: number;
    items?: {
      name: string;
      price: number;
    };
  }[];
}

interface ItemListProps {
  items: Item[];
}

export function ItemList(props: ItemListProps) {
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <div className="mt-5 text-base relative">
      <ul className="px-3">
        {props.items.map((item: Item, i: number) => (
          <Accordion
            content={
              <>
                {item.items.map((item, i: number) => (
                  <motion.div
                    variants={{
                      collapsed: { scaleY: 0.5, opacity: 0 },
                      open: { scaleY: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="content-placeholder mb-1"
                  >
                    <div className="flex text-sm justify-between items-center border border-zinc-400 rounded-md p-2">
                      <div className="flex justify-start items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded-full w-5 aspect-square"
                        />
                        <div>{item.name}</div>
                      </div>
                      <div>{item.price}</div>
                    </div>
                  </motion.div>
                ))}
              </>
            }
            expanded={expanded}
            setExpanded={setExpanded}
            heading={item.name}
            i={i}
          />
        ))}
      </ul>

      <div className="flex bottom-0 px-5 fixed w-screen bg-violet-400 py-3">
        <button className="w-full text-white">Next</button>
      </div>
    </div>
  );
}
