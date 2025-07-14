interface RaceTrackProps {
  progress: number; // 0-100
  wpm: number;
}

export function RaceTrack({ progress, wpm }: RaceTrackProps) {
  const getCarEmoji = (wpm: number) => {
    if (wpm >= 60) return "🏎️"; // Fast car
    if (wpm >= 40) return "🚗"; // Regular car
    if (wpm >= 20) return "🚙"; // Slower car
    return "🐌"; // Very slow
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-gradient-to-r from-green-100 to-green-200 p-6">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Race Progress</h3>
      </div>
      
      {/* Track */}
      <div className="relative">
        {/* Track background */}
        <div className="h-16 rounded-full bg-gray-300 shadow-inner">
          {/* Track markings */}
          <div className="flex h-full items-center justify-between px-4">
            {Array.from({ length: 11 }, (_, i) => (
              <div
                key={i}
                className="h-8 w-0.5 bg-white opacity-60"
              />
            ))}
          </div>
        </div>
        
        {/* Progress bar */}
        <div 
          className="absolute top-0 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${Math.max(progress, 2)}%` }}
        />
        
        {/* Car */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transform text-3xl transition-all duration-500 ease-out"
          style={{ 
            left: `${Math.max(progress - 2, 0)}%`,
            transform: `translateY(-50%) ${progress > 95 ? 'scale(1.2)' : 'scale(1)'}`,
          }}
        >
          {getCarEmoji(wpm)}
        </div>
      </div>
      
      {/* Track labels */}
      <div className="mt-4 flex justify-between text-sm font-medium text-gray-600">
        <span>Start</span>
        <span className="text-center">
          {progress}% Complete
        </span>
        <span>Finish 🏁</span>
      </div>
      
      {/* Speed indicator */}
      <div className="mt-3 text-center">
        <span className="text-sm text-gray-600">Current Speed: </span>
        <span className="font-bold text-blue-600">{wpm} WPM</span>
      </div>
    </div>
  );
}