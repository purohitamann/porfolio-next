'use client';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Github, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FloatingElement from '../components/FloatingElement';
import Footer from '../components/Footer';

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
        <div className="min-h-screen w-screen bg-background pt-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/">
                        <Button variant="outline" className="group">
                            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col items-center space-y-4">
                        <motion.h1 
                            className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                 Personal Projects
                        </motion.h1>
                        <motion.div 
                            className="h-px w-24 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        />
                    </div>

                    <div className="space-y-6">
                        {projects.map((project, index) => (
                            <FloatingElement key={project.name}>
                                <div className="glass w-full rounded-2xl">
                                  <motion.div 
                                      className="rounded-2xl overflow-hidden"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                  >
                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-semibold text-foreground">
                                                    {project.name}
                                                </h2>
                                                <p className="text-muted-foreground text-sm mt-1">
                                                    {project.techStack}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => fetchReadme(project.name)}
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                {expanded === project.name ? 
                                                    <ChevronUp className="h-5 w-5" /> : 
                                                    <ChevronDown className="h-5 w-5" />
                                                }
                                            </Button>
                                        </div>

                                        <p className="text-muted-foreground">
                                            {project.description || "No description available."}
                                        </p>

                                        <div className="flex justify-between items-center pt-4">
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex"
                                            >
                                                <Button variant="outline" className="gap-2">
                                                    <Github className="h-4 w-4" />
                                                    View Code
                                                </Button>
                                            </a>
                                        </div>

                                        {expanded === project.name && (
                                            <motion.div 
                                                className="mt-6 border-t border-border pt-4"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                            >
                                                <div className="prose prose-invert max-w-none">
                                                    {loadingReadme === project.name ? (
                                                        <div className="flex justify-center py-8">
                                                            <div className="animate-pulse space-y-3">
                                                                <div className="h-4 w-48 bg-muted rounded"></div>
                                                                <div className="h-4 w-32 bg-muted rounded"></div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                                            {readme[project.name]}
                                                        </ReactMarkdown>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                  </motion.div>
                                </div>
                            </FloatingElement>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-14 bg-[radial-gradient(circle_at_50%_120%,rgba(120,120,120,0.1),transparent)] " >
                <Footer />
            </div>
        </div>
    );
};

export default GitHubProjects;
