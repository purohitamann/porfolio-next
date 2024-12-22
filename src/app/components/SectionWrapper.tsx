import React from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = ({ title, children }) => {
    return (
        <div id={title} className="h-auto w-full flex flex-col justify-start items-center p-4 md:p-8">
            {/* Horizontal line */}
            <div className="h-0.5 w-full max-w-3xl bg-black"></div>

            {/* Content section */}
            <div className="h-auto w-full flex flex-col justify-start items-center p-4 md:p-8">
                {/* Title */}
                <h1 className="h1 text-2xl md:text-4xl lg:text-5xl italic transform py-4 text-left w-full max-w-3xl">
                    {title}
                </h1>

                {/* Children */}
                <div className="w-full max-w-3xl">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper;
