// 'use client';
// import React from 'react';
// import { Github, Heart } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/utils/supabase';

// interface ProjectProps {
//     image: string;
//     name: string;
//     techStack: string;
//     problemStatement: string;
//     solution: string;
//     futureIteration: string;
//     tags: string[];
//     githubLink?: string;
//     likes: number;
//     projectId: number;
// }

// const ProjectBanner: React.FC<ProjectProps> = ({
//     image,
//     name,
//     techStack,
//     problemStatement,
//     solution,
//     futureIteration,
//     tags,
//     githubLink,
//     likes,
//     projectId
// }) => {
//     const [projectLikes, setProjectLikes] = React.useState(likes);
//     const [isLiked, setIsLiked] = React.useState(false);
//     const router = useRouter();
    
//     React.useEffect(() => {
//         const fetchLikes = async () => {
//             const { data, error } = await supabase
//                 .from('Project')
//                 .select('likes')
//                 .eq('id', projectId)
//                 .single();
                
//             if (error) {
//                 console.error('Error fetching project likes:', error);
//                 return;
//             }
            
//             setProjectLikes(data?.likes || 0);
//         };
        
//         fetchLikes();
        
//         // Set up real-time subscription
//         const subscription = supabase
//             .channel(`project-${projectId}`)
//             .on('postgres_changes', { 
//                 event: 'UPDATE', 
//                 schema: 'public', 
//                 table: 'Project',
//                 filter: `id=eq.${projectId}` 
//             }, (payload) => {
//                 setProjectLikes(payload.new.likes);
//             })
//             .subscribe();
            
//         return () => {
//             subscription.unsubscribe();
//         };
//     }, [projectId]);
    
//     const handleLike = async (e: React.MouseEvent) => {
//         e.stopPropagation();
        
//         if (isLiked) return;
        
//         const { data, error } = await supabase
//             .from('Project')
//             .update({ likes: projectLikes + 1 })
//             .eq('id', projectId);
            
//         if (error) {
//             console.error('Error liking project:', error);
//             return;
//         }
        
//         setIsLiked(true);
//         setProjectLikes(prev => prev + 1 );
//     };
    
//     const handleClick = () => {
//         router.push('/projects');
//     };
    
//     return (
//         <div 
//             className="flex flex-col items-center max-w-6xl mx-auto my-4 md:my-8 px-4 md:px-0 cursor-pointer hover:shadow-xl transition-shadow duration-300"
//             onClick={handleClick}
//         >
//             <div className="w-full bg-white rounded-t-2xl shadow-lg overflow-hidden">
//                 <div className="flex flex-col h-auto">
//                     <div className="w-full h-[300px] md:h-[400px] relative">
//                         <Image
//                             src={image}
//                             alt={name}
//                             fill
//                             className="object-cover"
//                         />
//                     </div>
//                     <div className="w-full p-4 md:p-6">
//                         <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{name}</h1>
//                         <div className="space-y-3">
//                             <div>
//                                 <h2 className="text-sm font-semibold text-gray-700">Technologies</h2>
//                                 <p className="text-sm md:text-base text-gray-600">{techStack}</p>
//                             </div>
//                             <div>
//                                 <h2 className="text-sm font-semibold text-gray-700">Problem</h2>
//                                 <p className="text-sm md:text-base text-gray-600 line-clamp-2">{problemStatement}</p>
//                             </div>
//                             <div>
//                                 <h2 className="text-sm font-semibold text-gray-700">Solution</h2>
//                                 <p className="text-sm md:text-base text-gray-600 line-clamp-2">{solution}</p>
//                             </div>
//                             <div>
//                                 <h2 className="text-sm font-semibold text-gray-700">Future Iteration</h2>
//                                 <p className="text-sm md:text-base text-gray-600 line-clamp-2">{futureIteration}</p>
//                             </div>
//                             <div className="flex flex-wrap gap-2 mt-3">
//                                 {tags.map((tag, index) => (
//                                     <span
//                                         key={index}
//                                         className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm"
//                                     >
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="w-full bg-gray-900 text-white px-4 md:px-6 py-3 md:py-4 rounded-b-2xl flex justify-between items-center">
//                 {githubLink ? (
//                     <a
//                         href={githubLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-2 hover:text-gray-300 transition-colors text-sm md:text-base"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <Github className="h-4 md:h-5 w-4 md:w-5" />
//                         <span>View Code</span>
//                     </a>
//                 ) : (
//                     <span className="text-gray-400 flex items-center gap-2 text-sm md:text-base">
//                         <Github className="h-4 md:h-5 w-4 md:w-5" />
//                         Private Repository
//                     </span>
//                 )}
//                 <div className="flex items-center gap-2 text-sm md:text-base">
//                     <Heart 
//                         className={`h-4 md:h-5 w-4 md:w-5 cursor-pointer ${isLiked ? 'text-red-500 fill-red-500' : 'hover:text-red-400'}`} 
//                         onClick={handleLike}
//                     />
//                     <span>{projectLikes}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectBanner;
'use client';
import React, { useState, useEffect } from 'react';
import { Github, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

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
