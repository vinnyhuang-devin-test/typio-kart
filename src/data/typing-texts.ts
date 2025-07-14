import { type TypingText } from "@/types/game";

export const typingTexts: TypingText[] = [
  {
    id: "easy-1",
    difficulty: "easy",
    content: "The quick brown fox jumps over the lazy dog. This simple sentence contains every letter of the alphabet and is perfect for practicing typing skills.",
    source: "Classic pangram"
  },
  {
    id: "easy-2", 
    difficulty: "easy",
    content: "Cats are amazing pets. They are soft and fluffy. Many people love to have cats as companions because they are independent yet affectionate animals.",
    source: "Simple sentences"
  },
  {
    id: "medium-1",
    difficulty: "medium", 
    content: "Technology has revolutionized the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, innovation continues to shape our future in remarkable ways.",
    source: "Technology topic"
  },
  {
    id: "medium-2",
    difficulty: "medium",
    content: "The art of cooking involves creativity, patience, and skill. A great chef understands how different ingredients complement each other to create memorable dining experiences.",
    source: "Cooking topic"
  },
  {
    id: "hard-1", 
    difficulty: "hard",
    content: "Quantum mechanics, though counterintuitive, accurately describes the behavior of subatomic particles through mathematical frameworks that challenge our classical understanding of reality and causation.",
    source: "Science topic"
  },
  {
    id: "hard-2",
    difficulty: "hard", 
    content: "The implementation of sophisticated algorithms requires careful consideration of computational complexity, memory optimization, and edge-case handling to ensure robust performance across diverse scenarios.",
    source: "Programming topic"
  }
];

export function getRandomText(difficulty?: TypingText["difficulty"]): TypingText {
  const filtered = difficulty 
    ? typingTexts.filter(text => text.difficulty === difficulty)
    : typingTexts;
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex]!;
}

export function getTextById(id: string): TypingText | undefined {
  return typingTexts.find(text => text.id === id);
}