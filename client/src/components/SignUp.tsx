'use client';

import { SignUp, useUser, useSignUp } from '@clerk/nextjs';
import React, { useState } from 'react';
import { dark } from '@clerk/themes';
import { useSearchParams } from 'next/navigation';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Loading from './Loading';

const SignUpComponent = () => {
  const { isLoaded } = useSignUp();
  const { user } = useUser();
  const searchParams = useSearchParams();
  const isCheckoutPage = searchParams.get('showSignUp') !== null;
  const courseId = searchParams.get('id');
  // const [userType, setUserType] = useState<'teacher' | 'student'>('student'); // Default to 'student'

  const signInUrl = isCheckoutPage ? `/checkout?step=1&id=${courseId}&showSignUp=false` : '/signin';

  const getRedirectUrl = () => {
    // if (isCheckoutPage) {
    //   return `/checkout?step=2&id=${courseId}&showSignUp=false`;
    // }

    const userType = user?.publicMetadata?.userType as string;
    if (userType === 'teacher') {
      return '/teacher/courses';
    }
    return '/user/courses';
  };

  if (isLoaded) {
    return (
      <div className='flex flex-col items-center gap-4'>
        {/* <RadioGroup
          value={userType}
          onValueChange={(value) => setUserType(value as 'teacher' | 'student')}
          className='flex justify-center w-full gap-4'
        >
          <div className='flex items-center gap-2'>
            <RadioGroupItem
              value='student'
              id='student'
              className='appearance-none border-2 border-gray-300 rounded-full w-5 h-5 bg-gray-200 checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none'
            />
            <label htmlFor='student' className='text-sm font-medium text-white'>
              I Am A Student
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <RadioGroupItem
              value='teacher'
              id='teacher'
              className='appearance-none border-2 border-gray-300 rounded-full w-5 h-5 bg-gray-200 checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none'
            />
            <label htmlFor='teacher' className='text-sm font-medium text-white'>
              I Am A Teacher
            </label>
          </div>
        </RadioGroup> */}

        <SignUp
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: 'flex justify-center items-center py-5',
              cardBox: 'shadow-none',
              card: 'bg-customgreys-secondarybg w-full shadow-none',
              footer: {
                background: '#25262F',
                padding: '0rem 2.5rem',
                '& > div > div:nth-child(1)': {
                  background: '#25262F',
                },
              },
              formFieldLabel: 'text-white-50 font-normal',
              formButtonPrimary: 'bg-primary-700 text-white-100 hover:bg-primary-600 !shadow-none',
              formFieldInput: 'bg-customgreys-primarybg text-white-50 !shadow-none',
              footerActionLink: 'text-primary-750 hover:text-primary-600',
            },
          }}
          signInUrl={signInUrl}
          forceRedirectUrl={getRedirectUrl()}
          routing='hash'
          afterSignOutUrl='/'
        />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default SignUpComponent;
