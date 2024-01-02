"use client";

import { useState } from "react";
import { Accordion } from "./accordion";
import { motion } from "framer-motion";
import { NextButton } from "./next";

interface Item {
  name: string;
  image?: string;
  description: string;
  items: {
    id: string;
    name: string;
    price: number;
    description: string;
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
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

  const userDataStr = localStorage.getItem("userData");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;

  const clearItemList = () => {
    setExpanded(null);
    setSelectedItems([]);
  };

  const [showGetDataModal, setShowGetDataModal] = useState(false);

  const getSelectedCount = (i: number) => {
    let count = 0;

    const f = props.items[i];

    for (let item of f.items) {
      if (selectedItems.includes(item.id)) count++;
    }

    return count;
  };

  return (
    <div className="mt-2 text-base">
      {userData && userData.phone && (
        <div className="px-3">
          <div>Welcome, {userData.name}</div>
          <p>Phone: {userData.phone}</p>
        </div>
      )}
      <ul
        className="px-3 pb-32 overflow-y-scroll"
        style={{ height: "calc(100vh - 120px)" }}
      >
        {props.items.map((item: Item, i: number) => (
          <Accordion
            key={i}
            content={
              <>
                {item.items.map((item, i: number) => (
                  <motion.div
                    key={i}
                    variants={{
                      collapsed: { scaleY: 0.5, opacity: 0 },
                      open: { scaleY: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="content-placeholder mb-1"
                  >
                    <button
                      className="w-full"
                      onClick={() =>
                        setSelectedItems((si) =>
                          si.includes(item.id)
                            ? si.filter((i) => i !== item.id)
                            : [...si, item.id]
                        )
                      }
                    >
                      <div className="flex text-sm justify-between items-center border border-zinc-400 rounded-md p-2">
                        <div className="flex justify-start items-center gap-2">
                          <div
                            className={
                              "flex w-6 h-6 border-4 border-violet-300 rounded-full" +
                              (selectedItems.includes(item.id)
                                ? " bg-violet-500"
                                : "")
                            }
                          ></div>
                          <div>
                            {item.name.includes("+") ? (
                              <p>
                                {item.name.split("+")[0]}
                                <sup>+</sup>
                                {item.name.split("+")[1]}
                              </p>
                            ) : (
                              item.name
                            )}
                          </div>
                        </div>
                        <div>Rs.{item.price}</div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </>
            }
            expanded={expanded}
            setExpanded={setExpanded}
            heading={item.name}
            description={item.description}
            selected={getSelectedCount(i)}
            image={item.image}
            i={i}
          />
        ))}
      </ul>
      {showGetDataModal && (
        <div className="absolute w-screen h-screen bg-black/50 top-0 left-0"></div>
      )}
      {!!selectedItems.length && (
        <NextButton
          setShowGetDataModal={setShowGetDataModal}
          showGetDataModal={showGetDataModal}
          selected={selectedItems.length}
          clearItemList={clearItemList}
        />
      )}
    </div>
  );
}
