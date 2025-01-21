import React, { useState } from 'react';

function SemesterComponent() {
  const [semesterType, setSemesterType] = useState('odd');

  return (
    <div className="h-fit p-6 bg-white shadow-lg rounded-md flex items-center justify-start flex-col">
      <h2 className="text-2xl font-bold text-black text-center mb-6">
        Semester Selection
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => setSemesterType('odd')}
          className={`w-full py-3 rounded-md transition-all duration-300 ${semesterType === 'odd'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
        >
          Odd Semester
        </button>

        <button
          onClick={() => setSemesterType('even')}
          className={`w-full py-3 rounded-md transition-all duration-300 ${semesterType === 'even'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
        >
          Even Semester
        </button>
      </div>

    </div>
  );
}

export default SemesterComponent;
