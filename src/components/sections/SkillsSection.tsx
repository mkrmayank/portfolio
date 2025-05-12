
import type { FC } from 'react';
import { SkillCloud } from '@/components/ui/SkillCloud';
import { cn } from '@/lib/utils';
import { AnimatedHighlight } from '@/components/effects/AnimatedHighlight';

const technicalSkills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", 
  "HTML5", "CSS3", "Tailwind CSS", "SQL", "NoSQL", "Docker", "Git", "AWS"
];
const softSkills = [
  "Problem Solving", "Teamwork", "Communication", "Creativity", "Adaptability", "Leadership"
];

export const SkillsSection: FC = () => {
  return (
    <section id="skills" className="bg-background/70 backdrop-blur-sm">
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", "highlighted-container")}>
        <AnimatedHighlight />
        <div className="relative z-10"> {/* Ensure content is above animation */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">My Skillset</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A blend of technical expertise and soft skills to bring ideas to life and collaborate effectively.
          </p>
          <div className="flex flex-col items-center gap-16">
            <div className="w-full max-w-2xl">
              <h3 className="text-2xl font-semibold text-center mb-6 text-primary">Technical Skills</h3>
              <SkillCloud skills={technicalSkills} bubbleColor="primary" />
            </div>
            <div className="w-full max-w-2xl">
              <h3 className="text-2xl font-semibold text-center mb-6 text-primary">Soft Skills</h3>
              <SkillCloud skills={softSkills} bubbleColor="primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

