'use client';
import React, { useEffect, useState } from 'react';
import { Github, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';

const ProjectFrame = ({
    image,
    name,
    techStack,
    link,
    className,
    projectId
}: {
    image: string;
    name: string;
    techStack: string;
    link: string;
    className?: string;
    projectId?: number;
}) => {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        // Only fetch likes if projectId is provided
        if (projectId) {
            const fetchLikes = async () => {
                const { data, error } = await supabase
                    .from('Project')
                    .select('likes')
                    .eq('id', projectId)
                    .single();
                    
                if (!error && data) {
                    setLikes(data.likes || 0);
                }
            };
            
            fetchLikes();
            
            // Set up real-time subscription if projectId exists
            const subscription = supabase
                .channel(`project-${projectId}`)
                .on('postgres_changes', { 
                    event: 'UPDATE', 
                    schema: 'public', 
                    table: 'Project',
                    filter: `id=eq.${projectId}` 
                }, (payload) => {
                    setLikes(payload.new.likes || 0);
                })
                .subscribe();
                
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [projectId]);

    return (
        <div className="flex justify-start items-start text-start transition-transform duration-300 hover:scale-[1.02] p-4">
            <Link href="/projects" className="w-full h-full cursor-pointer">
                <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${className}`}>
                    {/* Top - Image */}
                    <div className="w-full h-3/4 relative">
                        <Image
                            width={500}
                            height={500}
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Bottom - Content */}
                    <div className="w-full p-5 bg-white">
                        <div className="mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{name}</h3>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{techStack}</p>
                        
                        <div className="flex items-center justify-between">
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="h-5 w-5" />
                                <span>View Code</span>
                            </a>
                            
                            {projectId && (
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Heart className="h-4 w-4" />
                                    <span className="text-sm">{likes}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProjectFrame;
