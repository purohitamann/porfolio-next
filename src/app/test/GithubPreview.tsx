'use client'
import React from 'react'
import GitHubRepoPreview from './GithubRepoPreview'
import GitHubPRPreview from './GithubPRPreview'

const GitHubPreview = ({ url }) => {
    if (!url) return <p className="text-gray-500">No GitHub URL provided.</p>

    if (url.match(/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+/)) {
        return <GitHubPRPreview prUrl={url} />
    } else if (url.match(/github\.com\/[^\/]+\/[^\/]+$/)) {
        return <GitHubRepoPreview repoUrl={url} />
    } else {
        return <p className="text-red-500">Invalid GitHub URL.</p>
    }
}

export default GitHubPreview
