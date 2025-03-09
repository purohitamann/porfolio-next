'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import ProjectFrame from '../components/ProjectBanner';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase.from('Project').select('*');

            if (error) {
                console.error('Error fetching projects:', error);
            } else {
                setProjects(data);
            }
        }

        fetchProjects();
    }, []);

    return (
        <div className="h-screen w-screen bg-white overflow-y-scroll">
            <div className="h-auto w-full mt-20 flex flex-col justify-center items-center">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectFrame
                            key={project.id}
                            image={project.img} // Replace with actual image if available
                            name={project.name}
                            techStack={project.technologiesUsed.join(', ')}
                            problemStatement={project.problemStatement}
                            solution={project.solution}
                            futureIteration={project.futureIteration || 'N/A'}
                            githubLink={project.githubLink}
                            likes={project.likes}
                            tags={project.tags}
                            projectId={project.id}
                        />
                    ))
                ) : (
                    <p>Loading projects...</p>
                )}
            </div>
        </div>
    );
}
