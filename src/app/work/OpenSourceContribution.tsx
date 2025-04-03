'use client';
import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Github, ArrowRight, GitPullRequest, GitFork } from 'lucide-react';
import Link from 'next/link';
import FloatingElement from '../components/FloatingElement';
import { motion } from 'framer-motion';

const OpenSourceContribution = () => {
    const contributions = [
        {
            org: "Internet Archive",
            repo: "openlibrary",
            description: "Contributing to Open Library, a digital library project by Internet Archive, helping improve accessibility and user experience.",
            link: "https://github.com/internetarchive/openlibrary"
        },
        {
            org: "Puter",
            repo: "puter",
            description: "Contributing to Puter's cloud platform development, focusing on enhancing developer tools and platform capabilities.",
            link: "https://github.com/HeyPuter/puter"
        }
    ];

    return (
        <div className="bg-background py-20">
            <SectionWrapper title="Open Source">
                <div className="max-w-4xl mx-auto">
                    <FloatingElement>
                        <motion.div 
                            className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="p-8 space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground mb-3">
                                        Open Source Contributions
                                    </h2>
                                    <p className="text-muted-foreground/80 leading-relaxed">
                                        Actively contributing to significant open source projects, with a focus on digital libraries 
                                        and cloud computing platforms. Making meaningful contributions to enhance developer tools and user experiences. Successfully merged 2 PR in the past 6 months.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <a href="https://github.com/purohitamann" target="_blank" rel="noopener noreferrer">
                                        <Button 
                                            variant="outline" 
                                            className="group button-hover-translate bg-background/50 backdrop-blur-sm border-muted hover:bg-muted/20 hover:border-muted-foreground"
                                        >
                                            <Github className="mr-2 h-4 w-4" />
                                            GitHub Profile
                                        </Button>
                                    </a>
                                    <Link href="/projects">
                                        <Button 
                                            variant="outline" 
                                            className="group button-hover-translate bg-background/50 backdrop-blur-sm border-muted hover:bg-muted/20 hover:border-muted-foreground"
                                        >
                                            View All Projects
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {contributions.map((contrib, index) => (
                                        <motion.div 
                                            key={contrib.org}
                                            className="bg-muted/30 rounded-xl p-6 border border-border hover:border-muted-foreground transition-all"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <GitPullRequest className="h-5 w-5 text-muted-foreground" />
                                                <h3 className="text-lg font-medium text-foreground">
                                                    {contrib.org} / {contrib.repo}
                                                </h3>
                                            </div>
                                            <p className="text-muted-foreground/80 mb-4">
                                                {contrib.description}
                                            </p>
                                            <a 
                                                href={contrib.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <GitFork className="h-4 w-4 mr-2" />
                                                View Repository
                                            </a>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    <div className="bg-muted/30 rounded-xl p-6 border border-border hover:border-muted-foreground transition-all">
                                        <h3 className="text-lg font-medium text-foreground mb-2">Impact</h3>
                                        <p className="text-muted-foreground/80">
                                            Contributing to projects that impact more than 2.4 millions+ monthly users worldwide, from digital library access to cloud computing solutions.
                                        </p>
                                    </div>
                                    <div className="bg-muted/30 rounded-xl p-6 border border-border hover:border-muted-foreground transition-all">
                                        <h3 className="text-lg font-medium text-foreground mb-2">Focus Areas</h3>
                                        <p className="text-muted-foreground/80">
                                            Specializing in user experience improvements, accessibility enhancements, and developer tool optimization.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </FloatingElement>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default OpenSourceContribution;
