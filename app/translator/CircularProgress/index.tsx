interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number;
  /**
   * Lớp màu của Tailwind cho vòng "nền" (track).
   * Vd: "text-gray-200"
   */
  trackColor: string;
  /**
   * Lớp màu của Tailwind cho vòng "tiến độ" (progress).
   * Vd: "text-blue-500"
   */
  progressColor: string;
  text?: string
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  trackColor,
  progressColor,
  text
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          className={trackColor}
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <circle
          className={progressColor}
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"

          strokeDasharray={circumference}
          strokeDashoffset={offset}

          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">
          {text ? text : `${progress}%`}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
