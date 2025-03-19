'use client'
import React, { useEffect, useState } from 'react'

const GitHubPRPreview = ({ prUrl }) => {
    const [pr, setPR] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchPRData() {
            try {
                const { owner, repo, prNumber } = extractPRDetails(prUrl)
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`)
                const data = await response.json()

                if (data.message === "Not Found") {
                    setError("Pull request not found")
                } else {
                    setPR(data)
                }
            } catch (error) {
                setError("Failed to fetch pull request data")
                console.error(error)
            }
        }

        if (prUrl) fetchPRData()
    }, [prUrl])

    return (
        <div className="flex items-center justify-center p-4">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : pr ? (
                <div className="border p-6 rounded-lg shadow-md w-[450px] bg-white flex flex-col gap-4">
                    
                    {/* PR Title (Full Title, Large Font) */}
                    <h3 className="text-xl font-bold text-black leading-snug">
                        <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                            #{pr.number} - {pr.title}
                        </a>
                    </h3>

                    {/* Author Info */}
                    <div className="flex items-center gap-2">
                        {/* <img
                            src={pr.user.avatar_url}
                            alt={pr.user.login}
                            className="w-10 h-10 rounded-full"
                        /> */}
                        <span className="text-gray-700 text-sm font-medium">{pr.user.login}</span>
                        <span className="text-gray-500 text-xs">• {new Date(pr.created_at).toDateString()}</span>
                    </div>

                    {/* PR Status & Stats */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span className={`px-3 py-1 rounded-md font-medium ${pr.merged ? 'bg-purple-200 text-purple-700' : 'bg-green-200 text-green-700'}`}>
                            {pr.merged ? "Merged" : "Open"}
                        </span>
                        <div className="flex gap-4">
                            <span>💬 {pr.comments} comments</span>
                            <span>✅ {pr.review_comments} reviews</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading PR details...</p>
            )}
        </div>
    )
}

export default GitHubPRPreview

function extractPRDetails(url) {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/)
    if (!match) return { owner: null, repo: null, prNumber: null }
    return { owner: match[1], repo: match[2], prNumber: match[3] }
}
