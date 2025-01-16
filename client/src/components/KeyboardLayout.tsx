const KeyboardLayout: React.FC = () => {
  const techWithColors = [
    { name: 'React', gradient: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', gradient: 'from-yellow-400 to-yellow-500' },
    { name: 'NodeJS', gradient: 'from-green-500 to-green-600' },
    { name: 'Redux', gradient: 'from-purple-500 to-purple-700' },
    { name: 'Tailwind', gradient: 'from-sky-400 to-sky-500' },
    { name: 'MongoDB', gradient: 'from-green-400 to-green-500' },
    { name: 'AWS', gradient: 'from-orange-500 to-orange-600' },
    { name: 'TypeScript', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Next', gradient: 'from-gray-600 to-gray-800' },
    { name: 'Docker', gradient: 'from-blue-600 to-blue-700' },
  ];

  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 p-6'>
      {/* Top row: Empty containers */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={`empty-top-${idx}`}
          className='relative w-[94px] h-[94px] rounded-lg bg-customgreys-secondarybg'
        ></div>
      ))}

      {/* Second row: Actual items (centered and surrounded by empty containers) */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={`second-row-${idx}`}
          className={`relative flex justify-center items-center w-[94px] h-[94px] rounded-lg ${
            idx >= 1 && idx <= 4 // Items in the middle
              ? 'border border-[rgba(38,38,38,0.7)] bg-customgreys-secondarybg'
              : 'bg-customgreys-secondarybg' // Empty containers
          }`}
        >
          {idx >= 1 && idx <= 4 && (
            <img
              src={`/${techWithColors[idx - 1].name.toLowerCase()}.svg`}
              alt={techWithColors[idx - 1].name}
              className='w-[60px] h-[60px]'
            />
          )}
        </div>
      ))}

      {/* Add more rows dynamically */}
      {/* Third row */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={`third-row-${idx}`}
          className={`relative flex justify-center items-center w-[94px] h-[94px] rounded-lg ${
            idx >= 2 && idx <= 4 // Items in the middle
              ? 'border border-[rgba(38,38,38,0.7)] bg-customgreys-secondarybg'
              : 'bg-customgreys-secondarybg' // Empty containers
          }`}
        >
          {idx >= 2 && idx <= 4 && (
            <img
              src={`/${techWithColors[idx - 2].name.toLowerCase()}.svg`}
              alt={techWithColors[idx - 2].name}
              className='w-[60px] h-[60px]'
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default KeyboardLayout;
