import { FC } from "react";

interface StatProps {
  label: string;
  number: string;
}

const Stat: FC<StatProps> = ({ label, number }) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {number}
      </div>

      <div className="text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
};

export default Stat;
