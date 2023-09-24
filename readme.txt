to use the right node version and get the application running we first have to do

 nvm use v20.7.0 
 
 and then 
 
 npm run dev



 

------------------------------------------------------------------------------------------------------------------------------------------
 in case i want to do light and dark mode in the /Users/randyyono/Desktop/Desktop - Randy’s MacBook Pro/work-in-progress/Nextjs-tailwindcss-blog-template/src/components/About/AboutCoverSection.js make sure to uncomment the dark and light mode from /Users/randyyono/Desktop/Desktop - Randy’s MacBook Pro/work-in-progress/Nextjs-tailwindcss-blog-template/src/components/Header/index.js

 the following code goes in the /Users/randyyono/Desktop/Desktop - Randy’s MacBook Pro/work-in-progress/Nextjs-tailwindcss-blog-template/src/components/About/AboutCoverSection.js

 'use client';

import Image from 'next/image';
import React from 'react';
import profileCharacterLight from '../../../public/about-me-side.png';
import profileCharacterDark from '../../../public/about-me-side-yellow.png';
import { useThemeSwitch } from '../Hooks/useThemeSwitch';

const AboutCoverSection = () => {
  const [mode] = useThemeSwitch(); // Use the hook to get the current theme mode

  // Determine the source based on the theme mode
  const imageSrc =
    mode === 'dark' ? profileCharacterDark : profileCharacterLight;

  return (
    <section className="w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      <div className="w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center">
        <Image
          src={imageSrc} // Use the conditional source here
          alt="CodeBucks"
          className="w-4/5  xs:w-3/4 md:w-full h-full object-contain object-center"
          priority
          sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left">
          Beyond Coding, Into Diverse Pursuits!
        </h2>
        <p className="font-medium capitalize mt-4 text-base">
          Welcome to BeyondDevBlog. Here, I share my journey in coding and
          technology, but it doesn't stop there. I also explore side hustles,
          dive into financial tips, and discuss my experiences with affiliate
          marketing. This blog is a reflection of my diverse interests and
          continuous learning. I aim to provide useful insights and practical
          advice across a range of topics. Join me as I share what I've learned
          and discovered along the way.
        </p>
      </div>
    </section>
  );
};

export default AboutCoverSection;
------------------------------------------------------------------------------------------------------------------------------------------