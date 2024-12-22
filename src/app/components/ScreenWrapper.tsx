'use client';

import React from 'react';

export default function ScreenWrapper({ children }: { children: React.ReactNode, className?: string }) {

    return (
        <div className="perspective-1000">
            <div
                className={`w-4/5 max-w-[768px] h-[50vh] max-h-[1024px] mx-auto my-[100px] p-4 border-[16px] border-gray-300 rounded-[32px] shadow-lg bg-gradient-to-b from-[#F2FCE2] to-[#EAFBFC]`}

            >
                <div className="w-full h-full bg-white rounded-[24px] overflow-auto p-4 box-border">
                    {children}
                </div>
            </div>
        </div>
    );
}
