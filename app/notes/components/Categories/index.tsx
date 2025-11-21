import { getCategoryColor } from "@/utils";
import { Card, CardBody } from "@heroui/react";
import { FC } from "react";
import { motion } from "motion/react";

interface CategoriesProps {
  categories: { name: string; count: number }[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <Card className="border-none shadow-md">
      <CardBody className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Danh mục
        </h3>

        <div className="space-y-1">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5, backgroundColor: "rgba(0,0,0,0.05)" }}
              className="flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: getCategoryColor(category.name),
                    boxShadow: `0 0 8px ${getCategoryColor(category.name)}`,
                  }}
                />

                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </div>

              <div className="flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 w-6 h-6 rounded-full">
                {category.count}
              </div>
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Categories;
