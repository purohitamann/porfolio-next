import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
interface HoverFrameProps {

    name: string;

    url: string;

}
// const HoverFrame = ({ name, url }: HoverFrameProps) => {
//     return (
//         <div>  <HoverCard>
//             <HoverCardTrigger>{name}</HoverCardTrigger>
//             <HoverCardContent className='min-w-[500px] h-[500px]' >
//                 <iframe
//                     src={url}

//                 ></iframe>
//             </HoverCardContent>
//         </HoverCard></div>
//     )
// }



const HoverFrame = ({ name, url }: HoverFrameProps) => {
    const isEmbeddable = (url: string) => {
        // List of embeddable domains
        const embeddableDomains = ['headstarter.co', 'zeuty.co', 'sheridanswiftieclub.vercel.app'];
        return embeddableDomains.some((domain) => url.includes(domain));
    };
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger>{name}</HoverCardTrigger>

                {isEmbeddable(url) ? (
                    <HoverCardContent className="min-w-[500px] h-[500px]">
                        <iframe
                            src={url}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                            }}
                            title="Hover Content"
                        ></iframe>  </HoverCardContent>
                ) : (
                    <HoverCardContent >
                        <div>
                            <p>Embedding not allowed. <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Visit {name}</a></p>

                        </div>
                    </HoverCardContent>
                )}

            </HoverCard>
        </div>
    );
};
export default HoverFrame