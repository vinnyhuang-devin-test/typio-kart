import { type CharacterState } from "@/types/game";

interface TextDisplayProps {
  characters: CharacterState[];
  currentIndex: number;
}

export function TextDisplay({ characters, currentIndex }: TextDisplayProps) {
  return (
    <div className="relative mx-auto max-w-4xl rounded-lg bg-gray-50 p-8 font-mono text-2xl leading-relaxed">
      <div className="flex flex-wrap">
        {characters.map((char, index) => (
          <span
            key={index}
            className={`relative ${getCharacterStyle(char.status, index === currentIndex)}`}
          >
            {char.char === " " ? "\u00A0" : char.char}
            {index === currentIndex && (
              <span className="absolute -inset-x-0.5 -inset-y-1 animate-pulse border-l-2 border-blue-500" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function getCharacterStyle(status: CharacterState["status"], isCurrent: boolean): string {
  const baseStyle = "transition-colors duration-150";
  
  if (isCurrent) {
    return `${baseStyle} bg-blue-100 text-blue-900`;
  }
  
  switch (status) {
    case "correct":
      return `${baseStyle} text-green-600 bg-green-50`;
    case "incorrect":
      return `${baseStyle} text-red-600 bg-red-100 underline decoration-red-500`;
    case "pending":
      return `${baseStyle} text-gray-600`;
    default:
      return baseStyle;
  }
}