"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams, useRouter } from "next/navigation";
import { INote } from "@/interfaces";
import { db } from "@/config";
import { Button } from "@heroui/react";
import moment from "moment";
import { ChevronLeftIcon, Calendar, Tag, Clock } from "lucide-react";
import { motion } from "motion/react";

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<INote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const noteDoc = await getDoc(doc(db, "notes", id));

        if (noteDoc.exists()) {
          setNote({
            id: noteDoc.id,
            ...noteDoc.data(),
          } as INote);
        } else {
          setError("Note không tồn tại");
        }
      } catch (err) {
        setError("Lỗi khi tải note");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="text-red-500 dark:text-red-400 text-xl">
          {error || "Không tìm thấy note"}
        </div>
        <Button onPress={() => router.back()}>Quay lại</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 mb-6"
        >
          <Button
            startContent={<ChevronLeftIcon size={20} />}
            onPress={() => router.back()}
            variant="light"
            className="mb-4 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Quay lại
          </Button>

          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {note.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 text-sm items-center border-t border-gray-100 dark:border-slate-700 pt-6">
            {note.category && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                <Tag size={14} />
                {note.category}
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Calendar size={16} />
              {moment(note.createdAt).format("DD/MM/YYYY")}
            </div>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Clock size={16} />
              {moment(note.updatedAt).fromNow()}
            </div>
          </div>

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 min-h-[400px]"
        >
          <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.content}
            </ReactMarkdown>
          </article>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NoteDetail;
