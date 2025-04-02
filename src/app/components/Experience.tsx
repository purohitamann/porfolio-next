
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    key: number;
    link: string;
    logo: string;
}

export default function Experience({ role, company, startDate, endDate, description, key, link, logo }: Props) {
    return (
        <div className="flex flex-row gap-6 items-start w-full p-4" id={`${key}`}>
            <Link href={link} target="_blank" className="shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted border border-border hover:border-muted-foreground transition-colors">
                    <Image 
                        src={`/${logo}`} 
                        alt={company} 
                        width={64} 
                        height={64}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                </div>
            </Link>
            
            <div className="flex-1 bg-muted/30 rounded-2xl p-6 border border-border hover:border-muted-foreground transition-all">
                <div className="flex flex-col md:items-start md:justify-start">
                    <h1 className="text-xl font-semibold text-foreground">{role}</h1>
                    <Link href={link} target="_blank" className="text-lg text-muted-foreground hover:text-foreground transition-colors">
                        {company}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{startDate} - {endDate}</p>
                    <p className="text-md text-muted-foreground/80 mt-4">{description}</p>
                </div>
            </div>
        </div>
    );
}
