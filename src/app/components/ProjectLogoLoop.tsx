'use client';
import React from 'react';
import LogoLoop from '@/components/LogoLoop';
import projectData from '../../data/project.json';
import ProjectFrame from './ProjectFrame';

// Type assertion for LogoLoop since it's a .jsx file
const TypedLogoLoop = LogoLoop as any;

const ProjectLogoLoop = () => {
  // Only use projects from the projects array
  const allProjects = projectData.project.projects;

  // Create logo items with ProjectFrame components
  const projectLogos = allProjects.map((project, index) => ({
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
          live_link={('live_link' in project ? project.live_link : undefined) as string | undefined}
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
