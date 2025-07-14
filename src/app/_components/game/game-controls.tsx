import { type GameStatus } from "@/types/game";

interface GameControlsProps {
  status: GameStatus;
  onStart: () => void;
  onReset: () => void;
  onPause: () => void;
}

export function GameControls({ status, onStart, onReset, onPause }: GameControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {status === "waiting" && (
        <>
          <button
            onClick={onStart}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Game
          </button>
          <p className="text-sm text-gray-600">
            Or just start typing to begin!
          </p>
        </>
      )}

      {(status === "active" || status === "paused") && (
        <>
          <button
            onClick={onPause}
            className="rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            {status === "paused" ? "Resume" : "Pause"}
          </button>
          
          <button
            onClick={onReset}
            className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </>
      )}

      {status === "finished" && (
        <button
          onClick={onReset}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      )}

      {status === "paused" && (
        <div className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800">
          Game Paused
        </div>
      )}
    </div>
  );
}