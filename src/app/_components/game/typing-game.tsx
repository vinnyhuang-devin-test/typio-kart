"use client";

import { useState } from "react";
import { useTypingGame } from "@/hooks/use-typing-game";
import { TextDisplay } from "./text-display";
import { StatsDisplay } from "./stats-display";
import { GameControls } from "./game-controls";
import { RaceTrack } from "./race-track";
import { GameResults } from "./game-results";
import { getRandomText } from "@/data/typing-texts";
import { type TypingText, type GameResult } from "@/types/game";

interface TypingGameProps {
  initialText?: TypingText;
}

export function TypingGame({ initialText }: TypingGameProps) {
  const [currentText, setCurrentText] = useState<TypingText>(
    initialText ?? getRandomText("easy")
  );
  
  const { gameState, startGame, resetGame, pauseGame } = useTypingGame({
    text: currentText,
  });

  const handleNewGame = (difficulty?: TypingText["difficulty"]) => {
    const newText = getRandomText(difficulty);
    setCurrentText(newText);
    resetGame();
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  const gameResult: GameResult | null = gameState.status === "finished" 
    ? {
        ...gameState.stats,
        textId: currentText.id,
        difficulty: currentText.difficulty,
        completedAt: new Date(),
      }
    : null;

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl space-y-8 p-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          🏎️ Typio-Kart
        </h1>
        <p className="text-lg text-gray-600">
          Test your typing speed and accuracy!
        </p>
      </div>

      {/* Difficulty Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleNewGame("easy")}
          className="rounded-lg bg-green-100 px-4 py-2 text-green-800 transition-colors hover:bg-green-200"
        >
          Easy
        </button>
        <button
          onClick={() => handleNewGame("medium")}
          className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800 transition-colors hover:bg-yellow-200"
        >
          Medium
        </button>
        <button
          onClick={() => handleNewGame("hard")}
          className="rounded-lg bg-red-100 px-4 py-2 text-red-800 transition-colors hover:bg-red-200"
        >
          Hard
        </button>
      </div>

      {/* Current difficulty indicator */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
          Difficulty: <span className="capitalize">{currentText.difficulty}</span>
          {currentText.source && ` • ${currentText.source}`}
        </span>
      </div>

      {/* Game Results (shown when finished) */}
      {gameState.status === "finished" && gameResult && (
        <GameResults result={gameResult} onPlayAgain={handlePlayAgain} />
      )}

      {/* Game Interface (shown when not finished) */}
      {gameState.status !== "finished" && (
        <>
          {/* Race Track */}
          <RaceTrack 
            progress={gameState.stats.progress} 
            wpm={gameState.stats.wpm}
          />

          {/* Stats Display */}
          <StatsDisplay 
            stats={gameState.stats} 
            status={gameState.status}
          />

          {/* Text Display */}
          <TextDisplay 
            characters={gameState.characters}
            currentIndex={gameState.currentIndex}
          />

          {/* Game Controls */}
          <GameControls
            status={gameState.status}
            onStart={startGame}
            onReset={resetGame}
            onPause={pauseGame}
          />

          {/* Instructions */}
          {gameState.status === "waiting" && (
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <p className="text-blue-800">
                📝 Start typing the text above to begin your race! 
                Use backspace to correct mistakes.
              </p>
            </div>
          )}

          {gameState.status === "paused" && (
            <div className="rounded-lg bg-yellow-50 p-4 text-center">
              <p className="text-yellow-800">
                ⏸️ Game is paused. Click Resume or press any key to continue.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}