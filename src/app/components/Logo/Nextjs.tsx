import React from 'react';
import Image from 'next/image';

const NextJSLogo: React.FC = () => {
  return (
    <Image
      src={'/Nextjs-Logo-White.png'}
      alt="NextJS Logo"
      width={70}
      height={70}
      loading="lazy"
      className="object-cover"
    />
  );
};

export default NextJSLogo;
