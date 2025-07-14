import { type GameStats, type GameStatus } from "@/types/game";

interface StatsDisplayProps {
  stats: GameStats;
  status: GameStatus;
}

export function StatsDisplay({ stats, status }: StatsDisplayProps) {
  const formatTime = (timeMs: number) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-wrap gap-6 rounded-lg bg-white p-6 shadow-lg">
      <StatItem
        label="WPM"
        value={stats.wpm.toString()}
        description="Words per minute"
        color="text-blue-600"
      />
      
      <StatItem
        label="Accuracy"
        value={`${stats.accuracy}%`}
        description="Typing accuracy"
        color="text-green-600"
      />
      
      <StatItem
        label="Progress"
        value={`${stats.progress}%`}
        description="Text completion"
        color="text-purple-600"
      />
      
      <StatItem
        label="Time"
        value={formatTime(stats.timeElapsed)}
        description="Elapsed time"
        color="text-orange-600"
      />
      
      {status === "finished" && (
        <>
          <StatItem
            label="Correct"
            value={stats.correctChars.toString()}
            description="Correct characters"
            color="text-green-600"
          />
          
          <StatItem
            label="Errors"
            value={stats.incorrectChars.toString()}
            description="Incorrect characters"
            color="text-red-600"
          />
        </>
      )}
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string;
  description: string;
  color: string;
}

function StatItem({ label, value, description, color }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
}