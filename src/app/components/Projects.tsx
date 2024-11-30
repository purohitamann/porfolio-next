import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import ScreenWrapper from './ScreenWrapper';
import ProjectFrame from './ProjectFrame';
const Projects = () => {
    return (

        <div id='projects'>


            <SectionWrapper title="Projects" >
                <div className="">
                    <ProjectFrame
                        image="https://via.placeholder.com/300" // Replace with project image URL
                        name="My Project"
                        techStack="React, Tailwind, Framer Motion"
                        link="https://example.com"
                        className="w-[70vw] h-[60vh] "
                    />

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
                    <div className='w-full h-full'>
                        <ProjectFrame
                            image="https://via.placeholder.com/300" // Replace with project image URL
                            name="My Project"
                            techStack="React, Tailwind, Framer Motion"
                            link="https://example.com"
                            className="w-[30vw] h-[20vh] "
                        />
                        <ProjectFrame
                            image="https://via.placeholder.com/300" // Replace with project image URL
                            name="My Project"
                            techStack="React, Tailwind, Framer Motion"
                            link="https://example.com"
                            className="w-[30vw] h-[20vh] "
                        />


                    </div>
                    <div className='w-full h-full'>
                        <ProjectFrame
                            image="https://via.placeholder.com/300" // Replace with project image URL
                            name="My Project"
                            techStack="React, Tailwind, Framer Motion"
                            link="https://example.com"
                            className="w-[30vw] h-[20vh] "
                        />
                        <ProjectFrame
                            image="https://via.placeholder.com/300" // Replace with project image URL
                            name="My Project"
                            techStack="React, Tailwind, Framer Motion"
                            link="https://example.com"
                            className="w-[30vw] h-[20vh] "
                        />

                    </div>
                </div>

            </SectionWrapper>
        </div>
    );
};

export default Projects;
