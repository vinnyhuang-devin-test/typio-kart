import { type GameResult } from "@/types/game";

interface GameResultsProps {
  result: GameResult;
  onPlayAgain: () => void;
}

export function GameResults({ result, onPlayAgain }: GameResultsProps) {
  const formatTime = (timeMs: number) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getPerformanceMessage = (wpm: number, accuracy: number) => {
    if (wpm >= 60 && accuracy >= 95) return "🏆 Excellent! You're a typing champion!";
    if (wpm >= 40 && accuracy >= 90) return "🎯 Great job! Very impressive typing skills!";
    if (wpm >= 25 && accuracy >= 85) return "👍 Good work! Keep practicing to improve!";
    return "💪 Nice effort! Practice makes perfect!";
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-xl">
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Race Complete!</h2>
        
        <div className="mb-6 text-lg text-gray-600">
          {getPerformanceMessage(result.wpm, result.accuracy)}
        </div>

        <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          <ResultStat
            label="WPM"
            value={result.wpm.toString()}
            color="text-blue-600"
            icon="⚡"
          />
          <ResultStat
            label="Accuracy"
            value={`${result.accuracy}%`}
            color="text-green-600"
            icon="🎯"
          />
          <ResultStat
            label="Time"
            value={formatTime(result.timeElapsed)}
            color="text-purple-600"
            icon="⏱️"
          />
          <ResultStat
            label="Errors"
            value={result.incorrectChars.toString()}
            color="text-red-600"
            icon="❌"
          />
        </div>

        <div className="mb-6 rounded-lg bg-white p-4 shadow-inner">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">Detailed Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Correct Characters:</span>
              <span className="ml-2 font-semibold text-green-600">{result.correctChars}</span>
            </div>
            <div>
              <span className="text-gray-600">Total Characters:</span>
              <span className="ml-2 font-semibold text-gray-800">{result.totalChars}</span>
            </div>
            <div>
              <span className="text-gray-600">Difficulty:</span>
              <span className="ml-2 font-semibold capitalize text-gray-800">{result.difficulty}</span>
            </div>
            <div>
              <span className="text-gray-600">Completed:</span>
              <span className="ml-2 font-semibold text-gray-800">
                {new Date(result.completedAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

interface ResultStatProps {
  label: string;
  value: string;
  color: string;
  icon: string;
}

function ResultStat({ label, value, color, icon }: ResultStatProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="text-2xl">{icon}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
}