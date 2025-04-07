'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Trophy, Calendar, Users, Sparkles } from 'lucide-react';
import FloatingElement from './FloatingElement';
import { motion } from 'framer-motion';

const HackathonWins = () => {
    const hackathons = [
        {
            name: "Nosu AI Hackathon",
            project: "Swot-up: Contextual Exam Preparation",
            position: "Winner - Best use of AI, Supercool Awesome Idea",
            date: "January 2025",
            teamSize: 1,
            description: "Developed a RAG model utilizing pinecone, Next & Meta's Llama 2 in a matter of 5 Hours, competing against 1485+ hackers.",
            techStack: "TypeScript, Groq, Pinecone, Next.js, Tailwind CSS"
        },
        {
            name: "EverydayAI Hackathon",
            project: "Protein Suckers - AI High Protein Meal Finder",
            position: "Winner - Best use of Nebius AI, Best Life Enhancer Solution, Supercool Awesome Idea ",
            date: "March 2025",
            teamSize: 1,
            description: "Created an AI solution to fetch high protein takeouts nearby users location using Webscrapping and prompt engineering using Nebius AI, competing against 184+ hackers.",
            techStack: "TypeScript, Groq, Nebius AI, Next.js, Tailwind CSS"
  
        }
    ];

    return (
        <div className="bg-background py-20">
            <SectionWrapper title="Hackathon Achievements">
                <div className="max-w-4xl mx-auto">
                    <FloatingElement>
                        <motion.div 
                            className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    {hackathons.map((hackathon, index) => (
                                        <motion.div 
                                            key={hackathon.name}
                                            className="bg-muted/30 rounded-xl p-6 border border-border hover:border-muted-foreground transition-all"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-foreground">
                                                        {hackathon.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Trophy className="h-4 w-4 text-yellow-500" />
                                                        <p className="text-yellow-500 font-medium">
                                                            {hackathon.position}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm text-muted-foreground">
                                                            {hackathon.date}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm text-muted-foreground">
                                                            Team of {hackathon.teamSize}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4 text-muted-foreground shrink-0" />
                                                    <h4 className="text-lg text-foreground font-medium">
                                                        {hackathon.project}
                                                    </h4>
                                                </div>
                                                <p className="text-muted-foreground/80">
                                                    {hackathon.description}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    Tech Stack: {hackathon.techStack}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </FloatingElement>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default HackathonWins;