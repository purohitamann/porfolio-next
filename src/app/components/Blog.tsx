import React from 'react'
import SectionWrapper from './SectionWrapper'

import BlogFrame from './BlogFrame'
import { Separator } from '@radix-ui/react-separator'

const Blog = () => {
    return (
        <>

            <div id='blog' >


                <SectionWrapper title="Blog" >
                    {/* <Highlight title="Coming soon!!" description="I will be updating my blog soon" >
              
                </Highlight> */}
                    <div className='space-y-4' >
                        <BlogFrame title="My First Open-Source Contribution to the Internet Archive" description="Even though it was a small “good first issue,” it felt incredibly exciting" link="https://medium.com/@purohitamann/my-first-open-source-contribution-to-the-internet-archive-6ec2621b8a68" timePosted="January 2025" />

                        <Separator orientation="horizontal" />
                        <BlogFrame title="Students guide to becoming 'AI first' at School" description="I say there’s more to using ChatGPT than just helping you paraphrase" link="https://medium.com/p/d004dbc7a633" timePosted="December 2024" />

                    </div>
                </SectionWrapper>
            </div>
        </>
    )
}

export default Blog