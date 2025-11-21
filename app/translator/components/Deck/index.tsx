"use client";

import { FC } from "react";
import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  useDisclosure,
} from "@heroui/react";
import {
  PencilIcon,
  Settings2Icon,
  SquareArrowOutUpRight,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import CircularProgress from "../CircularProgress";
import { IDeck } from "@/interfaces";
import { useDeckCards } from "@/hooks/useDeckCards";
import { getCardsStats } from "@/utils";
import { deckController } from "@/controllers";
import DeckModal from "@/components/DeckModal";

// Variants cho animation xuất hiện
const deckVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

const Deck: FC<IDeck> = (props) => {
  const { id, name, description, wordCount } = props;
  const { cards } = useDeckCards(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const href = `/decks/${id}`;

  const stats = getCardsStats(cards);

  const handleShare = () => {
    if (window.navigator) {
      window.navigator.clipboard.writeText(`${window.origin}${href}`);
      addToast({ title: "Copied URL successfully", color: "success" });
    }
  };

  return (
    <motion.div
      variants={deckVariants}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-4 rounded-xl border-2 space-y-4 border-neutral-700/50 bg-neutral-900/50 backdrop-blur-sm"
    >
      <div>
        <div className="text-xl font-bold truncate">{name}</div>

        <div className="flex items-center justify-between mt-1">
          <div className="text-sm text-gray-400 truncate max-w-[70%]">
            {description.length > 0 ? description : "No description"}
          </div>
          <div className="text-xs py-1 px-3 rounded-full bg-neutral-950 border border-neutral-800">
            {wordCount} words
          </div>
        </div>
      </div>

      <div className="grid gap-2 grid-cols-4 items-center py-2">
        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-2xl text-green-500">
            {stats.learned}
          </div>
          <div className="text-[10px] uppercase font-bold text-green-500/70">
            Learned
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-2xl text-purple-500">
            {stats.learning}
          </div>
          <div className="text-[10px] uppercase font-bold text-purple-500/70">
            Learning
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-2xl text-orange-500">{stats.new}</div>
          <div className="text-[10px] uppercase font-bold text-orange-500/70">
            New
          </div>
        </div>

        <div className="flex justify-center">
          <CircularProgress
            strokeWidth={6}
            size={56}
            progress={stats.accuracy * 100}
            trackColor="text-indigo-900/30"
            progressColor="text-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div className="text-xs text-gray-400">Mastery Progress</div>
          <div className="font-bold text-blue-500 text-sm">
            {stats.progress}%
          </div>
        </div>
        <Progress
          value={stats.progress}
          className="h-1.5"
          classNames={{
            indicator: "bg-gradient-to-r from-blue-500 to-indigo-500",
          }}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          onPress={() => router.push(href)}
          fullWidth
          className="bg-white text-black font-medium hover:bg-gray-200"
          startContent={<SquareArrowOutUpRight size={18} />}
        >
          Enter
        </Button>

        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="flat"
              className="bg-neutral-800 text-white"
            >
              <Settings2Icon size={20} />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem
              onClick={handleShare}
              startContent={<SquareArrowOutUpRightIcon size={18} />}
              key="share"
            >
              Share
            </DropdownItem>
            <DropdownItem
              onClick={onOpen}
              startContent={<PencilIcon size={18} />}
              key="edit"
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={() => deckController.delete(id)}
              startContent={<Trash2Icon size={18} />}
              color="danger"
              className="text-danger"
              key="delete"
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <DeckModal
          mode="update"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          deck={props}
        />
      </div>
    </motion.div>
  );
};

export default Deck;
