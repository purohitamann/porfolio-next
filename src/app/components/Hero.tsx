import React from 'react';
import hero from '../../data/hero.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="flex items-center justify-center px-4 py-8 w-full overflow-x-hidden" id='about'>
            <div className="w-full max-w-6xl mx-auto">
                <div className="animate-fade">
                    {/* Photo and Name Side by Side */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-12">
                        {/* Profile Photo */}
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full bg-muted/20 border-2 border-border/30 overflow-hidden relative">
                                <Image 
                                    src="/profile.jpg" 
                                    alt="Aman Purohit" 
                                    fill
                                    className="object-cover"
                                    priority
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        if (e.currentTarget.parentElement?.nextElementSibling) {
                                            (e.currentTarget.parentElement.nextElementSibling as HTMLElement).style.display = 'flex';
                                        }
                                    }}
                                />
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground absolute inset-0" style={{display: 'none'}}>
                                    <span className="text-sm">Photo</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Name and Description */}
                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-tight">
                                {hero.hero.title}
                            </h1>
                            
                            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl lg:max-w-none">
                                {hero.hero.description}
                            </p>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href="#projects">
                            <Button className="button-hover w-full sm:w-auto">
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href={hero.links.github} target="_blank">
                            <Button variant="outline" className="button-hover w-full sm:w-auto">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
