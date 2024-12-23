import React from 'react'
import SectionWrapper from './SectionWrapper'

import BlogFrame from './BlogFrame'

const Blog = () => {
    return (
        <>

            <div id='blog'>


                <SectionWrapper title="Blog" >
                    {/* <Highlight title="Coming soon!!" description="I will be updating my blog soon" >
              
                </Highlight> */}
                    <BlogFrame title="Students guide to becoming 'AI first' at School" description="I say there’s more to using ChatGPT than just helping you paraphrase" link="https://medium.com/p/d004dbc7a633" timePosted="December 2024" />
                </SectionWrapper>
            </div>
        </>
    )
}

export default Blog