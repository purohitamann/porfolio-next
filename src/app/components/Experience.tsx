import { Separator } from '@/components/ui/separator';
import React from 'react';
import HoverFrame from './HoverFrame';

interface Props {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    key: number;
    link: string;
}

export default function Experience({ role, company, startDate, endDate, description, key, link }: Props) {
    return (
        <div className="h-auto w-full md:w-1/2 p-4" id={`${key}`}>
            <div className="flex flex-col  md:items-start md:justify-start">
                <h1 className="text-2xl font-semibold">{role}</h1>
                <div className="text-lg hover:text-gray-600 hover:animate-backgroundFade"> <HoverFrame name={company!} url={link} /></div>
                <p className="text-lg font-light">{startDate} - {endDate}</p>
                <p className="text-md font-light mt-2">{description}</p>
            </div>
            <Separator />
        </div>
    );
}
