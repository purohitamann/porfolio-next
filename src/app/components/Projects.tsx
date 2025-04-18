'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import ProjectFrame from './ProjectFrame';
import project from '../../data/project.json';

const Projects = () => {
    return (
        <div id="projects" className="bg-background ">
            <SectionWrapper title="Featured Projects">
                <div className="w-full flex flex-col gap-12 max-w-6xl mx-auto">
                    {/* Featured Project */}
                    <div className=" ">
                        <ProjectFrame
                            image={project.project.featured.image}
                            name={project.project.featured.name}
                            techStack={project.project.featured.techStack}
                            link={project.project.featured.link}
                            className="w-full "
                            //  className="w-full "
                            projectId={project.project.featured.id}
                        />
            
                    </div>

                    {/* Selected Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.project.projects.slice(0, 4).map((proj) => (
                            <ProjectFrame
                                key={proj.id}
                                image={proj.image}
                                name={proj.name}
                                techStack={proj.techStack}
                                link={proj.link}
                                 className="w-full "
                                // aspect-[4/3]
                                projectId={proj.id}
                            />
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Projects;
