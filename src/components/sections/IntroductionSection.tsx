
"use client";
import type { FC } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedHighlight } from '@/components/effects/AnimatedHighlight';

export const IntroductionSection: FC = () => {
  return (
    <section id="introduction" className="bg-card/30 backdrop-blur-sm py-16 md:py-24">
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", "highlighted-container")}>
        <AnimatedHighlight />
        <div className="grid md:grid-cols-3 gap-12 items-center relative z-10"> {/* Ensure content is above animation */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
              <Image
                src="https://picsum.photos/seed/mayankprofile/300/300"
                alt="Mayank - Creative Developer"
                width={300}
                height={300}
                className="transform transition-transform duration-500 hover:scale-110 object-cover"
                data-ai-hint="professional portrait"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-primary text-center md:text-left">About Me</h2>
            {/* Container for paragraphs, now stacking them vertically */}
            <div className="flex flex-col gap-8">
              {/* First paragraph in a box, left-aligned, 75% width on md+ */}
              <div className="w-full md:w-3/4">
                <div className="bg-card p-6 rounded-xl shadow-xl">
                  <p className="text-lg text-muted-foreground leading-relaxed text-left">
                    Hi, I'm Mayank, a passionate and creative developer with a knack for building elegant and efficient solutions.
                    I thrive on turning complex problems into intuitive and engaging digital experiences. With a strong foundation
                    in modern web technologies, I'm always eager to learn and explore new tools and techniques.
                  </p>
                </div>
              </div>
              {/* Second paragraph, right-aligned text on desktop, 75% width on md+, pushed to right */}
              <div className="w-full md:w-3/4 md:ml-auto">
                <p className="text-lg text-muted-foreground leading-relaxed text-left md:text-right">
                  My journey in tech is driven by a curiosity to understand how things work and a desire to create impactful
                  software. When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and
                  staying updated with the latest industry trends.
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
                {/* Placeholder for resume download, update href appropriately */}
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download Resume <Download className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex gap-2 justify-center md:justify-start">
                 <Button variant="outline" size="icon" asChild aria-label="GitHub Profile">
                    <Link href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    </Link>
                </Button>
                <Button variant="outline" size="icon" asChild aria-label="LinkedIn Profile">
                    <Link href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
