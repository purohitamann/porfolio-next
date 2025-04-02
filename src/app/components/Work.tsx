'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import Experience from './Experience';
import experience from '../../data/work.json';

const Work = () => {
    return (
        <div id="work" className="bg-background">
            <SectionWrapper title="Experience">
                <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
                    {experience.work.map((work) => (
                        <Experience
                            key={work.id}
                            role={work.role}
                            company={work.company}
                            startDate={work.startDate}
                            endDate={work.endDate}
                            description={work.description}
                            link={work.link}
                            logo={work.logo || `${work.company.toLowerCase().replace(/\s+/g, '')}.jpeg`}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Work;