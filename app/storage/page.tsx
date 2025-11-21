"use client";

import { Button, Progress } from "@heroui/react";
import {
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HardDriveIcon,
  ImageIcon,
  MoreVerticalIcon,
  MusicIcon,
  PlusIcon,
  SearchIcon,
  VideoIcon,
} from "lucide-react";
import { motion } from "motion/react";
import DefaultLayout from "@/layouts/DefaultLayout"; // Đảm bảo đường dẫn đúng

// Mock Data
const recentFiles = [
  {
    id: 1,
    name: "Tai_lieu_hoc_tap.pdf",
    type: "document",
    size: "2.5 MB",
    date: "20/11/2025",
  },
  {
    id: 2,
    name: "Project_Demo.mp4",
    type: "video",
    size: "150 MB",
    date: "19/11/2025",
  },
  {
    id: 3,
    name: "Anh_ky_yeu",
    type: "folder",
    size: "1.2 GB",
    date: "18/11/2025",
  },
  {
    id: 4,
    name: "Bai_tap_lon.docx",
    type: "document",
    size: "500 KB",
    date: "18/11/2025",
  },
  {
    id: 5,
    name: "Podcast_Tieng_Anh.mp3",
    type: "audio",
    size: "45 MB",
    date: "15/11/2025",
  },
];

const categories = [
  {
    name: "Tài liệu",
    icon: <FileTextIcon className="w-6 h-6 text-blue-500" />,
    files: 120,
    size: "2.4 GB",
    color: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    name: "Hình ảnh",
    icon: <ImageIcon className="w-6 h-6 text-purple-500" />,
    files: 340,
    size: "5.1 GB",
    color: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    name: "Media",
    icon: <VideoIcon className="w-6 h-6 text-pink-500" />,
    files: 45,
    size: "12.5 GB",
    color: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    name: "Khác",
    icon: <HardDriveIcon className="w-6 h-6 text-orange-500" />,
    files: 80,
    size: "1.2 GB",
    color: "bg-orange-100 dark:bg-orange-900/30",
  },
];

const StoragePage = () => {
  return (
    <DefaultLayout>
      <div className="space-y-6">
        {/* 1. Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Lưu trữ của tôi
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Quản lý tất cả tài liệu học tập của bạn ở một nơi.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm file..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <Button
              className="bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20"
              startContent={<PlusIcon size={20} />}
            >
              Tải lên
            </Button>
          </div>
        </div>

        {/* 2. Storage Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Usage Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1 lg:col-span-2 p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-700 shadow-xs"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <HardDriveIcon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Dung lượng Cloud
                  </h3>
                  <p className="text-sm text-gray-500">Gói sinh viên Pro</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  21.2 GB
                </span>
                <span className="text-gray-500 ml-1">/ 50 GB</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Đã sử dụng 42%</span>
                <span>Còn trống 28.8 GB</span>
              </div>
              <Progress
                value={42}
                className="h-3"
                classNames={{
                  indicator: "bg-linear-to-r from-blue-500 to-purple-600",
                  track: "bg-gray-100 dark:bg-slate-800",
                }}
              />
            </div>
          </motion.div>

          {/* Quick Category Stats */}
          <div className="col-span-1 space-y-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              {categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center mb-3`}
                  >
                    {cat.icon}
                  </div>
                  <p className="text-sm text-gray-500">{cat.files} files</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {cat.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Recent Files List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Gần đây
            </h3>
            <Button variant="light" size="sm" className="text-blue-500">
              Xem tất cả
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Tên tệp</th>
                  <th className="px-6 py-4 font-medium">Loại</th>
                  <th className="px-6 py-4 font-medium">Kích thước</th>
                  <th className="px-6 py-4 font-medium">Ngày sửa</th>
                  <th className="px-6 py-4 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {recentFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {file.type === "folder" ? (
                          <FolderIcon
                            className="text-yellow-500 fill-yellow-500/20"
                            size={20}
                          />
                        ) : file.type === "video" || file.type === "audio" ? (
                          <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-500">
                            {file.type === "video" ? (
                              <VideoIcon size={16} />
                            ) : (
                              <MusicIcon size={16} />
                            )}
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                            <FileIcon size={16} />
                          </div>
                        )}
                        <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 capitalize">
                      {file.type}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{file.size}</td>
                    <td className="px-6 py-4 text-gray-500">{file.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <MoreVerticalIcon size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DefaultLayout>
  );
};

export default StoragePage;
