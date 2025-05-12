
"use client";
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { ArrowUpRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  isActive: boolean; // New prop
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, isActive }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentCard = cardRef.current;
    if (!currentCard) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentCard.classList.add('is-visible');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentCard);
    return () => {
      if (currentCard) observer.unobserve(currentCard);
    };
  }, []);
  
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isActive) {
      event.preventDefault();
    }
  };

  return (
    <div ref={cardRef} className={cn("animate-on-scroll h-full")}> {/* Ensure div takes full height */}
      <Link 
        href={project.githubUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block group h-full" // Ensure link takes full height
        onClick={handleLinkClick} // Prevent navigation if not active
        aria-disabled={!isActive} // For accessibility
        tabIndex={isActive ? 0 : -1} // For keyboard navigation
        style={{ pointerEvents: isActive ? 'auto' : 'none' }} // Prevent interactions if not active
      >
        <Card className={cn(
          "h-full flex flex-col overflow-hidden bg-card transition-all duration-300 transform",
          isActive ? "hover:shadow-xl hover:border-primary/50 hover:-translate-y-1" : "cursor-pointer", 
          !isActive && "select-none" 
        )}>
          <CardHeader>
            <div className="relative w-full h-48 mb-4 rounded-t-md overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className={cn(
                  "transition-transform duration-300",
                  isActive && "group-hover:scale-105"
                )}
                data-ai-hint={project.imageHint}
                priority={isActive} // Prioritize loading image for active card
              />
            </div>
            <CardTitle className={cn(
              "text-xl font-semibold transition-colors duration-300 flex items-center justify-between",
              isActive && "group-hover:text-primary"
            )}>
              {project.title}
              <ArrowUpRight className={cn(
                "h-5 w-5 text-muted-foreground transition-colors duration-300 transform -translate-x-2",
                isActive && "group-hover:text-primary group-hover:opacity-100 group-hover:translate-x-0",
                !isActive && "opacity-0" 
              )} />
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground flex-grow min-h-[60px]">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {/* Content can be added here if needed */}
          </CardContent>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
