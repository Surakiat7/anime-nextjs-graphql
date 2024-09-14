'use client';

import { type ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export function Provider(props: AppProviderProps) {
  const { children, className } = props;

  return (
    <NextUIProvider className={className}>
      {children}
    </NextUIProvider>
  );
}

interface AppProviderProps {
  children: ReactNode;
  className?: string;
}
