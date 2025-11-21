"use client";

import { Button, Input } from "@heroui/react";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import NewDeckModal from "./NewDeckModal";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="p-2 rounded-2xl bg-neutral-700 flex gap-1">
        <Button variant="light" size="sm">
          My flashcard
        </Button>
        <Button variant="light" size="sm">
          Explore
        </Button>
        <Button variant="light" size="sm">
          Learned
        </Button>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Input
          startContent={<Search size={18} />}
          placeholder="Enter here..."
          className="w-full sm:w-64"
        />
        <NewDeckModal />
      </div>
    </motion.div>
  );
};

export default Header;
