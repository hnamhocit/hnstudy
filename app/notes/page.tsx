"use client"

import { Button, Card, CardBody, Input } from '@heroui/react'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import DefaultLayout from '@/layouts/DefaultLayout'
import Header from './components/Header'
import QuickStats from './components/QuickStats'
import Categories from './components/Categories'
import Note from './components/Note'
import { INote } from '@/interfaces'
import EmptyNotes from './components/EmptyNotes'
import NoteSkeleton from './components/NoteSkeleton'
import { useUserStore } from '@/stores'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/config'
import { getCategories } from '@/utils/categories'

export default function NotesPage() {
  const [notes, setNotes] = useState<INote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [q, setQ] = useState("")
  const { user } = useUserStore()

  useEffect(() => {
    const q = query(collection(db, "notes"), where("userId", "==", user?.id))

    const unsubscriber = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => doc.data()) as INote[]
      setNotes(data)
      setIsLoading(false)
    })

    return () => unsubscriber()
  }, [])


  const categories = getCategories(notes)

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(q.toLowerCase()) ||
    note.content.toLowerCase().includes(q.toLowerCase()) ||
    note.tags.some((tag: string) => tag.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

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
                  value={q}
                  onValueChange={setQ}
                />
              </CardBody>
            </Card>

            <Categories categories={categories} />

            <QuickStats />
          </div>

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
                {filteredNotes.length > 0 && (
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      Hiển thị {filteredNotes.length} ghi chú
                      {q && ` cho "${q}"`}
                    </p>
                    {q && (
                      <button
                        onClick={() => setQ('')}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Xóa bộ lọc
                      </button>
                    )}
                  </div>
                )}

                {/* Notes Grid or Empty State */}
                {filteredNotes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNotes.map(note => (
                      <Note key={note.id} {...note} />
                    ))}
                  </div>
                ) : (
                  <div>
                    {q ? (
                      // No results for search
                      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <CardBody className="p-8 text-center">
                          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />

                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Không tìm thấy kết quả
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Không có ghi chú nào phù hợp với "{q}"
                          </p>

                          <Button
                            variant="light"
                            onPress={() => setQ('')}
                          >
                            Xóa tìm kiếm
                          </Button>
                        </CardBody>
                      </Card>
                    ) : (
                      <EmptyNotes />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
