'use client';
import React from 'react';
import { Github, Heart } from 'lucide-react';
import Link from 'next/link';
const ProjectFrame = () => {
    return (



        <div className=" flex justify-center">


            <div className={`flex m-10  w-1/2 h-[500px] bg-gray-100  rounded-tr-2xl  relative`}>
                {/* Project Image */}
                <div className={`w-[500px] h-[400px] bg-slate-300 object-cover rounded-8 absoluten `}>
                    Image
                </div>
                <div className='text-white rounded-tr-xl flex flex-row gap-2 bg-slate-800 rounded-8 p-4 absolute bottom-0 left-0'>
                    <Link href={'/'} > <Github /> </Link>
                    <p className='flex flex-row gap-1'><Heart /> 2</p>
                </div>
                <div className=" flex flex-col justify-start items-start text-start    text-black p-4   transition-opacity duration-300  w-1/2">
                    <h1>Project Name</h1>
                    <p>Technologies Used: React, Next.js, TailwindCSS</p>
                    <p>Problem Statement: Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate incidunt eius sequi, maxime illo quaerat assumenda facere totam, exercitationem vel nesciunt autem delectus vero amet neque nostrum minima accusantium voluptates. </p>
                    <p>Proposed Solution: </p>
                    <p>Future Iteration: </p>
                    <div>
                        <p>Tags</p>
                        <div className='flex flex-row gap-1'>
                            <Tags />
                            <Tags />
                            <Tags />
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );
};

export default ProjectFrame;



const Tags = () => {
    return (
        <div className='bg-zinc-400 p-1 mr-1 text-slate-800 lowercase rounded-sm text-xs'>TagName</div>
    )
}

