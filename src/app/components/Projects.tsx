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
                    <div className="w-full  flex justify-center items-center mb-8">
                        <ProjectFrame
                            image={`${project.project.featured.image}`} // Replace with project image URL
                            name={`${project.project.featured.name}`}
                            techStack={`${project.project.featured.techStack}`}
                            link={`${project.project.featured.link}`}
                            className="w-full md:w-[70vw] h-[40vh] md:h-[60vh]"
                        />
                    </div>

                    {/* All Projects */}
                    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2  gap-6">
                        {project.project.projects.map((proj, index) => (
                            <ProjectFrame
                                key={index}
                                image={proj.image} // Replace with project image URL
                                name={proj.name}
                                techStack={proj.techStack}
                                link={proj.link}
                                className="w-full  h-[30vh] md:h-[35vh]"
                            />
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Projects;
