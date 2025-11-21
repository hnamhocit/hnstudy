"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Button, Input, Spinner } from "@heroui/react";
import {
  BookOpen,
  Brain,
  Search,
  WalletCards,
  Webhook,
  ZapIcon,
  AlertCircle,
  BrainIcon,
  BookOpenIcon,
  WalletCardsIcon,
  WebhookIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { db } from "@/config";
import { IDeck } from "@/interfaces";
import Header from "./components/Header";
import Stat from "./components/Stat";
import Card from "./components/Card";
import { useDeckCards } from "@/hooks/useDeckCards";

const DeckDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { cards } = useDeckCards(id);
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [isLoadingDeck, setIsLoadingDeck] = useState(true);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 1. Fetch Deck Info
  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(
      doc(db, "decks", id),
      (snapshot) => {
        if (!snapshot.exists()) {
          setError("Deck not found.");
          setIsLoadingDeck(false);
          return;
        }
        setDeck(snapshot.data() as IDeck);
        setIsLoadingDeck(false);
      },
      (err) => {
        console.error(err);
        setError("Access denied or error.");
        setIsLoadingDeck(false);
      },
    );
    return () => unsub();
  }, [id]);

  // 2. Derived State: Filter & Stats (No useEffect needed)
  const filteredCards = useMemo(() => {
    if (!q) return cards;
    return cards.filter((c) => c.front.toLowerCase().includes(q.toLowerCase()));
  }, [cards, q]);

  const stats = useMemo(
    () => ({
      total: cards.length,
      learned: cards.filter((c) => c.status === "learned").length,
      learning: cards.filter((c) => c.status === "learning").length,
      review: cards.filter((c) => c.status === "review").length,
    }),
    [cards],
  );

  if (isLoadingDeck)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-950">
        <Spinner size="lg" color="primary" />
      </div>
    );

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-neutral-950">
        <div className="p-4 bg-red-500/10 rounded-full">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-white">{error}</h1>
        <Button variant="flat" onPress={() => router.back()}>
          Go back
        </Button>
      </div>
    );
  }

  const statBlocks = [
    {
      label: "Total Cards",
      value: stats.total,
      icon: <WalletCardsIcon size={24} />,
      className: "bg-neutral-900/50 text-neutral-200 !border-neutral-950/50",
    },
    {
      label: "Mastered",
      value: stats.learned,
      icon: <BookOpenIcon size={24} />,
      className: "bg-emerald-500/5 text-emerald-400 border-emerald-500/20",
    },
    {
      label: "Learning",
      value: stats.learning,
      icon: <BrainIcon size={24} />,
      className: "bg-blue-500/5 text-blue-400 border-blue-500/20",
    },
    {
      label: "Review",
      value: stats.review,
      icon: <WebhookIcon size={24} />,
      className: "bg-orange-500/5 text-orange-400 border-orange-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 pb-20 selection:bg-primary-500/30">
      <Header
        name={deck!.name}
        description={deck!.description}
        id={id}
        userId={deck!.userId}
      />

      <main className="p-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statBlocks.map((stat, i) => (
            <Stat key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-28 z-40 py-4 bg-neutral-950/80 backdrop-blur-lg rounded-2xl px-2 -mx-2">
          <div className="w-full sm:w-96">
            <Input
              startContent={<Search size={18} className="text-neutral-500" />}
              placeholder="Search cards..."
              value={q}
              onValueChange={setQ}
              classNames={{
                inputWrapper:
                  "bg-neutral-900 border border-neutral-800 group-data-[focus=true]:bg-neutral-800",
              }}
              isClearable
            />
          </div>

          <Button
            color="primary"
            onPress={() => router.push(`/decks/${id}/practice`)}
            className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/20"
            startContent={<ZapIcon size={18} fill="currentColor" />}
          >
            Practice Mode
          </Button>
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => <Card key={card.id} {...card} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center text-neutral-500"
              >
                <p>No cards found matching &quot;{q}&quot;</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default DeckDetails;
