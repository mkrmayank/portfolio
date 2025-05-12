import type { FC } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer: FC = () => {
  return (
    <footer className="bg-background border-t border-border/50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <div className="flex justify-center space-x-4 mb-4">
          <Button variant="ghost" size="icon" asChild aria-label="GitHub Profile">
            <Link href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="LinkedIn Profile">
            <Link href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Email Mayank">
            <Link href="mailto:youremail@example.com">
              <Mail className="h-6 w-6" />
            </Link>
          </Button>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mayank's Digital Canvas. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};
