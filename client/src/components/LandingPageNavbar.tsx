'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const LandingPageNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as 'student' | 'teacher';

  return (
    <nav className='landingpage-navbar'>
      <div className='flex rounded-lg w-3/4 justify-between items-center relative mt-4 h-[12vh] sm:h-[10vh] group'>
        <div className='absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 rounded-lg blur-md transition-transform duration-300 group-hover:scale-105'></div>
        <div className='landingpage-navbar__container flex-wrap relative bg-white-100 bg-opacity-50 rounded-lg shadow-md py-2 px-4 backdrop-blur-[5px] backdrop-saturate-[180%] h-[80%] transition-transform duration-300 group-hover:translate-y-[-2px] box-content'>
          <div className='landingpage-navbar__search'>
            <Link href={'/'} className='landingpage-navbar__brand' scroll={false}>
              LearnEdge
            </Link>
          </div>
          <div className='landingpage-navbar__actions mt-2'>
            <button className='landingpage-navbar__notification-button'>
              <span className='landingpage-navbar__notification-indicator'></span>
              <Bell className='landingpage-navbar__notification-icon' />
            </button>
            <SignedIn>
              <UserButton
                appearance={{
                  baseTheme: dark,
                  elements: {
                    userButtonOuterIdentifier: 'text-customgreys-dirtyGrey',
                    userButtonBox: 'scale-90 sm:scale-100',
                  },
                }}
                showName={true}
                userProfileMode='navigation'
                userProfileUrl={userRole === 'teacher' ? '/teacher/profile' : '/user/profile'}
              />
            </SignedIn>
            <SignedOut>
              <Link href='/signin' className='landingpage-navbar__auth-button--login' scroll={false}>
                Log in
              </Link>
              <Link href='/signup' className='landingpage-navbar__auth-button--signup' scroll={false}>
                Sign up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
