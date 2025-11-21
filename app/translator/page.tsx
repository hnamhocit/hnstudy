"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";

import { IDeck } from "@/interfaces";
import DefaultLayout from "@/layouts/DefaultLayout";
import Stats from "./components/Stats";
import Header from "./components/Header";
import { auth, db } from "@/config";
import Deck from "./components/Deck";

// Animation variants cho grid chứa các deck
const deckListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3, // Đợi Header và Stats hiện ra trước
    },
  },
};

const Translator = () => {
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure user is authenticated before querying
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "decks"),
          where("userId", "==", user.uid),
        );

        const unsubscribeSnapshot = onSnapshot(
          q,
          (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as IDeck[];
            setDecks(data);
            setIsLoading(false);
          },
          (error) => {
            console.error("Error fetching decks:", error);
            setIsLoading(false);
          },
        );

        return () => unsubscribeSnapshot();
      } else {
        setIsLoading(false);
        setDecks([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-8 pb-10">
        <Stats />

        <Header />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div
            variants={deckListVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {decks.length > 0 ? (
                decks.map((deck) => <Deck key={deck.id} {...deck} />)
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20 text-gray-500"
                >
                  Bạn chưa có bộ thẻ nào. Hãy tạo mới để bắt đầu học!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Translator;
