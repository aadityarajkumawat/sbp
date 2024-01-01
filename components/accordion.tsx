"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AccordionProps {
  i: number;
  heading: string;
  content: ReactNode;
  expanded: number | false;
  setExpanded: (i: number | false) => void;
}

export const Accordion = ({
  i,
  expanded,
  heading,
  setExpanded,
  content,
}: AccordionProps) => {
  const isOpen = i === expanded;

  return (
    <>
      <motion.header
        initial={false}
        className={
          "mb-2 border border-violet-400 py-2 text-zinc-700 rounded-md px-5" +
          (isOpen ? " underline" : "")
        }
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        {heading}
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
