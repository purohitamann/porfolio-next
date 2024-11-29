import React from 'react';

interface Props {

    title: string;
    children: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = ({ title, children }) => {
    return (
        <div id={title} className="h-3/4   flex flex-col align-center   p-8 items-center  ">
            <div className='h-0.5 w-3/4  bg-black'></div>
            <div>
                <h1 className="h1 text-3xl md:text-5xl italictransform -translate-x-96 py-4 ">{title}</h1>
            </div>

            <div>
                {children}
            </div>

        </div>
    );
};

export default SectionWrapper;