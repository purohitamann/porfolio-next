import React from 'react';
import SectionWrapper from './SectionWrapper';
import Experience from './Experience';
import experience from '../../data/work.json';


const Work = () => {
    return (
        <SectionWrapper title="Experience">
            <div className="flex flex-col justify-center w-full items-center md:justify-end md:items-end" id='work'>
                {experience.work.map((work: { id: number, link: string, role: string; company: string; startDate: string; endDate: string; description: string; }, index: number) => (
                    <Experience
                        key={work.id}
                        role={work.role}
                        company={work.company}
                        startDate={work.startDate}
                        endDate={work.endDate}
                        description={work.description}
                        link={work.link}
                    />
                ))}


            </div>
        </SectionWrapper>
    );
};

export default Work;
// import React from 'react';
// import Experience from './Experience';
// import workData from '../../data/work.json';


// const App = () => {
//     return (
//         <div className="flex flex-wrap">
//             {workData.work.map((work) => (
//                 <Experience
//                     key={work.id}
//                     role={work.role}
//                     company={work.company}
//                     startDate={work.startDate}
//                     endDate={work.endDate}
//                     description={work.description}
//                     link={work.link}
//                 />
//             ))}
//         </div>
//     );
// };

// export default App;
