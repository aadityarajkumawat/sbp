"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface AccordionProps {
  i: number;
  heading: string;
  content: ReactNode;
  expanded: number | null;
  description: string;
  selected: number;
  image?: string;
  setExpanded: Dispatch<SetStateAction<number | null>>;
}

export const Accordion = ({
  i,
  expanded,
  heading,
  setExpanded,
  content,
  image,
  description,
  selected,
}: AccordionProps) => {
  const isOpen = expanded !== null && expanded === i;

  return (
    <>
      <motion.header
        initial={false}
        className={
          "mb-2 border border-violet-400 py-2 text-zinc-700 rounded-md px-3"
        }
        onClick={() => setExpanded(isOpen ? null : i)}
      >
        <div className="flex items-center gap-2">
          {image && (
            <img className="w-16 rounded-md" src={image} alt="category" />
          )}
          <div>
            <div className="flex items-center justify-between">
              <h2 className={isOpen ? " underline" : ""}>{heading}</h2>
              <div className="bg-violet-200 w-5 h-5 rounded-full text-xs flex items-center justify-center text-violet-700">
                {selected}
              </div>
            </div>
            <p className="text-xs ">{description}</p>
          </div>
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: 0.8,
              //   ease: [0.04, 0.62, 0.23, 0.98],
              //   delay: 0.5,
            }}
          >
            {content}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
