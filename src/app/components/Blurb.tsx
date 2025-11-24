import React from 'react';

const Blurb = () => {
    return (
        <div className="w-full text-foreground font-sans font-medium">
            <div className="glass w-full max-w-4xl mx-auto rounded-2xl">
              <div className="flex flex-col justify-center items-center text-center px-4 md:px-8 py-8 space-y-6">
                <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>Hello there!</h2>
                
                <p className="font-light text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    I am a passionate Software Engineer, GenAI intern at Sun Life, and VP of Technology at Hackville. Passionate about building AI-powered, real-time tools that solve real problems. Big on hackathons, open-source, and turning ideas into impact.
                </p>
              </div>
            </div>
        </div>
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
