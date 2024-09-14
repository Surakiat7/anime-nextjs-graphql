'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NextJSLogo from '../../components/Logo/Nextjs';
import {
  FaLinkedin,
  FaFacebookSquare,
  FaLine,
  FaGithubSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <main className='px-8 py-8 bg-slate-950 border-t border-white text-white w-full'>
      <div className="flex sm:flex-row flex-col justify-center w-full sm:justify-between pb-4 gap-4">
        <div className="flex w-full sm:justify-start justify-center items-center gap-6">
          <div className="flex w-fit justify-center items-center gap-2">
            <Image
              src='/AnimeLogo.png'
              alt="AnimeLogo"
              width={40}
              height={40}
              priority
              className="object-cover"
            />
          </div>
          <div
            className='flex gap-2 border-l border-white items-center'
          >
            <p
              className='pl-6 font-normal whitespace-nowrap text-white'
            >
              Made with.
            </p>
            <NextJSLogo />
          </div>
        </div>
        <div className="flex w-full sm:justify-end justify-center items-start">
          <div className="flex items-center gap-2">
            <Link
              aria-label="Visit our facebook profile"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.facebook.com/Surakiatz"
              className="transition-transform transform hover:translate-y-[-4px] duration-300"
            >
              <FaFacebookSquare color='white' className="h-8 w-8" />
            </Link>
            <Link
              aria-label="Visit our line add"
              rel="noopener noreferrer"
              target="_blank"
              href="https://line.me/ti/p/OtdDn-Ik0A"
              className="transition-transform transform hover:translate-y-[-4px] duration-300"
            >
              <FaLine color='white' className="h-8 w-8" />
            </Link>
            <Link
              aria-label="Visit our github profile"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/Surakiat7"
              className="transition-transform transform hover:translate-y-[-4px] duration-300"
            >
              <FaGithubSquare color='white' className="h-8 w-8" />
            </Link>
            <Link
              aria-label="Visit our linkedin profile"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/surakiat000/"
              className="transition-transform transform hover:translate-y-[-4px] duration-300"
            >
              <FaLinkedin color='white' className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className='flex w-full sm:justify-start justify-center border-t border-white pt-4'
      >
        <p className='text-sm sm:text-xs sm:text-center text-white'>
          © Copyright 2024 Surakiat.Dev  All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default Footer;
