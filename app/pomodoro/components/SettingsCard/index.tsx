import { Card, CardBody, Select, SelectItem, Switch } from "@heroui/react";
import { Settings2Icon } from "lucide-react";
import { motion } from "motion/react";
import { FC } from "react";
import { Settings } from "../../page";

interface SettingsCardProps {
  settings: Settings;
  handleSettingChange: (key: keyof Settings, value: string) => void;
}

const SettingsCard: FC<SettingsCardProps> = ({
  settings,
  handleSettingChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Settings2Icon size={20} />
            Cài đặt thời gian
          </h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Focus (phút)
              </label>

              <Select
                selectedKeys={[settings.work.toString()]}
                onChange={(e) => handleSettingChange("work", e.target.value)}
                aria-label="Work duration"
                disallowEmptySelection
              >
                {[15, 25, 30, 45, 60].map((min) => (
                  <SelectItem key={min.toString()}>{min} phút</SelectItem>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Short Break
                </label>
                <Select
                  selectedKeys={[settings.shortBreak.toString()]}
                  onChange={(e) =>
                    handleSettingChange("shortBreak", e.target.value)
                  }
                  aria-label="Short break duration"
                  disallowEmptySelection
                >
                  {[3, 5, 10].map((min) => (
                    <SelectItem key={min.toString()}>{min} phút</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Long Break
                </label>
                <Select
                  selectedKeys={[settings.longBreak.toString()]}
                  onChange={(e) =>
                    handleSettingChange("longBreak", e.target.value)
                  }
                  aria-label="Long break duration"
                  disallowEmptySelection
                >
                  {[15, 20, 30].map((min) => (
                    <SelectItem key={min.toString()}>{min} phút</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tự động chuyển chế độ
              </span>

              <Switch size="sm" defaultSelected aria-label="Auto switch" />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default SettingsCard;
