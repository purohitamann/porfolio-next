'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import ProjectFrame from './ProjectFrame';
import project from '../../data/project.json';
import ProjectLogoLoop from './ProjectLogoLoop';
import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <div id="projects" className="w-full">
            <div className="h-auto w-full flex flex-col justify-start items-center py-8">
                <div className="w-full space-y-8">
                    <div className="flex flex-col items-center space-y-4">
                        <motion.h1 
                            className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Explore My Projects
                        </motion.h1>
                        <motion.div 
                            className="h-px w-24 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        />
                    </div>

                    <motion.div 
                        className="w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <ProjectLogoLoop />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
