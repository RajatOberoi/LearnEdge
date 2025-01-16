import React, { useState, useMemo } from 'react';
import { HeartPulse } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MadeWithHeart = () => {
  const [tech, setTech] = useState({ techName: '', color: '' });

  const techWithColors = useMemo(
    () => [
      { name: 'React', gradient: 'from-blue-500 to-blue-600', textColor: 'text-blue-500' },
      { name: 'JavaScript', gradient: 'from-yellow-400 to-yellow-500', textColor: 'text-yellow-400' },
      { name: 'NodeJS', gradient: 'from-green-500 to-green-600', textColor: 'text-green-500' },
      { name: 'Redux', gradient: 'from-purple-500 to-purple-700', textColor: 'text-purple-500' },
      { name: 'Tailwind', gradient: 'from-sky-400 to-sky-500', textColor: 'text-sky-400' },
      { name: 'MongoDB', gradient: 'from-green-400 to-green-500', textColor: 'text-green-400' },
      { name: 'AWS', gradient: 'from-orange-500 to-orange-600', textColor: 'text-orange-500' },
      { name: 'TypeScript', gradient: 'from-blue-400 to-blue-600', textColor: 'text-blue-400' },
      { name: 'Next', gradient: 'from-gray-600 to-gray-800', textColor: 'text-gray-600' },
      { name: 'Docker', gradient: 'from-blue-600 to-blue-700', textColor: 'text-blue-600' },
    ],
    []
  );

  const techCard = useMemo(
    () =>
      techWithColors.map((item) => (
        <div
          className='relative p-4 flex justify-center items-center z-[1]'
          key={item.name}
          onMouseEnter={() => setTech({ techName: item.name, color: item.textColor })}
        >
          <div className='relative group w-28 h-28 flex justify-center items-center'>
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-3000 group-hover:duration-200`}
            ></div>

            <div className='relative flex justify-center items-center w-24 h-24 border border-[rgba(38,38,38,0.7)] bg-customgreys-secondarybg rounded-lg'>
              <div className='relative h-4/5 w-4/5'>
                <Image
                  src={`/${item.name.toLowerCase()}.svg`}
                  alt={item.name}
                  width={100}
                  height={100}
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )),
    []
  );

  return (
    <div
      className='grid grid-cols-2 sm:grid-cols-4 gap-0 overflow-hidden madewith-heart-wrapper'
      onMouseLeave={() => setTech({ techName: '', color: '' })}
    >
      <div
        className='col-span-2 flex items-center justify-center p-4 z-[1]'
        onMouseEnter={() => setTech({ techName: '', color: '' })}
      >
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-2xl text-center bg-gradient-to-b from-white to-white/75 bg-clip-text'>Made With</h2>
          <div className='h-10 flex items-center justify-center mt-2'>
            {tech.techName ? (
              <motion.span
                key={tech.techName}
                className={`${tech.color} text-2xl`}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5 }}
              >
                {`'${tech.techName}'`}
              </motion.span>
            ) : (
              <HeartPulse className='text-2xl' />
            )}
          </div>
        </div>
      </div>
      {techCard}
    </div>
  );
};

export default React.memo(MadeWithHeart);
