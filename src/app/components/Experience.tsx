import { Separator } from '@/components/ui/separator';
import React from 'react';

interface Props {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    key: number;
}

export default function Experience({ role, company, startDate, endDate, description, key }: Props) {
    return (
        <div className="h-auto w-1/2 p-4" id={`${key}`}>
            <div className="flex flex-col items-start justify-start">
                <h1 className="text-2xl font-semibold">{role}</h1>
                <p className="text-lg">{company}</p>
                <p className="text-lg font-light">{startDate} - {endDate}</p>
                <p className="text-md font-light mt-2">{description}</p>
            </div>
            <Separator />
        </div>
    );
}
