"use client";

import { db } from "@/config";
import { noteController } from "@/controllers";
import { INote } from "@/interfaces/note";
import { Button, Input, Card, CardBody, Chip } from "@heroui/react";
import { doc, getDoc } from "firebase/firestore";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Tag,
  Type,
  Bold,
  Italic,
  List,
  Link,
  Image,
  Code,
  Quote,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "motion/react";

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const NewNotePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode") || "create";

  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    category: "",
  });
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (id && mode === "edit") {
      setIsEditing(true);
      fetchNoteData(id);
    } else {
      setIsEditing(false);
    }
  }, [id, mode]);

  const fetchNoteData = async (noteId: string) => {
    try {
      setIsLoading(true);
      const snapshot = await getDoc(doc(db, "notes", noteId));
      const data = snapshot.data() as INote;
      setFormData({
        title: data.title,
        content: data.content,
        tags: data.tags,
        category: data.category,
      });
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung");
      return;
    }

    try {
      setIsLoading(true);
      if (isEditing && id) {
        await noteController.update(id, formData);
      } else {
        await noteController.create(formData);
      }
      router.push("/notes");
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const insertText = (
    before: string,
    after: string = "",
    defaultText: string = "",
  ) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end) || defaultText;

    const newText =
      formData.content.substring(0, start) +
      before +
      selectedText +
      after +
      formData.content.substring(end);

    setFormData((prev) => ({ ...prev, content: newText }));

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertImage = () => {
    const url = prompt("Nhập URL hình ảnh:");
    if (url) {
      insertText(`![Mô tả ảnh](${url})`);
    }
  };

  const formatButtons = [
    {
      icon: <Type className="w-4 h-4" />,
      label: "H1",
      action: () => insertText("# ", "", "Tiêu đề"),
    },
    {
      icon: <Type className="w-4 h-4" />,
      label: "H2",
      action: () => insertText("## ", "", "Tiêu đề nhỏ"),
    },
    {
      icon: <Bold className="w-4 h-4" />,
      label: "Đậm",
      action: () => insertText("**", "**", "chữ đậm"),
    },
    {
      icon: <Italic className="w-4 h-4" />,
      label: "Nghiêng",
      action: () => insertText("_", "_", "chữ nghiêng"),
    },
    {
      icon: <List className="w-4 h-4" />,
      label: "List",
      action: () => insertText("- ", "", "mục danh sách"),
    },
    {
      icon: <Link className="w-4 h-4" />,
      label: "Link",
      action: () => insertText("[", "](https://)", "văn bản liên kết"),
    },
    { icon: <Image className="w-4 h-4" />, label: "Ảnh", action: insertImage },
    {
      icon: <Code className="w-4 h-4" />,
      label: "Code",
      action: () => insertText("`", "`", "code"),
    },
    {
      icon: <Quote className="w-4 h-4" />,
      label: "Quote",
      action: () => insertText("> ", "", "trích dẫn"),
    },
  ];

  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Đang tải ghi chú...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="faded"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onPress={() => router.push("/notes")}
            >
              Quay lại
            </Button>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isEditing ? `Chỉnh sửa ghi chú` : "Tạo ghi chú mới"}
                {id && (
                  <span className="text-blue-500 ml-2 text-lg">
                    #{id.slice(0, 6)}...
                  </span>
                )}
              </h1>

              <p className="text-gray-600 dark:text-gray-400">
                {isEditing
                  ? "Cập nhật nội dung ghi chú của bạn"
                  : "Viết và định dạng ghi chú của bạn với Markdown"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="faded"
              startContent={
                isPreview ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )
              }
              onPress={() => setIsPreview(!isPreview)}
            >
              {isPreview ? "Chỉnh sửa" : "Xem trước"}
            </Button>

            <Button
              color="primary"
              startContent={<Save className="w-4 h-4" />}
              onPress={handleSave}
              isLoading={isLoading}
              className="bg-linear-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30"
            >
              {isEditing ? "Cập nhật" : "Lưu ghi chú"}
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title Input */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardBody className="p-4">
                  <Input
                    label="Tiêu đề"
                    placeholder="Nhập tiêu đề ghi chú..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    variant="bordered"
                    classNames={{
                      input: "text-lg font-medium",
                    }}
                  />
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardBody className="p-4">
                  <Input
                    label="Danh mục"
                    placeholder="VD: Lập trình, Tiếng Anh..."
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    variant="bordered"
                  />
                </CardBody>
              </Card>
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardBody className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Thẻ</span>
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Thêm thẻ..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        size="sm"
                        variant="bordered"
                      />
                      <Button size="sm" onPress={addTag} variant="flat">
                        Thêm
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {formData.tags.map((tag, index) => (
                          <motion.div
                            key={tag}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Chip
                              variant="flat"
                              onClose={() => removeTag(tag)}
                              classNames={{
                                base: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none",
                              }}
                            >
                              {tag}
                            </Chip>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Formatting Tools */}
            <AnimatePresence>
              {!isPreview && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardBody className="p-4">
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <Type className="w-4 h-4" /> Định dạng nhanh
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {formatButtons.map((button, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="flat"
                              startContent={button.icon}
                              onPress={button.action}
                              className="justify-start bg-gray-100 dark:bg-slate-700/50"
                            >
                              {button.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Editor/Preview */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg h-[650px] overflow-hidden">
              <CardBody className="p-0 h-full">
                {isPreview ? (
                  // Preview Mode
                  <div className="p-8 h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-blue-600 dark:prose-headings:text-blue-400 prose-a:text-blue-500">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {formData.content || "*Chưa có nội dung*"}
                      </ReactMarkdown>
                    </article>
                  </div>
                ) : (
                  // Editor Mode
                  <div className="h-full flex flex-col">
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder={`# Chào mừng đến với trình soạn thảo Markdown!

## Định dạng văn bản
**Chữ đậm** và *chữ nghiêng*

## Danh sách
- Mục danh sách 1
- Mục danh sách 2

## Code
\`\`\`javascript
console.log('Hello World!');
\`\`\`

## Hình ảnh
![Mô tả ảnh](https://example.com/image.jpg)

Bắt đầu viết ghi chú của bạn...`}
                      className="flex-1 w-full p-8 resize-none border-0 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 font-mono text-base leading-relaxed scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600"
                    />
                    <div className="px-4 py-2 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 text-xs text-gray-500 flex justify-end gap-4">
                      <span>{formData.content.length} ký tự</span>
                      <span>
                        {
                          formData.content
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length
                        }{" "}
                        từ
                      </span>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewNotePage;
