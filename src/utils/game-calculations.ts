import { type CharacterState, type GameStats } from "@/types/game";

export function calculateWPM(correctChars: number, timeElapsedMs: number): number {
  if (timeElapsedMs === 0) return 0;
  
  const timeInMinutes = timeElapsedMs / 1000 / 60;
  const wordsTyped = correctChars / 5; // Standard: 5 characters = 1 word
  
  return Math.round(wordsTyped / timeInMinutes);
}

export function calculateAccuracy(correctChars: number, totalTypedChars: number): number {
  if (totalTypedChars === 0) return 100;
  return Math.round((correctChars / totalTypedChars) * 100);
}

export function calculateProgress(currentIndex: number, totalChars: number): number {
  if (totalChars === 0) return 0;
  return Math.round((currentIndex / totalChars) * 100);
}

export function calculateStats(
  characters: CharacterState[],
  currentIndex: number,
  startTime: number | null
): GameStats {
  const correctChars = characters.slice(0, currentIndex).filter(char => char.status === "correct").length;
  const incorrectChars = characters.slice(0, currentIndex).filter(char => char.status === "incorrect").length;
  const totalTypedChars = correctChars + incorrectChars;
  const timeElapsed = startTime ? Date.now() - startTime : 0;
  
  return {
    wpm: calculateWPM(correctChars, timeElapsed),
    accuracy: calculateAccuracy(correctChars, totalTypedChars),
    correctChars,
    incorrectChars,
    totalChars: totalTypedChars,
    timeElapsed,
    progress: calculateProgress(currentIndex, characters.length),
  };
}

export function isValidTypingKey(key: string): boolean {
  // Allow printable characters, space, and backspace
  return (
    key.length === 1 ||
    key === "Backspace" ||
    key === " "
  );
}

export function initializeCharacters(text: string): CharacterState[] {
  return text.split("").map((char, index) => ({
    char,
    status: "pending" as const,
    index,
  }));
}