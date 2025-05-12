"use client";
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SkillCloudProps {
  skills: string[];
  bubbleColor?: 'primary' | 'secondary' | 'muted'; // Optional prop for bubble color theme
}

const BUBBLE_BASE_CLASSES = "px-4 py-2 text-sm font-medium border transition-all duration-500 ease-out transform scale-90 opacity-0 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-105";

const BUBBLE_COLOR_VARIANTS = {
  primary: "border-primary/50 text-primary hover:shadow-primary/30",
  secondary: "border-secondary-foreground/30 text-secondary-foreground hover:shadow-secondary/30",
  muted: "border-muted-foreground/30 text-muted-foreground hover:shadow-muted-foreground/20",
};

export const SkillCloud: FC<SkillCloudProps> = ({ skills, bubbleColor = 'primary' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setVisibleSkills(prev => Array.from(new Set([...prev, skill])));
            }, index * 100); 
          });
          observer.unobserve(currentContainer); 
        }
      },
      { threshold: 0.1 } // Lowered threshold for earlier animation trigger
    );

    observer.observe(currentContainer);
    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  }, [skills]);

  return (
    <div 
      ref={containerRef} 
      className="flex flex-wrap gap-3 sm:gap-4 justify-center p-4 rounded-xl" // Removed bg-card/50 and shadow-inner
    >
      {skills.map((skill, index) => (
        <Badge
          key={`${skill}-${index}`} // Ensure unique keys if skills can repeat
          variant="outline"
          className={cn(
            BUBBLE_BASE_CLASSES,
            BUBBLE_COLOR_VARIANTS[bubbleColor],
            visibleSkills.includes(skill) && "scale-100 opacity-100"
          )}
          style={{ animationDelay: `${index * 75}ms`, transitionDelay: `${index * 50}ms` }} 
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
};
