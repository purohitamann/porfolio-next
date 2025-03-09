'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import ProjectFrame from './ProjectFrame';
import project from '../../data/project.json';

const Projects = () => {
    return (
        <div id="projects">
            <SectionWrapper title="Projects">
                <div className="w-full flex flex-col">
                    {/* Featured Project */}
                    <div className="w-full flex justify-center items-center mb-8">
                        <ProjectFrame
                            image={`${project.project.featured.image}`}
                            name={`${project.project.featured.name}`}
                            techStack={`${project.project.featured.techStack}`}
                            link={`${project.project.featured.link}`}
                            className="w-full md:w-[70vw] h-[60vh]"
                            projectId={project.project.featured.id}
                        />
                    </div>

                    {/* All Projects */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {project.project.projects.map((proj, index) => (
                            <ProjectFrame
                                key={index}
                                image={proj.image}
                                name={proj.name}
                                techStack={proj.techStack}
                                link={proj.link}
                                className="w-full h-[60vh]"
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
