import Image from 'next/image';
import React from 'react';
import profileCharacter from '../../../public/about-me-side.png';

const AboutCoverSection = () => {
  return (
    <section className="w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      <div className="w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center">
        <Image
          src={profileCharacter}
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
