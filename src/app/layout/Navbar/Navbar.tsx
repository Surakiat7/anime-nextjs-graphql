'use client';

import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react';
import Image from 'next/image';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Trending now', href: '/trending' },
    { name: 'Recommendations', href: '/recommendation' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand as={Link} href="/">
          <Image
            src={isScrolled ? '/AnimeLogo-NeonColor.png' : '/AnimeLogo.png'}
            alt="AnimeApolloLogo"
            width={50}
            height={50}
            priority
            className="cursor-pointer"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand as={Link} href="/">
          <Image
            src={isScrolled ? '/AnimeLogo-NeonColor.png' : '/AnimeLogo.png'}
            alt="AnimeApolloLogo"
            width={60}
            height={60}
            priority
            className="cursor-pointer"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link className="text-white" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="/trending">
            Trending now
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="/recommendation">
            Recommendations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link className="w-full text-white" href={item.href} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}