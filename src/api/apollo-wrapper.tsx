'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
