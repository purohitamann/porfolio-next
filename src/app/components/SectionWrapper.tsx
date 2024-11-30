import React from 'react';

interface Props {

    title: string;
    children: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = ({ title, children }) => {
    return (
        <div id={title} className="h-auto w-screen   flex flex-col align-center  justify-start items-center p-8   ">
            <div className='h-0.5 w-3/4 bg-black'></div>
            <div className="h-auto w-full flex flex-col align-center text-start justify-start items-center p-8 ">
                <h1 className="h1 flex flex-row items-start justify-start text-3xl md:text-5xl italictransform -translate-x-96 py-4 ">{title}</h1>


                <div className='w-3/4'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper;