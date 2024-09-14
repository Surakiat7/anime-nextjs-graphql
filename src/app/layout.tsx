import type { Metadata } from 'next';
import { Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { Provider } from './provider';
import { ApolloWrapper } from '@/api/apollo-wrapper';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'AnimeApollo',
  description:
    'AnimeApollo is your ultimate source for comprehensive anime information. Discover recommended anime, and easily search for anime by categories or title. Explore and find your next favorite anime here!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} antialiased`}>
        <Provider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </Provider>
      </body>
    </html>
  );
}
