import type { FC } from 'react';
import { ContactForm } from '@/components/forms/ContactForm';
import { cn } from '@/lib/utils';
import { AnimatedHighlight } from '@/components/effects/AnimatedHighlight';

export const ContactSection: FC = () => {
  return (
    <section id="contact" className="bg-background">
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", "highlighted-container")}>
        <AnimatedHighlight />
        <div className="max-w-2xl mx-auto text-center relative z-10"> {/* Ensure content is above animation */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </div>
        <div className="max-w-xl mx-auto p-6 sm:p-8 bg-card rounded-xl shadow-2xl relative z-10"> {/* Ensure content is above animation */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
