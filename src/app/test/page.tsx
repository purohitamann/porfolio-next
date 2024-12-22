'use client'
import React from 'react'
import Image from 'next/image'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const page = () => {
    return (
        <div className='h-screen md:h-screen w-screen bg-white '>
            {/* <iframe
                src="https://headstarter.co/"
                className=''
            ></iframe> */}
            <div>
                <div className='bg-blue-400 flex flex-col justify-center w-full items-center' id='work'>


                    <HoverCard>
                        <HoverCardTrigger>Hover</HoverCardTrigger>
                        <HoverCardContent className='min-w-[500px] h-[500px]' >
                            <iframe
                                src="https://headstarter.co"
                                className='w-full h-full'
                            ></iframe>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </div>
    )
}

export default page