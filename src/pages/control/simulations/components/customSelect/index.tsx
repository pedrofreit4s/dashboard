import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "phosphor-react";

export interface Item {
  key: string;
  value: string;
}
interface Props {
  label: string;
  id: string;
  isRequired?: boolean;
  defaultValue?: Item;
  select(item: Item): Promise<void> | void;
  items: Item[];
}

export function CustomSelect({ label, id, isRequired, defaultValue, select, items }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [itensToSelect, setItensToSelect] = useState<Item[]>(items);
  const [searchQuery, setSearchQuery] = useState<string>(defaultValue?.value || "");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUserKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    setSearchQuery(defaultValue?.value || "");
  }, [defaultValue]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    if (searchQuery) {
      const filteredItems = items.filter((item) => item.value.toLowerCase().includes(searchQuery.toLowerCase()));
      setItensToSelect(filteredItems);
    } else {
      setItensToSelect(items);
    }
  }, [searchQuery]);

  return (
    <div className="w-full relative">
      <div className="flex flex-col gap-[5px] relative">
        <label htmlFor={id} className="text-simulation-label text-[14px] font-semibold">
          {label} <span className="text-red-600 text-md">{isRequired && "*"}</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          className="w-full border border-simulation-input-border rounded-md h-[44px] px-4 bg-white shadow-simulation-input text-simulation-input-color placeholder:text-simulation-input-placeholder cursor-default"
          value={searchQuery}
          onFocus={() => {
            setIsOpen(true);
            setSearchQuery("");
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <motion.div
          initial={{ rotate: 0 }}
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-[16px] top-11 text-simulation-input-placeholder"
          onClick={() => {
            if (isOpen) {
              inputRef.current?.blur();
            } else {
              inputRef.current?.focus();
            }
          }}
        >
          <CaretDown size={14} weight="bold" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full absolute max-h-[260px] overflow-auto mt-2 bg-white rounded-md shadow-simulation-input border border-black/10 p-4 z-10"
          >
            <ul className="text-simulation-md">
              {itensToSelect.map((item) => (
                <li
                  key={id + "_" + item.key}
                  className="py-1.5 px-3 hover:text-primary hover:bg-simulation-bg/60 font-medium rounded-md cursor-pointer uppercase transition-all"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery(item.value);
                    select(item);
                  }}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
