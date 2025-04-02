'use client';
import React, { useState } from 'react';
import { Github, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';


interface ProjectProps {
    name: string;
    techStack: string;
    githubLink: string;
    imageUrl?: string;
    readme?: string;
}

const ProjectBanner: React.FC<ProjectProps> = ({
    name,
    techStack,
    githubLink,
    imageUrl,
    readme,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <div className="w-full max-w-3xl mx-auto my-4 p-4 border rounded-lg shadow-lg bg-white">
            {/* Project Info */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{name}</h2>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {/* Image or README Preview */}
            {isExpanded && (
                <div className="mt-4">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={`${name} preview`} width={500} height={300} className="rounded-lg" />
                    ) : (
                        <pre className="text-sm bg-gray-100 p-2 rounded-md overflow-auto max-h-40">
                            {readme ? readme.slice(0, 500) + '...' : 'No README available'}
                        </pre>
                    )}
                </div>
            )}

            {/* Tech Stack & GitHub Link */}
            <p className="text-sm text-gray-600 mt-2">{techStack}</p>
            <a href={githubLink} target="_blank" className="flex items-center gap-2 text-blue-600 mt-2">
                <Github size={16} /> View on GitHub
            </a>
        </div>
    );
};

export default ProjectBanner;
