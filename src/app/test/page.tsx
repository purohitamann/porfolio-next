'use client'
import React, { useEffect, useState } from 'react'
import GitHubPreview from './GithubPreview'

const Page = () => {
    

    return (
        <div className='h-auto w-screen bg-white flex '>
            {/* GitHub Repo Preview */}
            <GitHubPreview url="https://github.com/purohitamann/BrainTumorClassficationModel" />
<GitHubPreview url="https://github.com/HeyPuter/puter/pull/1175" />
<GitHubPreview url="https://github.com/internetarchive/openlibrary/pull/10152" />

        </div>
    )
}
2
export default Page
