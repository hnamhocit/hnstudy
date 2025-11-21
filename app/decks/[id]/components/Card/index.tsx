import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import {
  BookOpen,
  EllipsisIcon,
  Lightbulb,
  MessageCircle,
  PencilIcon,
  Trash2Icon,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Gloria_Hallelujah } from "next/font/google";
import clsx from "clsx";
import { FC, useState, useRef } from "react";
import { motion } from "motion/react";

import { ICard } from "@/interfaces";
import { cardController } from "@/controllers";
import UpdateCardModal from "@/components/UpdateCardModal";

const font = Gloria_Hallelujah({ weight: "400", subsets: ["latin"] });

const Card: FC<ICard> = (props) => {
  const {
    id,
    front,
    phonetic,
    pos,
    definition,
    note,
    examples,
    audio,
    deckId,
  } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = async () => {
    if (!audioRef.current || !audio) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio error:", err);
      }
    }
  };

  return (
    <motion.div
      layout // Auto animate layout changes
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="group relative p-5 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-neutral-600 hover:bg-neutral-900/60 transition-all shadow-xl flex flex-col gap-4 backdrop-blur-md"
    >
      {/* Edit/Delete Actions - Only visible on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" size="sm" radius="full">
              <EllipsisIcon size={18} />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem
              onPress={onOpen}
              startContent={<PencilIcon size={16} />}
              key="edit"
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onPress={() => cardController.delete(deckId, id)}
              className="text-danger"
              color="danger"
              startContent={<Trash2Icon size={16} />}
              key="delete"
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <UpdateCardModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          deckId={deckId}
          card={props}
        />
      </div>

      {/* Front Face */}
      <div>
        <h3
          className={clsx(
            "text-3xl text-white mb-2 drop-shadow-md",
            font.className,
          )}
        >
          {front}
        </h3>

        <div className="flex items-center gap-3 text-neutral-400 text-sm">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-bold uppercase">
            {pos}
          </span>

          <span className="font-serif italic">{phonetic}</span>

          {audio && (
            <>
              <button
                onClick={toggleAudio}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Play audio"
              >
                {isPlaying ? (
                  <VolumeX size={16} className="text-primary" />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>
              <audio
                ref={audioRef}
                src={audio}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>

      {/* Definition Box */}
      <div className="bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest mb-1 font-bold">
          <BookOpen size={12} /> Definition
        </div>
        <p className={clsx("text-neutral-200 leading-relaxed", font.className)}>
          {definition}
        </p>
      </div>

      {/* Examples Accordion */}
      {examples.length > 0 && (
        <Accordion isCompact hideIndicator variant="light" className="px-0">
          <AccordionItem
            key="1"
            aria-label="Examples"
            title={
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 group-hover/acc:text-primary transition-colors">
                <MessageCircle size={14} />
                <span>EXAMPLES ({examples.length})</span>
              </div>
            }
            classNames={{
              trigger: "py-2 data-[hover=true]:bg-transparent",
              content: "pb-1",
            }}
          >
            <div className="space-y-3 pl-3 border-l-2 border-neutral-800/50 ml-1">
              {examples.map((e, i) => (
                <div key={i}>
                  <p className="text-sm text-neutral-300 font-medium">
                    {e.from}
                  </p>
                  <p className="text-xs text-neutral-500 italic mt-0.5">
                    {e.to}
                  </p>
                </div>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      )}

      {/* Note */}
      {note && (
        <div className="mt-auto pt-2">
          <div className="flex gap-2 text-xs text-neutral-400 bg-yellow-500/5 p-2.5 rounded-lg border border-yellow-500/10">
            <Lightbulb size={14} className="text-yellow-600 shrink-0 mt-0.5" />
            <span className={clsx("italic leading-snug", font.className)}>
              {note}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Card;
