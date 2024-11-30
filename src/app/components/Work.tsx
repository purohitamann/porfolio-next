import React from 'react';
import SectionWrapper from './SectionWrapper';
import Experience from './Experience';
import experience from '../../data/work.json';

const work = {
    role: "Software Engineer",
    company: "Headstarter AI",
    startDate: "2023",
    endDate: "2023",
    description: "Developed AI-driven and full-stack solutions in dynamic team environments."
};

const Work = () => {
    return (
        <SectionWrapper title="Experience">
            <div className="flex flex-col justify-end items-end" id='work'>
                {experience.work.map((work: { role: string; company: string; startDate: string; endDate: string; description: string; }, index: number) => (
                    <Experience
                        role={work.role}
                        company={work.company}
                        startDate={work.startDate}
                        endDate={work.endDate}
                        description={work.description}
                        key={index}
                    />
                ))}


            </div>
        </SectionWrapper>
    );
};

export default Work;
