"use client";

import { useState, useCallback, useEffect } from "react";
import { type GameState, type TypingText, type KeystrokeEvent } from "@/types/game";
import { calculateStats, initializeCharacters, isValidTypingKey } from "@/utils/game-calculations";

interface UseTypingGameProps {
  text: TypingText;
}

export function useTypingGame({ text }: UseTypingGameProps) {
  const [gameState, setGameState] = useState<GameState>(() => ({
    status: "waiting",
    text,
    currentIndex: 0,
    characters: initializeCharacters(text.content),
    stats: {
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      timeElapsed: 0,
      progress: 0,
    },
    startTime: null,
    endTime: null,
    errors: [],
  }));

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: "active",
      startTime: Date.now(),
      endTime: null,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: "waiting",
      currentIndex: 0,
      characters: initializeCharacters(text.content),
      stats: {
        wpm: 0,
        accuracy: 100,
        correctChars: 0,
        incorrectChars: 0,
        totalChars: 0,
        timeElapsed: 0,
        progress: 0,
      },
      startTime: null,
      endTime: null,
      errors: [],
    }));
  }, [text.content]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: prev.status === "paused" ? "active" : "paused",
    }));
  }, []);

  const handleKeyPress = useCallback((keystroke: KeystrokeEvent) => {
    setGameState(prev => {
      if (prev.status !== "active") return prev;

      const { key } = keystroke;
      let newState = { ...prev };

      if (!isValidTypingKey(key)) return prev;

      if (key === "Backspace") {
        if (prev.currentIndex > 0) {
          const newIndex = prev.currentIndex - 1;
          const newCharacters = [...prev.characters];
          newCharacters[newIndex] = {
            ...newCharacters[newIndex]!,
            status: "pending",
          };

          newState = {
            ...prev,
            currentIndex: newIndex,
            characters: newCharacters,
          };
        }
      } else {
        const currentChar = prev.characters[prev.currentIndex];
        if (!currentChar) return prev;

        const isCorrect = key === currentChar.char;
        const newCharacters = [...prev.characters];
        newCharacters[prev.currentIndex] = {
          ...currentChar,
          status: isCorrect ? "correct" : "incorrect",
        };

        const newIndex = prev.currentIndex + 1;
        const newErrors = isCorrect ? prev.errors : [...prev.errors, prev.currentIndex];

        newState = {
          ...prev,
          currentIndex: newIndex,
          characters: newCharacters,
          errors: newErrors,
        };

        // Check if game is finished
        if (newIndex >= prev.characters.length) {
          newState.status = "finished";
          newState.endTime = Date.now();
        }
      }

      // Update stats
      newState.stats = calculateStats(
        newState.characters,
        newState.currentIndex,
        newState.startTime
      );

      return newState;
    });
  }, []);

  // Auto-start game on first valid keystroke
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default for all typing keys during active gameplay
      if (gameState.status === "active" && isValidTypingKey(event.key)) {
        event.preventDefault();
      }
      
      if (gameState.status === "waiting" && isValidTypingKey(event.key)) {
        // Start the game and immediately process the first keystroke
        startGame();
        
        const keystrokeEvent: KeystrokeEvent = {
          key: event.key,
          timestamp: Date.now(),
          isCorrect: event.key === gameState.characters[gameState.currentIndex]?.char,
          expectedChar: gameState.characters[gameState.currentIndex]?.char ?? "",
          actualChar: event.key,
        };
        
        setTimeout(() => {
          handleKeyPress(keystrokeEvent);
        }, 0);
        
        return;
      }
      
      if (gameState.status === "active") {
        handleKeyPress({
          key: event.key,
          timestamp: Date.now(),
          isCorrect: event.key === gameState.characters[gameState.currentIndex]?.char,
          expectedChar: gameState.characters[gameState.currentIndex]?.char ?? "",
          actualChar: event.key,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.status, gameState.currentIndex, gameState.characters, startGame, handleKeyPress]);

  return {
    gameState,
    startGame,
    resetGame,
    pauseGame,
    handleKeyPress,
  };
}
