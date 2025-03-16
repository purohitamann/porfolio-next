// 'use client';
// import React, { useEffect, useState } from 'react';
// import { supabase } from '@/utils/supabase';
// import ProjectFrame from '../components/ProjectBanner';

// export default function ProjectsPage() {
//     // const [projects, setProjects] = useState([]);

//     // useEffect(() => {
//     //     async function fetchProjects() {
//     //         const { data, error } = await supabase.from('Project').select('*');

//     //         if (error) {
//     //             console.error('Error fetching projects:', error);
//     //         } else {
//     //             setProjects(data);
//     //         }
//     //     }

//     //     fetchProjects();
//     // }, []);

// interface ProjectProps {
//     name: string;
//     techStack: string;
//     githubLink: string;
//     imageUrl?: string;
//     readme?: string;
// }
//     const fetchProjects = async () => {

//         const response = await fetch('/api/github', {
//             method: 'GET',
//         });
    
//         if (!response.ok) {
//             console.error("Failed to fetch GitHub projects");
//             return [];
//         }
    
//         const repos = await response.json();
//         return repos.map((repo) => ({
//             name: repo.name,
//             techStack: repo.language || 'Not specified',
//             githubLink: repo.html_url,
//         }));
//     };
//     const [projects, setProjects] = useState<ProjectProps[]>([]);

//     useEffect(() => {
//         fetchProjects().then(setProjects);
//     }, []);

    

//     return (
//         <div className="h-screen w-screen bg-white overflow-y-scroll">
//             {/* <div className="h-auto w-full mt-20 flex flex-col justify-center items-center">
//                 {projects.length > 0 ? (
//                     projects.map((project) => (
//                         <ProjectFrame
//                             key={project.id}
//                             image={project.img} // Replace with actual image if available
//                             name={project.name}
//                             techStack={project.technologiesUsed.join(', ')}
//                             problemStatement={project.problemStatement}
//                             solution={project.solution}
//                             futureIteration={project.futureIteration || 'N/A'}
//                             githubLink={project.githubLink}
//                             likes={project.likes}
//                             tags={project.tags}
//                             projectId={project.id}
//                         />
//                     ))
//                 ) : (
//                     <p>Loading projects...</p>
//                 )}
//             </div> */}
//             <div className="grid gap-4">
//                 {projects.map((project, index) => (
//                     <ProjectFrame key={index} {...project} />
//                     // JSON.stringify(project)
//                 ))}
//             </div>
//         </div>
//     );
// }
'use client';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Github, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface Project {
    name: string;
    techStack: string;
    githubLink: string;
    description?: string;
}

const GitHubProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [readme, setReadme] = useState<Record<string, string>>({});
    const [loadingReadme, setLoadingReadme] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/api/github/repos');
            if (!response.ok) {
                console.error('Failed to fetch projects');
                return;
            }
            const data: Project[] = await response.json();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    const fetchReadme = async (repoName: string) => {
        if (readme[repoName]) {
            setExpanded(expanded === repoName ? null : repoName);
            return;
        }
        setLoadingReadme(repoName);
        const response = await fetch(`/api/github/readme?repo=${repoName}`);
        const data = await response.json();
        setReadme((prev) => ({ ...prev, [repoName]: data.readme || 'README not available' }));
        setLoadingReadme(null);
        setExpanded(repoName);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-16 ">
            <div className='flex flex-col items-center md:mt-20'>

   
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 sm:my-56">More Projects</h1>
            <ul className="mt-20 space-y-4 sm:space-y-6">
                {projects.map((project) => (
                    <li key={project.name} className="bg-white shadow-lg rounded-lg overflow-hidden border">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-center px-4 sm:px-6 py-4 border-b">
                        
                            <div className="sm:ml-4 text-center sm:text-left">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                    <span className="text-gray-600">purohitamann/</span>{project.name}
                                </h2>
                                <p className="text-gray-600 text-sm">Tech Stack: {project.techStack}</p>
                            </div>
                        </div>

                        {/* Project Description */}
                        <div className="px-4 sm:px-6 py-3 text-gray-700 text-center sm:text-left">
                            <p>{project.description || "No description available."}</p>
                        </div>

                        {/* Footer Section */}
                        <div className="px-4 sm:px-6 py-3 bg-gray-100 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 flex items-center gap-2 hover:text-blue-500 mb-2 sm:mb-0"
                            >
                                <Github className="h-5 w-5" /> View on GitHub
                            </a>
                            <button
                                onClick={() => fetchReadme(project.name)}
                                className="flex items-center text-gray-700 hover:text-gray-900"
                            >
                                {expanded === project.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />} View README
                            </button>
                        </div>

                        {/* README Section */}
                        {expanded === project.name && (
                            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t max-h-[300px] sm:max-h-[400px] overflow-auto">
                                {loadingReadme === project.name ? (
                                    <p>Loading README...</p>
                                ) : (
                                    <div className="prose max-w-none">
 <ReactMarkdown rehypePlugins={[rehypeRaw]} >
                                        {readme[project.name]}
                                    </ReactMarkdown>
                                    </div>
                                   
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default GitHubProjects;
