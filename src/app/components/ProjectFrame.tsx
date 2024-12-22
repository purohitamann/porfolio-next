import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
const ProjectFrame = ({
    image,
    name,
    techStack,
    link,
    className
}: {
    image: string;
    name: string;
    techStack: string;
    link: string;
    className?: string;
}) => {
    return (



        <div className="relative flex flex-col justify-start items-start  text-start cursor-pointer transition-transform duration-300 hover:scale-105 hover:rotate-2 hover:opacity-85 p-4 ">
            <Link href={link}>

                <div className={`relative  bg-gray-100 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-hidden hover:shadow-2xl ${className}`}>
                    {/* Project Image */}
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-full object-cover rounded-8 absoluten ${className}`}
                    />
                </div>
                <div>
                    {/* Overlay */}
                    <div className=" flex flex-col justify-start items-start text-start    text-black p-4   transition-opacity duration-300">

                        <div className="flex flex-row justify-start items-center w-full mb-2">

                            <h3 className="text-lg ">{name}</h3>       <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"

                            >
                                <ArrowRight />

                            </a>
                        </div>
                        <p className="text-sm mb-4">{techStack}</p>

                    </div>
                </div>
            </Link>
        </div>


    );
};

export default ProjectFrame;
