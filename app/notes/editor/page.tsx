"use client"

import { db } from "@/config"
import { noteController } from "@/controllers"
import { INote } from "@/interfaces/note"
import { Button, Input, Textarea, Card, CardBody, Chip } from "@heroui/react"
import { doc, getDoc } from "firebase/firestore"
import { ArrowLeft, Save, Eye, EyeOff, Tag, X, Image, Bold, Italic, Link, List, Code, Quote, Type } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const NewNotePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const mode = searchParams.get('mode') || 'create'

  const [isEditing, setIsEditing] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    category: ""
  })
  const [newTag, setNewTag] = useState('')

  // Xử lý params khi component mount hoặc params thay đổi
  useEffect(() => {
    if (id && mode === 'edit') {
      setIsEditing(true)
      // Fetch note data từ API dựa trên id
      fetchNoteData(id)
    } else {
      setIsEditing(false)
    }
  }, [id, mode])

  const fetchNoteData = async (noteId: string) => {
    try {
      setIsLoading(true)

      const snapshot = await getDoc(doc(db, "notes", noteId))
      const data = snapshot.data() as INote

      setFormData({
        title: data.title,
        content: data.content,
        tags: data.tags,
        category: data.category
      })
    } catch (error) {
      console.error('Error fetching note:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Vui lòng nhập tiêu đề và nội dung')
      return
    }

    try {
      setIsLoading(true)

      if (isEditing && id) {
        await noteController.update(id, formData)
      } else {
        await noteController.create(formData)
      }

      router.push('/notes')
    } catch (error) {
      console.error('Error saving note:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      addTag()
    }
  }

  // Markdown formatting helpers
  const insertText = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end) || defaultText

    const newText = formData.content.substring(0, start) +
      before + selectedText + after +
      formData.content.substring(end)

    setFormData(prev => ({ ...prev, content: newText }))

    // Focus back to textarea
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const insertImage = () => {
    const url = prompt('Nhập URL hình ảnh:')
    if (url) {
      insertText(`![Mô tả ảnh](${url})`)
    }
  }

  const formatButtons = [
    { icon: <Type className="w-4 h-4" />, label: "H1", action: () => insertText('# ', '', 'Tiêu đề') },
    { icon: <Type className="w-4 h-4" />, label: "H2", action: () => insertText('## ', '', 'Tiêu đề nhỏ') },
    { icon: <Bold className="w-4 h-4" />, label: "Đậm", action: () => insertText('**', '**', 'chữ đậm') },
    { icon: <Italic className="w-4 h-4" />, label: "Nghiêng", action: () => insertText('_', '_', 'chữ nghiêng') },
    { icon: <List className="w-4 h-4" />, label: "List", action: () => insertText('- ', '', 'mục danh sách') },
    { icon: <Link className="w-4 h-4" />, label: "Link", action: () => insertText('[', '](https://)', 'văn bản liên kết') },
    { icon: <Image className="w-4 h-4" />, label: "Ảnh", action: insertImage },
    { icon: <Code className="w-4 h-4" />, label: "Code", action: () => insertText('`', '`', 'code') },
    { icon: <Quote className="w-4 h-4" />, label: "Quote", action: () => insertText('> ', '', 'trích dẫn') },
  ]

  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Đang tải ghi chú...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="faded"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onPress={() => router.push('/notes')}
            >
              Quay lại
            </Button>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isEditing ? `Chỉnh sửa ghi chú` : 'Tạo ghi chú mới'}
                {id && <span className="text-blue-500 ml-2">#{id}</span>}
              </h1>

              <p className="text-gray-600 dark:text-gray-400">
                {isEditing ? 'Cập nhật nội dung ghi chú của bạn' : 'Viết và định dạng ghi chú của bạn với Markdown'}
                {mode && <span className="ml-2">(Chế độ: {mode})</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="faded"
              startContent={isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onPress={() => setIsPreview(!isPreview)}
            >
              {isPreview ? 'Chỉnh sửa' : 'Xem trước'}
            </Button>

            <Button
              color="primary"
              startContent={<Save className="w-4 h-4" />}
              onPress={handleSave}
              isLoading={isLoading}
              className="bg-linear-to-r from-blue-500 to-purple-600"
            >
              {isEditing ? 'Cập nhật' : 'Lưu ghi chú'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Title Input */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardBody className="p-4">
                <Input
                  label="Tiêu đề"
                  placeholder="Nhập tiêu đề ghi chú..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  variant="bordered"
                  classNames={{
                    input: "text-lg font-medium"
                  }}
                />
              </CardBody>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardBody className="p-4">
                <Input label='Category (optional)' value={formData.category} onValueChange={value => {
                  setFormData(prev => ({ ...prev, category: value }))
                }} />
              </CardBody>
            </Card>


            {/* Tags */}
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
                    />
                    <Button size="sm" onPress={addTag}>
                      Thêm
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        variant="flat"
                        onClose={() => removeTag(tag)}
                        classNames={{
                          base: "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        }}
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Formatting Tools */}
            {!isPreview && (
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardBody className="p-4">
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Định dạng nhanh
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {formatButtons.map((button, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="flat"
                          startContent={button.icon}
                          onPress={button.action}
                          className="justify-start"
                        >
                          {button.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Editor/Preview */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg h-[600px]">
              <CardBody className="p-0 h-full">
                {isPreview ? (
                  // Preview Mode
                  <div className="p-6 h-full overflow-auto">
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {formData.content || '*Chưa có nội dung*'}
                      </ReactMarkdown>
                    </article>
                  </div>
                ) : (
                  // Editor Mode
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Đang soạn thảo... {id && `(ID: ${id})`}
                      </span>
                    </div>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
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

## Liên kết
[hnstudy](https://hnstudy.com)

Bắt đầu viết ghi chú của bạn...`}
                      className="flex-1 w-full p-6 resize-none border-0 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono text-sm leading-relaxed"
                    />
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Character Count */}
            <div className="flex justify-between items-center mt-3 px-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.content.length} ký tự
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.content.split(/\s+/).filter(word => word.length > 0).length} từ
              </span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <Card className="bg-linear-to-r from-blue-500 to-purple-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Mẹo sử dụng Markdown</h3>
                <p className="text-sm opacity-90">
                  Sử dụng các nút định dạng nhanh hoặc học cú pháp Markdown để tạo ghi chú đẹp mắt
                </p>
              </div>
              <Button
                variant="flat"
                className="bg-white/20 hover:bg-white/30 text-white"
                onPress={() => window.open('https://www.markdownguide.org/basic-syntax/', '_blank')}
              >
                Học Markdown
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default NewNotePage
