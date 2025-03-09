'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import Experience from './Experience';
import experience from '../../data/work.json';
import Image from 'next/image';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';


const Work = () => {
    return (
        <div id="work">
            <SectionWrapper title="Experience">
                <div className="flex flex-row justify-center w-full">
                    <div className="hidden md:flex flex-col justify-center items-center h-full">
                        <div>{logoAvatar("/headstarter.jpeg", "https://headstarter.co")}</div>
                        <div>{logoAvatar("/zeuty.jpeg", "https://www.linkedin.com/company/zeuty")}</div>
                        <div>{logoAvatar("/sheridan.jpeg", "https://www.sheridancollege.ca/newsroom/articles/community/students-helping-students-sheridans-peer-mentor-program")}</div>
                        <div>{logoAvatar("/sheridan.jpeg", "https://www.sheridancollege.ca")}</div>
                        <div>{logoAvatar("/ssc.jpeg", "https://sheridanswiftieclub.vercel.app")}</div>
                    </div>

                    <div className="p-4">
                        {experience.work.map((work: { id: number, link: string, role: string; company: string; startDate: string; endDate: string; description: string; }) => (
                            <Experience
                                key={work.id}
                                role={work.role}
                                company={work.company}
                                startDate={work.startDate}
                                endDate={work.endDate}
                                description={work.description}
                                link={work.link}
                            />
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Work;

export function logoAvatar(imgpath: string, url: string) {
    return (
        <div className="flex flex-row justify-center w-[100px] items-center rounded-full h-full m-7 overflow-hidden border-8 hover:animate-backgroundFade">
            <HoverCard>
                <HoverCardTrigger>
                    <Image src={`${imgpath}`} alt="" width={100} height={400} />
                </HoverCardTrigger>
                <HoverCardContent className='min-w-[500px] h-[500px]'>
                    <iframe
                        src={`${url}`}
                        className='w-full h-full'
                    ></iframe>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}