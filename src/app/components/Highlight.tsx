'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturedHighlight({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children?: React.ReactNode;
}) {
    return (
        <motion.div
            className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-r from-[#F2FCE2] to-[#EAFBFC] rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">{title}</h2>
            <p className="text-lg text-yellow-700 mb-6">{description}</p>
            <div>{children}</div>
        </motion.div>
    );
}
