import React from 'react';
import footer from '../../data/footer.json';
import { Button } from '@/components/ui/button';

type Props = {
    className?: string;
}

const Footer = ({ className }: Props) => {
    return (
        <footer className={`mt-24 ${className}`} id="contact">
            <div className="glass w-full border-t border-border/30">
                <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
                <div className="text-center space-y-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        {footer.title}
                        
                    </h2>

                    <Button className="button-hover">
                        <a href="/asks" >
                            Aman Asks
                        </a>
                    </Button>
                   
                    <div className="flex flex-wrap justify-center items-center gap-6 pt-8">
                        <a href={footer.github} className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
                        <a href={footer.linkedin} className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
                        <a href={footer.medium} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Medium</a>
                        <a href={footer.instagram} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                     <a href={"mailto:" + footer.email} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Email</a>
                    </div>
           
                    <p className="text-sm text-muted-foreground pt-8 border-t border-border/30">
                        &copy; 2024 Aman Purohit. All rights reserved.
                    </p>
                </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
