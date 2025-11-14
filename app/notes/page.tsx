"use client"

import { Card, CardBody, Button, Input, Textarea } from '@heroui/react'
import { Plus, Search, FileText, Bookmark, Tag, Calendar } from 'lucide-react'
import DefaultLayout from '@/layouts/DefaultLayout'

export default function NotesPage() {
  const recentNotes = [
    {
      id: 1,
      title: "React Hooks Cheatsheet",
      content: "useState, useEffect, useContext, useReducer, useMemo, useCallback...",
      tags: ["React", "JavaScript", "Frontend"],
      date: "2 giờ trước",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Từ vựng TOEIC Part 1",
      content: "Describe photographs - Common vocabulary for describing people, objects, scenes...",
      tags: ["TOEIC", "English", "Vocabulary"],
      date: "1 ngày trước",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Thuật toán Sorting",
      content: "Bubble sort, Quick sort, Merge sort, Time complexity analysis...",
      tags: ["Algorithm", "Programming", "CS"],
      date: "2 ngày trước",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Ngữ pháp tiếng Anh",
      content: "Present perfect, Conditional sentences, Passive voice...",
      tags: ["Grammar", "English"],
      date: "3 ngày trước",
      color: "bg-orange-500"
    }
  ]

  const categories = [
    { name: "Tất cả", count: 12, color: "bg-gray-500" },
    { name: "Lập trình", count: 5, color: "bg-blue-500" },
    { name: "Tiếng Anh", count: 4, color: "bg-green-500" },
    { name: "Toán học", count: 2, color: "bg-purple-500" },
    { name: "Khoa học", count: 1, color: "bg-orange-500" }
  ]

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Ghi chú
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Lưu trữ và quản lý kiến thức của bạn
            </p>
          </div>
          <Button
            color="primary"
            startContent={<Plus className="w-5 h-5" />}
            className="bg-gradient-to-r from-blue-500 to-purple-600 mt-4 lg:mt-0"
          >
            Tạo ghi chú mới
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardBody className="p-4">
                <Input
                  placeholder="Tìm kiếm ghi chú..."
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  variant="bordered"
                />
              </CardBody>
            </Card>

            {/* Categories */}
            <Card>
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Danh mục
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardBody className="p-6">
                <h3 className="font-semibold mb-4">Thống kê</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Tổng ghi chú:</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Đã gắn dấu:</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tuần này:</span>
                    <span className="font-semibold">3</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Create New Note */}
            <Card className="mb-6">
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ghi chú mới
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Tiêu đề..."
                    variant="bordered"
                  />
                  <Textarea
                    placeholder="Bắt đầu viết ghi chú của bạn..."
                    variant="bordered"
                    minRows={4}
                  />
                  <div className="flex gap-2">
                    <Button variant="light" size="sm" startContent={<Tag className="w-4 h-4" />}>
                      Thêm thẻ
                    </Button>
                    <Button variant="light" size="sm" startContent={<Bookmark className="w-4 h-4" />}>
                      Lưu nháp
                    </Button>
                    <Button color="primary" className="ml-auto bg-gradient-to-r from-blue-500 to-purple-600">
                      Lưu ghi chú
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Recent Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentNotes.map(note => (
                <Card key={note.id} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-4 h-4 rounded-full ${note.color} mt-1`}></div>
                      <Button isIconOnly variant="light" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {note.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {note.content}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {note.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {note.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Đã chỉnh sửa
                      </span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
