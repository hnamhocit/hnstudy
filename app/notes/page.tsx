"use client";

import { Button, Card, CardBody, Input } from "@heroui/react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";

import DefaultLayout from "@/layouts/DefaultLayout";
import Header from "./components/Header";
import QuickStats from "./components/QuickStats";
import Categories from "./components/Categories";
import Note from "./components/Note";
import { INote } from "@/interfaces";
import EmptyNotes from "./components/EmptyNotes";
import NoteSkeleton from "./components/NoteSkeleton";
import { useUserStore } from "@/stores";
import { db } from "@/config";
import { getCategories } from "@/utils/categories";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function NotesPage() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [q, setQ] = useState("");
  const { user } = useUserStore();

  useEffect(() => {
    // Ensure user is authenticated before querying
    if (!user?.id) return;

    const q = query(collection(db, "notes"), where("userId", "==", user.id));

    const unsubscriber = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as INote[];
        setNotes(data);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching notes:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscriber();
  }, [user?.id]);

  const categories = getCategories(notes);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(q.toLowerCase()) ||
      note.content.toLowerCase().includes(q.toLowerCase()) ||
      note.tags.some((tag: string) =>
        tag.toLowerCase().includes(q.toLowerCase()),
      ),
  );

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial="hidden"
            animate="show"
            variants={sidebarVariants}
          >
            {/* Search */}
            <Card className="border-none shadow-md">
              <CardBody className="p-4">
                <Input
                  placeholder="Tìm kiếm ghi chú..."
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  variant="bordered"
                  value={q}
                  onValueChange={setQ}
                  classNames={{
                    inputWrapper:
                      "bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700",
                  }}
                />
              </CardBody>
            </Card>

            <Categories categories={categories} />

            <QuickStats notes={notes} />
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <NoteSkeleton key={index} />
                ))}
              </div>
            ) : (
              <>
                {/* Results Count */}
                <AnimatePresence>
                  {filteredNotes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-between mb-6"
                    >
                      <p className="text-gray-600 dark:text-gray-400">
                        Hiển thị {filteredNotes.length} ghi chú
                        {q && ` cho "${q}"`}
                      </p>
                      {q && (
                        <button
                          onClick={() => setQ("")}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Xóa bộ lọc
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Notes Grid or Empty State */}
                {filteredNotes.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredNotes.map((note) => (
                        <Note key={note.id} {...note} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {q ? (
                      // No results for search
                      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 bg-transparent">
                        <CardBody className="p-8 text-center">
                          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />

                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Không tìm thấy kết quả
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Không có ghi chú nào phù hợp với &quot{q}&quot
                          </p>

                          <Button variant="light" onPress={() => setQ("")}>
                            Xóa tìm kiếm
                          </Button>
                        </CardBody>
                      </Card>
                    ) : (
                      <EmptyNotes />
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
