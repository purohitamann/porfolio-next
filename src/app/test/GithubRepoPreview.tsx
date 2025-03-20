'use client'
import React, { useEffect, useState } from 'react'

const GitHubRepoPreview = ({ repoUrl }) => {
    const [repo, setRepo] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchRepoData() {
            try {
                const { owner, repo } = extractRepoDetails(repoUrl)
                if (!owner || !repo) {
                    setError("Invalid GitHub repository URL")
                    return
                }

                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
                const data = await response.json()

                if (data.message === "Not Found") {
                    setError("Repository not found")
                } else {
                    setRepo(data)
                }
            } catch (error) {
                setError("Failed to fetch repository data")
                console.error(error)
            }
        }

        if (repoUrl) fetchRepoData()
    }, [repoUrl])

    return (
        <div className="flex items-center justify-center p-6">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : repo ? (
                <div className="border p-6 rounded-lg shadow-md w-[450px] bg-white flex flex-col gap-4">
                    
                    {/* Repo Title */}
                    <h3 className="text-xl font-bold text-black leading-snug">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.full_name}
                        </a>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-700 leading-relaxed">{repo.description || "No description available."}</p>

                    {/* Repo Stats */}
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>⭐ {repo.stargazers_count} Stars</span>
                        <span>🍴 {repo.forks_count} Forks</span>
                        <span>👀 {repo.watchers_count} Watchers</span>
                    </div>

                    {/* Last Updated */}
                    <p className="text-xs text-gray-500">
                        Last updated: {new Date(repo.updated_at).toDateString()}
                    </p>
                </div>
            ) : (
                <p>Loading repository details...</p>
            )}
        </div>
    )
}

export default GitHubRepoPreview

// function extractRepoDetails(url) {
//     const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)$/)
//     if (!match) return { owner: null, repo: null }
//     return { owner: match[1], repo: match[2] }
// }
/**
 * Extracts owner and repo name from a GitHub URL.
 * Supports repo names containing hyphens (-) or underscores (_).
 */
function extractRepoDetails(url) {
    const match = url.match(/github\.com\/([^\/]+)\/([\w-]+)$/)
    if (!match) return { owner: null, repo: null }
    return { owner: match[1], repo: match[2] }
}