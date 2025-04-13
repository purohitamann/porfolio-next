import React from 'react';

const Blurb = () => {
    return (
        <div className="h-3/4 w-screen  text-white font-sans font-medium">
            <div className="flex flex-col justify-center items-center h-1/2 md:h-1/2 px-4 lg:px-44 text-center font-normal text-lg md:test-sm  md:text-4xl ">
            <p className='text-4xl mt-20  md:mt-20  md:text-4xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>Hello there!</p>
            <br />
                <p className="font-light p-0 md:pt-0 text-xl md:text-2xl text-muted-foreground/80 max-w-2xl leading-relaxed">
                I am a passionate Software Engineer, GenAI intern at Sun Life, and VP of Technology at Hackville. Passionate about building AI-powered, real-time tools that solve real problems. Big on hackathons, open-source, and turning ideas into impact.
                    {/* {blurb.blurb[0].text}
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
                    .  {blurb.blurb[4].text}
                    <Link className='underline  text-black hover:text-gray-600 hover:animate-backgroundFade' href={blurb.blurb[4].highlight!.link}>
                        {blurb.blurb[4].highlight?.name}
                    </Link> {blurb.blurb[4].description} */}
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
