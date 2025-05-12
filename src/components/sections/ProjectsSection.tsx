
"use client";
import type { FC } from 'react';
import React, { useState } from 'react'; // Import useState
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Mousewheel } from 'swiper/modules'; 

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import { ProjectCard } from '@/components/ui/ProjectCard';
import { projectsData } from '@/data/projects';
import { cn } from '@/lib/utils';
import { AnimatedHighlight } from '@/components/effects/AnimatedHighlight';

export const ProjectsSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  return (
    <section id="projects" className="bg-background py-16 md:py-24"> {/* Removed overflow-hidden here, handled by globals.css body */}
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", "highlighted-container")}>
        <AnimatedHighlight />
        <div className="relative z-10"> {/* Ensure content is above animation */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">My Projects</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A selection of my favorite projects. Click on any card to explore the code and details on GitHub.
          </p>
        </div>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          slideToClickedSlide={true} 
          mousewheel={true} 
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} 
          coverflowEffect={{
            rotate: 0,
            stretch: -20, 
            depth: 100,
            modifier: 1.5, 
            slideShadows: false, 
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Mousewheel]} 
          className="w-full pb-12 pt-4 project-swiper relative z-10"  // Ensure swiper is above animation
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              coverflowEffect: {
                rotate: 0,
                stretch: -10,
                depth: 100,
                modifier: 1,
              },
            },
            768: {
               slidesPerView: 'auto', 
               coverflowEffect: {
                rotate: 0,
                stretch: -20,
                depth: 100,
                modifier: 1.5,
              },
            }
          }}
        >
          {projectsData.map((project, index) => (
            <SwiperSlide 
              key={project.id} 
              className={cn(
                "md:!w-[50vw] !w-[80vw]", 
                "project-swiper-slide group h-auto" 
              )}
            >
              <div className="h-full"> 
                <ProjectCard project={project} isActive={index === activeIndex} /> 
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
