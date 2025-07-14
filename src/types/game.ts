export type GameStatus = "waiting" | "active" | "paused" | "finished";

export type CharacterStatus = "pending" | "correct" | "incorrect" | "current";

export interface TypingText {
  id: string;
  content: string;
  difficulty: "easy" | "medium" | "hard";
  source?: string;
}

export interface CharacterState {
  char: string;
  status: CharacterStatus;
  index: number;
}

export interface GameStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
  progress: number; // 0-100 percentage
}

export interface GameState {
  status: GameStatus;
  text: TypingText;
  currentIndex: number;
  characters: CharacterState[];
  stats: GameStats;
  startTime: number | null;
  endTime: number | null;
  errors: number[];
}

export interface GameResult extends GameStats {
  textId: string;
  difficulty: string;
  completedAt: Date;
}

export interface KeystrokeEvent {
  key: string;
  timestamp: number;
  isCorrect: boolean;
  expectedChar: string;
  actualChar: string;
}