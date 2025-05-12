
"use client";
import type { FC } from 'react';
import Link from 'next/link';
import { Code2 } from 'lucide-react'; // Using Code2 as a placeholder logo icon
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#introduction', label: 'About' }, // Changed label to 'About' for brevity
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar: FC = () => {
  const pathname = usePathname(); // if used on other pages, this will update
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [navbarBg, setNavbarBg] = useState<string>('bg-transparent');

  useEffect(() => {
    const handleScroll = () => {
      // Navbar background change
      if (window.scrollY > 50) {
        setNavbarBg('bg-background/80 backdrop-blur-md');
      } else {
        setNavbarBg('bg-transparent');
      }

      // Active section highlighting
      // Iterate backwards to prioritize sections lower on the page if multiple are in view
      let currentSection = '';
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const sectionElement = document.getElementById(item.href.substring(1));
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          // Section is active if its top is within the top 75% of the viewport height
          if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
             currentSection = item.href;
             break; 
          }
        }
      }
      // Default to hero if no other section is active (e.g., at the very top or very bottom)
      if (!currentSection && window.scrollY < window.innerHeight / 2) {
        currentSection = '#hero';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call on mount to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Removed navItems from dependencies as it's constant
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      navbarBg
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="#hero" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            <Code2 className="h-7 w-7" />
            Mayank's Canvas
          </Link>
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild
                className={cn(
                  "text-foreground/80 hover:text-foreground hover:bg-accent/20 px-3 py-2 text-sm",
                  activeSection === item.href && "text-primary font-semibold bg-accent/10"
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <div className="md:hidden">
            {/* Mobile menu can be added here if needed 
                For now, keeping it simple as per single page design.
            */}
          </div>
        </div>
      </div>
    </header>
  );
};
