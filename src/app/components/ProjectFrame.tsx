'use client';
import React, { useState } from 'react';
import { Github } from 'lucide-react';
import Image from 'next/image';
import { useCursorHover } from '../hooks/useCursorHover';
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
    const linkCursorHandlers = useCursorHover('link');
    const hoverCursorHandlers = useCursorHover('hover');

    return (
        <>
            <FloatingElement>
                <motion.div 
                    className="flex justify-start items-start text-start p-4 cursor-pointer" 
                    onClick={() => setIsModalOpen(true)}
                    {...hoverCursorHandlers}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={`relative bg-background rounded-2xl border border-border overflow-hidden flex flex-col ${className}`}>
                        <div className="w-full h-3/4 relative">
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
                                height={500}
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                            />)}
                        </div>

                        <div className="w-full p-5 bg-background">
                            <div className="mb-2">
                                <h3 className="text-xl font-semibold text-foreground line-clamp-1">{name}</h3>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{techStack}</p>
                            
                            <div className="flex items-center justify-between">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                    {...linkCursorHandlers}
                                >
                                    <Github className="h-5 w-5" />
                                    <span>View Code</span>
                                </a>
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
                    live_link : "",
                }}
            />
        </>
    );
};

export default ProjectFrame;
