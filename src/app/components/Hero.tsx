import React from 'react';
import hero from '../../data/hero.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import FloatingElement from './FloatingElement';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-background/30 px-4 perspective-1000" id='about'>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_150%,rgba(120,120,120,0.1),transparent)] pointer-events-none" />
            
            <div className="max-w-3xl mx-auto relative">
                <FloatingElement className="flex flex-col justify-center items-center text-center space-y-12">
                    <div className="space-y-4">
                        <motion.h1 
                            className="text-4xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {hero.hero.title}
                        </motion.h1>
                        <motion.div 
                            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        />
                    </div>
                    
                    <motion.p 
                        className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {hero.hero.description}
                    </motion.p>
                    
                    <motion.p 
                        className="text-lg text-muted-foreground/60 max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {hero.hero.subtitle}
                    </motion.p>
                    
                    <motion.div 
                        className="flex gap-6 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link href="#projects">
                            <Button 
                                variant="outline" 
                                className="group button-hover-translate bg-background/50 backdrop-blur-sm border-muted hover:bg-muted/20 hover:border-muted-foreground"
                            >
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href={hero.links.github} target="_blank">
                            <Button 
                                variant="outline" 
                                className="group button-hover-translate bg-background/50 backdrop-blur-sm border-muted hover:bg-muted/20 hover:border-muted-foreground"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </Link>
                    </motion.div>
                </FloatingElement>
            </div>
        </div>
    );
};
