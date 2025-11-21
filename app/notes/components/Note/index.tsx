"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { Bookmark, Calendar, FileText } from "lucide-react";
import moment from "moment";
import { FC } from "react";
import { motion, Variants } from "motion/react";

import { INote } from "@/interfaces/note";
import { getCategoryColor } from "@/utils";
import Link from "next/link";

const noteVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const Note: FC<INote> = ({ id, title, content, tags, createdAt, category }) => {
  return (
    <motion.div variants={noteVariants} whileHover={{ y: -5 }} layout>
      <Card className="hover:shadow-xl transition-shadow duration-300 group border border-transparent hover:border-blue-500/20 dark:hover:border-blue-400/20 h-full">
        <CardBody className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-3 h-3 rounded-full mt-2 shadow-sm`}
              style={{
                backgroundColor: getCategoryColor(category),
                boxShadow: `0 0 10px ${getCategoryColor(category)}`,
              }}
            ></div>

            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>

          <Link
            href={`/notes/${id}`}
            className="font-semibold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1"
          >
            {title}
          </Link>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
            {content}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-gray-400 text-[10px] uppercase tracking-wider font-medium rounded-md border border-gray-200 dark:border-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {moment(createdAt).format("DD/MM/YYYY")}
            </span>

            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Note
            </span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default Note;
