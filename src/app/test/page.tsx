'use client'
import React from 'react'
import GitHubPreview from './GitHubPreview'
import Highlight from '../components/Highlights'
import ProjectCarousel from './ProjectCarousel'
import { Github } from 'lucide-react'

const Page = () => {
    return (
        <div className='h-auto w-screen bg-white flex justify-center pt-16 px-4 md:px-8'>
            <Highlight>
                {/* Title Section with Icon */}
                <div className="flex items-center gap-3 mb-6">
                    <Github className='text-gray-600 hover:cursor-pointer hover:text-black w-6 h-6 md:w-8 md:h-8' />
                    <h2 className="text-lg md:text-2xl font-semibold">GitHub Stats</h2>
                </div>
<h1 className='font-bold'>My Open Source Contributions</h1>
                {/* Description */}
                <div className="w-full md:w-3/4 text-center md:text-left mb-6">
                    <p className="text-sm md:text-lg text-gray-700">
                        Here's my latest contributions to open-source projects on GitHub. 
                        I've been working on a few projects lately, and I'm excited to share them with you. 
                        Check out my latest pull requests below. I have two successful pull requests that have been merged into the main branch.
                    </p>
                </div>

                {/* GitHub Pull Requests */}
                <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-2 md:grid-rows-2 gap-6 w-full">
                    <img src="https://avatars.githubusercontent.com/u/12345678?v=4" alt="Avatar" className="w-12 h-12 rounded-full" />
                    <img src="https://avatars.githubusercontent.com/u/12345678?v=4" alt="Avatar" className="w-12 h-12 rounded-full" />
                    <GitHubPreview url="https://github.com/HeyPuter/puter/pull/1175" />
               

                        <GitHubPreview url="https://github.com/internetarchive/openlibrary/pull/10152" />
            
                </div>

   
                {/* <div className="w-full mt-8">
                    <ProjectCarousel />
                </div> */}
            </Highlight>
        </div>
    )
}

export default Page
