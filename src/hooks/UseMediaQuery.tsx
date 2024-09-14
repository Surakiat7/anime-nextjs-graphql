import { useState, useEffect } from 'react';
import { MediaQueryRange } from '@/types';

const mediaQueries: Record<string, MediaQueryRange> = {
  sm: { min: '220px', max: '767px' },
  md: { min: '768px', max: '1023px' },
  lg: { min: '1024px', max: '1279px' },
  xl: { min: '1280px', max: '1660px' },
  xxl: { min: '1661px', max: '2560px' },
  xxxl: { min: '2561px' },
};

type MediaQueryKeys = keyof typeof mediaQueries;

const useMediaQuery = (queryKey: MediaQueryKeys) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const { min, max } = mediaQueries[queryKey];
    
    const query = `${min ? `(min-width: ${min})` : ''}${min && max ? ' and ' : ''}${max ? `(max-width: ${max})` : ''}`;
    const mediaQueryList = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener('change', updateMatches);

    updateMatches();

    return () => {
      mediaQueryList.removeEventListener('change', updateMatches);
    };
  }, [queryKey]);

  return matches;
};

export default useMediaQuery;