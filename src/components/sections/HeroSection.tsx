
"use client";
import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ParticleWindEffect } from '@/components/ui/ParticleWindEffect'; 
import { MoveRight } from 'lucide-react';

export const HeroSection: FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-primary/20" // Changed to-primary/10 to to-primary/20
    >
      <ParticleWindEffect />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]"> {/* Adjusted for navbar height consideration if section padding is removed */}
        <div className="max-w-2xl"> {/* Constrain width of text content */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="block">Hello, I'm Mayank</span>
            <span className="block text-primary">A Creative Developer</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 mx-auto">
            Crafting immersive digital experiences with passion and precision. Explore my work and let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="#projects">
                View My Work <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-sm hover:shadow-md transition-shadow">
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

