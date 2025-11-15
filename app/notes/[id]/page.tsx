"use client"

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams, useRouter } from 'next/navigation';
import { INote } from '@/interfaces';
import { db } from '@/config';
import { useThemeStore } from '@/stores';
import { Button } from '@heroui/react';
import moment from 'moment';
import { ChevronLeftIcon } from 'lucide-react';

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<INote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { theme } = useThemeStore()
  const router = useRouter()

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const noteDoc = await getDoc(doc(db, 'notes', id));

        if (noteDoc.exists()) {
          setNote({
            id: noteDoc.id,
            ...noteDoc.data()
          } as INote);
        } else {
          setError('Note không tồn tại');
        }
      } catch (err) {
        setError('Lỗi khi tải note');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 dark:text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400 text-xl">Không tìm thấy note</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6 transition-colors">
          <Button startContent={<ChevronLeftIcon size={20} />} onPress={() => router.back()} variant='faded'>Quay lại</Button>

          <div className="flex items-center justify-between my-4">

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{note.title}</h1>

            {note.isPinned && (
              <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                📌 Đã ghim
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
              {note.category}
            </span>
            <div className="flex gap-2">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 transition-colors">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {note.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>Ngày tạo: {moment(note.createdAt).toLocaleString()}</p>
          <p>Chỉnh sửa lần cuối: {moment(note.updatedAt).format('DD/MM/YYYY')}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
