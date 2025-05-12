import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <IntroductionSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
