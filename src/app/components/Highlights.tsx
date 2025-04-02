'use client'
import React from 'react'

import { ReactNode } from 'react';

const Highlights = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative flex items-center justify-center p-6">
            {/* Pixelated Cloud Effect */}
            <div className="absolute w-40 h-40 bg-gray-300 shadow-[4px_4px_0px_rgba(0,0,0,0.2),8px_8px_0px_rgba(0,0,0,0.1)] rounded-lg"></div>
            <div className="absolute w-36 h-36 bg-gray-400 shadow-[4px_4px_0px_rgba(0,0,0,0.2),8px_8px_0px_rgba(0,0,0,0.1)] rounded-lg top-2 left-3"></div>
            <div className="absolute w-32 h-32 bg-gray-200 shadow-[4px_4px_0px_rgba(0,0,0,0.2),8px_8px_0px_rgba(0,0,0,0.1)] rounded-lg top-4 left-6"></div>
            <div className="absolute w-28 h-28 bg-gray-300 shadow-[4px_4px_0px_rgba(0,0,0,0.2),8px_8px_0px_rgba(0,0,0,0.1)] rounded-lg top-6 left-8"></div>

            {/* Inner Content */}
            <div className="relative z-10 px-6 py-4 bg-white border-4 border-gray-600 shadow-lg rounded-md text-black">
                {children}
            </div>
        </div>
    )
}

export default Highlights
