import React from 'react';
import blurb from '../../data/blurb.json';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const Blurb = () => {
    return (
        <div className="h-3/4 w-screen  text-gray-500 font-sans font-medium">
            <div className="flex flex-col justify-center items-center h-1/2 md:h-1/2 px-4 lg:px-44 text-center font-normal text-lg md:test-sm  md:text-4xl ">
                <p className="font-light mt-60 pt-50 md:mt-20 md:pt-40">
                    {blurb.blurb[0].text}
                    <Link className='underline  text-black hover:text-gray-600 hover:animate-backgroundFade' href={blurb.blurb[0].highlight!.link}>
                        {blurb.blurb[0].highlight?.name}
                    </Link>{blurb.blurb[0].description} {blurb.blurb[1].text}
                    <Link className='underline  text-black hover:text-gray-600 hover:animate-backgroundFade' href={blurb.blurb[1].highlight!.link}>
                        {blurb.blurb[1].highlight?.name}
                    </Link> {blurb.blurb[1].description}
                    {blurb.blurb[2].text}
                    <Link className='underline  text-black hover:text-gray-600 hover:animate-backgroundFade' href={blurb.blurb[2].highlight!.link}>
                        {blurb.blurb[2].highlight?.name}
                    </Link>{blurb.blurb[2].description}
                </p>
            </div>


        </div >
    );
};

export default Blurb;

<style>{`
.highlight {
    font-weight: bold;

    color: #0070f3;
    text-decoration: none;
}

.highlight:hover {
    text-decoration: underline;
    color: #005bb5;
    underline: yellow;  
}

`}</style>
