import { addToast, Button } from "@heroui/react";
import { ChevronLeft, Clock, Trash, User, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { motion } from "motion/react";

import { db } from "@/config";
import AddCardModal from "./AddCardModal";
import AddMoreModal from "./AddMoreModal";

interface HeaderProps {
  name: string;
  description: string;
  id: string;
  userId: string;
}

const Header: FC<HeaderProps> = ({ name, description, id, userId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [username, setUsername] = useState("...");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", userId));
        if (isMounted && snapshot.exists()) {
          setUsername(snapshot.data().username);
        }
      } catch (e) {
        if (isMounted) setUsername("Unknown");
        console.error(e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleDelete = async () => {
    if (!confirm("Delete this deck strictly?")) return;

    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "decks", id));
      router.replace("/decks");
      addToast({ title: "Deleted successfully", color: "success" });
    } catch (error: any) {
      addToast({ title: error?.message, color: "danger" });
      setIsDeleting(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 supports-backdrop-filter:bg-neutral-950/60"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-5">
          <Button
            isIconOnly
            variant="flat"
            radius="full"
            onPress={() => router.back()}
            className="bg-white/5 hover:bg-white/10 text-white"
          >
            <ChevronLeft size={22} />
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-primary-500" />

              <h1 className="text-2xl font-bold text-white tracking-tight">
                {name}
              </h1>
            </div>

            <p className="text-sm text-neutral-400 font-medium max-w-md truncate">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AddCardModal id={id} />

          <AddMoreModal />

          <Button
            isLoading={isDeleting}
            onPress={handleDelete}
            isIconOnly
            variant="flat"
            color="danger"
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
          >
            <Trash size={20} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <User size={14} />

          <span>
            Owner:{" "}
            <span className="text-neutral-300 normal-case">{username}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={14} />

          <span>Updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
