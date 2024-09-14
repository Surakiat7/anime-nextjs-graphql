import { useEffect, useState } from 'react';

export function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const navbar = document.querySelector('.navbar-container');
      if (navbar) {
        setNavbarHeight(navbar.getBoundingClientRect().height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return navbarHeight;
}

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
}
