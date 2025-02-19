'use client';
import React from 'react';
import { Github, Heart } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';

interface ProjectProps {
    image: string;
    name: string;
    techStack: string;
    problemStatement: string;
    solution: string;
    futureIteration: string;
    tags: string[];
    githubLink?: string;
    likes: number;
    projectId: number;
}
const likeProject = async (projectId: number) => {
    const { data: selectData, error: selectError } = await supabase
        .from('Project')
        .select('likes')
        .eq('id', projectId)
        .single();
    if (selectError) {
        console.error('Error fetching project likes:', selectError);
        return;
    }

    const { data, error } = await supabase
        .from('Project')
        .update({ likes: (selectData?.likes || 0) + 1 })
        .eq('id', projectId);
    if (error) {
        console.error('Error liking project:', error);
    }
}
const getLikes = async (projectId: number) => {
    const { data, error } = await supabase
        .from('Project')
        .select('likes')
        .eq('id', projectId)
        .single();
    if (error) {
        console.error('Error fetching project likes:', error);
        return 0;
    }

    return data?.likes || 0;
}
const ProjectBanner: React.FC<ProjectProps> = ({
    image,
    name,
    techStack,
    problemStatement,
    solution,
    futureIteration,
    tags,
    githubLink,
    likes,
    projectId
}) => {
    const [projectLikes, setProjectLikes] = React.useState(likes);
    React.useEffect(() => {
        const fetchLikes = async () => {
            const likes = await getLikes(projectId);
            setProjectLikes(likes);
        };
        fetchLikes();
    }, [projectId]);
    return (
        <div className="flex flex-col items-center max-w-6xl mx-auto my-4 md:my-8 px-4 md:px-0">
            <div className="w-full bg-white rounded-t-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row h-[500px]">
                    <div className="w-full md:w-1/2 h-[250px] md:h-[500px] relative">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 h-[250px] md:h-[500px] p-4 md:p-8 flex flex-col">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{name}</h1>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            <div>
                                <h2 className="text-sm font-semibold text-gray-700">Technologies</h2>
                                <p className="text-sm md:text-base text-gray-600">{techStack}</p>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-700">Problem</h2>
                                <p className="text-sm md:text-base text-gray-600">{problemStatement}</p>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-700">Solution</h2>
                                <p className="text-sm md:text-base text-gray-600">{solution}</p>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-700">Future Plans</h2>
                                <p className="text-sm md:text-base text-gray-600">{futureIteration}</p>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-700 mb-2">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-900 text-white px-4 md:px-6 py-3 md:py-4 rounded-b-2xl flex justify-between items-center">
                {githubLink ? (
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors text-sm md:text-base"
                    >
                        <Github className="h-4 md:h-5 w-4 md:w-5" />
                        <span>View Code</span>
                    </a>
                ) : (
                    <span className="text-gray-400 flex items-center gap-2 text-sm md:text-base">
                        <Github className="h-4 md:h-5 w-4 md:w-5" />
                        Private Repository
                    </span>
                )}
                <div className="flex items-center gap-2 text-sm md:text-base">
                    <Heart className="h-4 md:h-5 w-4 md:w-5" onClick={() => likeProject(projectId)} />
                    <span >{projectLikes}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectBanner;
