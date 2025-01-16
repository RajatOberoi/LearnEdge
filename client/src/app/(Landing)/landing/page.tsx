'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCarousel } from '@/hooks/useCarousel';
import { useGetCoursesQuery, useUpdateUserMutation } from '@/state/apiDevelopment';
import CourseCardSearch from '@/components/CourseCardSearch';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import MadeWithHeart from '@/components/MadeWithHeart';
import { useUser, useAuth } from '@clerk/nextjs';
import { Bell, BookOpen } from 'lucide-react';

const LoadingSkeleton = () => {
  return (
    <div className='landing-skeleton'>
      <div className='landing-skeleton__hero'>
        <div className='landing-skeleton__hero-content'>
          <Skeleton className='landing-skeleton__title' />
          <Skeleton className='landing-skeleton__subtitle' />
          <Skeleton className='landing-skeleton__subtitle-secondary' />
          <Skeleton className='landing-skeleton__button' />
        </div>
        <Skeleton className='landing-skeleton__hero-image' />
      </div>

      <div className='landing-skeleton__featured'>
        <Skeleton className='landing-skeleton__featured-title' />
        <Skeleton className='landing-skeleton__featured-description' />

        <div className='landing-skeleton__tags'>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={index} className='landing-skeleton__tag' />
          ))}
        </div>

        <div className='landing-skeleton__courses'>
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} className='landing-skeleton__course-card' />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Landing = () => {
  const currentImage = useCarousel({ totalContent: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [updateUser] = useUpdateUserMutation();
  const currentSettings = (user?.publicMetadata as { settings?: UserSettings })?.settings || {};
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleSave = async () => {
    if (!user) return;

    const updatedUser = {
      userId: user?.id,
      publicMetadata: {
        ...user?.publicMetadata,
        userType: selectedRole,
        settings: {
          ...currentSettings,
        },
      },
    };

    try {
      setLoading(true);
      await updateUser(updatedUser);
      await getToken({ skipCache: true });
      selectedRole === 'student'
        ? router.push('/user/profile', { scroll: false })
        : router.push('/teacher/profile', { scroll: false });
    } catch (error) {
      setLoading(false);
      console.error('Failed to update user settings: ', error);
    }
  };

  const handleCourseClick = (courseID: string) => {
    router.push(`/search?id=${courseID}`);
  };

  if (isLoading || !isLoaded) return <LoadingSkeleton />;
  if (user && !user?.publicMetadata?.userType) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl shadow-lg w-80'>
          <h2 className='text-white text-2xl font-bold mb-6'>Select Your Role</h2>
          <div className='space-y-4'>
            <button
              onClick={() => handleSelect('student')}
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold border-2 ${
                selectedRole === 'student' ? 'bg-white text-gray-900 border-gray-900' : 'bg-transparent border-white'
              }`}
            >
              I am a student
            </button>
            <button
              onClick={() => handleSelect('teacher')}
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold border-2 ${
                selectedRole === 'teacher' ? 'bg-white text-gray-900 border-gray-900' : 'bg-transparent border-white'
              }`}
            >
              I am a teacher
            </button>
          </div>
          <div className='mt-6'>
            <button
              onClick={handleSave}
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold border-2 ${
                loading || !selectedRole
                  ? 'bg-gray-500 border-gray-500 cursor-not-allowed'
                  : 'bg-green-500 border-green-500'
              }`}
              disabled={loading || !selectedRole}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='relative w-full overflow-hidden'>
        <div className='relative flex flex-col w-full justify-center items-center z-10'>
          <div className='relative max-w-5xl mx-auto pt-10 sm:pt-12 lg:pt-16 my-40'>
            <h1 className='font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white'>
              Learn{' '}
              <motion.span
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #ff0044, #9b00ff, #ff0044)', // Initial red and purple gradient from bottom
                }}
                whileInView={{
                  backgroundImage: [
                    'linear-gradient(to bottom, #ff0044, #9b00ff, #ff0044)', // Initial gradient from bottom
                    'linear-gradient(to top, #9b00ff, #ff0044, #9b00ff)', // Reverse gradient from top
                    'linear-gradient(to top, #ffffff, #ffffff, #ffffff)', // Final white gradient (no color)
                    'linear-gradient(to bottom, #ff0044, #9b00ff, #ff0044)', // Back to original red and violet gradient from bottom
                  ],
                }}
                transition={{
                  duration: 4, // Duration of the whole animation
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'backInOut',
                }}
                className='bg-clip-text animate-wave-vertical text-transparent'
              >
                Skills
              </motion.span>
              That Build Careers
            </h1>

            <p className='mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400'>
              Gain industry-relevant expertise through{' '}
              <code className='font-mono font-medium text-sky-500 dark:text-sky-400'>courses</code>,{' '}
              <code className='font-mono font-medium text-sky-500 dark:text-sky-400'>designed</code> to equip you with
              the <code className='font-mono font-medium text-sky-500 dark:text-sky-400'> practical skills </code>
              employers value most.
            </p>
            <div className='flex items-center gap-4 mt-4 justify-center'>
              <Link
                className='text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-500 dark:highlight-white/20 hover:bg-sky-400'
                href='/search'
              >
                Get started
              </Link>
              <div className='relative group'>
                <Link href={'/search'} className='landingpage-navbar__search-input' scroll={false}>
                  <span className='hidden md:inline'>Search For Courses</span>
                  <span className='md:hidden'>Search</span>
                </Link>
                <BookOpen className='landingpage-navbar__search-icon' size={18} />
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='landing mt-40'
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='landing__hero'
            >
              <div className='landing__hero-content'>
                <h1 className='landing__title'>Courses</h1>
                <p className='landing__description'>
                  These are the list of courses you can enroll in
                  <br />
                  Learning Guranteed
                </p>
                <div className='landing__cta'>
                  <Link href={'/search'} scroll={false}>
                    <div className='landing__cta-button'>Search for Courses</div>
                  </Link>
                </div>
              </div>
              <div className='landing__hero-images'>
                {['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'].map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`hero-content ${index + 1}`}
                    fill
                    priority={index === currentImage}
                    sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw'
                    className={`landing__hero-image ${index === currentImage ? 'landing__hero-image--active' : ''}`}
                  />
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ amount: 0.3, once: true }}
              className='landing__featured'
            >
              <h2
                className='landing__featured-title'
                style={{
                  background: 'linear-gradient(0deg,#fff,#ffffffc2)',
                  backgroundClip: 'text',
                  textAlign: 'center',
                }}
              >
                Featured Description
              </h2>
              <p className='landing__featured-description'>We have all the right courses for you</p>
              <div className='landing__courses'>
                {courses &&
                  courses.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item.courseId}
                      initial={{ y: 50, opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ amount: 0.4 }}
                    >
                      <CourseCardSearch onClick={() => handleCourseClick(item?.courseId)} course={item} />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.3, once: true }}
            className='w-9/12'
          >
            <MadeWithHeart />
          </motion.div>
        </div>
        <motion.div
          className='absolute inset-0 z-0'
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect x='10' y='10' width='180' height='80' fill='none' stroke='white' stroke-width='2' stroke-dasharray='4,4' /%3E%3C/svg%3E\")",
            backgroundPosition: 'center 20%',
            backgroundSize: 'constrained',
            backgroundRepeat: 'repeat',
          }}
          initial={{ opacity: 0.2, rotate: 0 }} // Start with 80% opacity
          animate={{ opacity: 0.01, rotate: 360 }} // Animate opacity to 10%
          transition={{
            duration: 3,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }
};

export default Landing;
