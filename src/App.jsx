import React, { useState } from 'react';

export default function App() {
  // number of boxes
  const numberOfBoxes = 10;

  // rotation index 0-3 (1 to 4)
  const [boxRotations, setBoxRotations] = useState(Array(numberOfBoxes).fill(0));

  // 4 color rotation
  // base color is blue
  const rotationColors = [
    'bg-blue-500 hover:bg-blue-600',   
    'bg-green-500 hover:bg-green-600',
    'bg-orange-500 hover:bg-orange-600',   
    'bg-pink-500 hover:bg-pink-600',   
  ];

  // handles box click rotation 
  const handleBoxClick = (index) => {
    setBoxRotations((prevRotations) => {
      const newRotations = [...prevRotations];
      // 0 to 1 to 2 to 3 to 4 to 0 again
      newRotations[index] = (newRotations[index] + 1) % 4;
      return newRotations;
    });
  };

  return (
    // css flexbox
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">4-color rotation boxes</h1>
      </div>

      {/* boxes lined up in the center */}
      <div className="flex flex-wrap justify-center gap-4 bg-slate-800 p-6 rounded-2xl shadow-xl">
        {boxRotations.map((rotationIndex, index) => (
          <button
            key={index}
            onClick={() => handleBoxClick(index)}
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center font-semibold text-lg cursor-pointer ${rotationColors[rotationIndex]}`}
          >
            {rotationIndex + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
