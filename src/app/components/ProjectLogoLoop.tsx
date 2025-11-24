'use client';
import React from 'react';
import LogoLoop from '@/components/LogoLoop';
import projectData from '../../data/project.json';
import ProjectFrame from './ProjectFrame';

// Define the Project interface
interface Project {
  id: number;
  image: string;
  name: string;
  live_link?: string;
  techStack: string;
  link: string;
  description: string;
  features: string[];
  challenges?: string[];
  learnings?: string[];
}

// Define LogoLoop props interface
interface LogoLoopProps {
  logos: {
    node: React.ReactNode;
    title: string;
    ariaLabel: string;
  }[];
  speed: number;
  direction: string;
  logoHeight: number;
  gap: number;
  hoverSpeed: number;
  scaleOnHover: boolean;
  fadeOut: boolean;
  ariaLabel: string;
}

// Type assertion for LogoLoop since it's a .jsx file
const TypedLogoLoop = LogoLoop as React.ComponentType<LogoLoopProps>;

const ProjectLogoLoop = () => {
  // Only use projects from the projects array
  const allProjects = projectData.project.projects as Project[];

  // Create logo items with ProjectFrame components
  const projectLogos = allProjects.map((project: Project, index: number) => ({
    node: (
      <div key={`project-${project.id}-${index}`} className="w-[280px] h-[360px] sm:w-[250px] sm:h-[420px] md:w-[500px] md:h-[480px]" onClick={(e) => e.stopPropagation()}>
        <ProjectFrame
          image={project.image}
          name={project.name}
          techStack={project.techStack}
          link={project.link}
          projectId={project.id}
          description={project.description}
          features={project.features}
          challenges={project.challenges}
          learnings={project.learnings}
          live_link={project.live_link}
          isVideo={project.image?.includes('.mp4') || project.image?.includes('.mov') || project.image?.includes('.GIF')}
          className="w-full h-full"
        />
      </div>
    ),
    title: project.name,
    ariaLabel: `View ${project.name} project`
  }));

  return (
    <div className="w-full">
      <div className="h-[400px] sm:h-[460px] md:h-[520px]" style={{ position: 'relative', overflow: 'hidden' }}>
        <TypedLogoLoop
          logos={projectLogos}
          speed={30}
          direction="left"
          logoHeight={480}
          gap={40}
          hoverSpeed={0}
          scaleOnHover={false}
          fadeOut={false}
          ariaLabel="Project portfolio"
        />
      </div>
    </div>
  );
};

export default ProjectLogoLoop;
