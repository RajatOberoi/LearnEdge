'use client';
import Landing from '@/app/(Landing)/landing/page';
import { motion } from 'framer-motion';

const LayoutWrapper = () => {
  return (
    <motion.div
      className='userlanding-layout__main'
      style={{
        backgroundImage: 'linear-gradient(to right, #38b2ac, #1a202c)',
      }}
      initial={{ backgroundPosition: 'center top' }}
      animate={{
        backgroundPosition: '100% 100%', // Starts from the center and top
      }}
      transition={{
        duration: 2, // Time to animate the effect
        ease: 'easeOut', // Smooth transition
      }}
    >
      <Landing />
    </motion.div>
  );
};

export default LayoutWrapper;
