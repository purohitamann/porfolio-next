'use client';
import React, { useState } from 'react';
import { Github } from 'lucide-react';
import Image from 'next/image';

import ProjectModal from './ProjectModal';
import FloatingElement from './FloatingElement';
import { motion } from 'framer-motion';

interface ProjectFrameProps {
    image: string;
    name: string;
    techStack: string;
    link: string;
    className?: string;
    projectId?: number;
    description?: string;
    features?: string[];
    challenges?: string[];
    learnings?: string[];
    live_link?: string;
    isVideo?: boolean;
}

const ProjectFrame = ({
    image,
    name,
    techStack,
    link,
    className,
    live_link,
    description,
    features,
    challenges,
    learnings,
    isVideo = false,
}: ProjectFrameProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <FloatingElement>
                <motion.div 
                    className="cursor-pointer w-[280px] h-[360px] sm:w-[350px] sm:h-[420px] md:w-[500px] md:h-[480px]" 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="glass w-full h-full rounded-2xl">
                        <div className="flex flex-col h-full p-3 md:p-4 rounded-2xl">
                            <div className="w-full h-[200px] sm:h-[240px] md:h-[300px] relative flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                            {isVideo ? (
                                <video
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src={image}
                                />
                            ) : (
                                <Image
                                    width={500}
                                    height={300}
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                />)}
                            </div>

                            <div className="w-full pt-3 md:pt-5 pb-2 md:pb-3 px-1 md:px-2 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="mb-1 md:mb-2">
                                        <h3 className="text-base md:text-xl font-semibold text-foreground line-clamp-1">{name}</h3>
                                    </div>
                                    
                                    <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">{techStack}</p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-auto">
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 md:gap-2 text-muted-foreground hover:text-foreground transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="h-4 w-4 md:h-5 md:w-5" />
                                        <span className="text-xs md:text-sm">View Code</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </FloatingElement>


            <ProjectModal
                isVideo={isVideo}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={{
                    name,
                    image,
                    techStack,
                    link,
                    description,
                    features,
                    challenges,
                      learnings,
                      live_link,
                }}
            />
        </>
    );
};

export default ProjectFrame;
