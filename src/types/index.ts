export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string; // For data-ai-hint, max two words
  githubUrl: string;
  tags: string[];
}
