import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    title: string;
    children: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = ({ title, children }) => {
    return (
        <div className="h-auto w-full flex flex-col justify-start items-center p-4 md:p-8">
            <div className="w-full max-w-6xl space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <motion.h1 
                        className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.div 
                        className="h-px w-24 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    />
                </div>

                <motion.div 
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default SectionWrapper;
