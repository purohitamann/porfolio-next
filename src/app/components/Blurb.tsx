import React from 'react';
import blurb from '../../data/blurb.json';
import Link from 'next/link';

const Blurb = () => {
    return (
        <div className="h-3/4 w-screen text-gray-500 font-sans font-medium">
            <div className="flex flex-col justify-center items-center align-center h-1/2 md:h-full px-4 lg:px-44 text-center font-normal text-sm  md:text-4xl">
                <p >
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
