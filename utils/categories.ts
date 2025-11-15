import { INote } from "@/interfaces";

export const getCategories = (notes: INote[]) => {
  const categories = new Set()
  notes.forEach(note => categories.add(note.category))
  const uniqueCategories = Array.from(categories) as string[]

  return uniqueCategories.map(c => ({
    name: c,
    count: notes.filter(note => note.category === c).length
  }))
}

export function getCategoryColor(categoryName: string) {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#F9E79F', '#A9DFBF', '#D2B4DE', '#AED6F1', '#FAD7A0'
  ];

  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Lấy index từ hash
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

