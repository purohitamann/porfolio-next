// import { NextResponse } from 'next/server';

// // Ensure the route runs dynamically (NOT static export)
// export const dynamic = "force-dynamic"; 

// export async function GET() {
//     try {
//         const response = await fetch(`https://api.github.com/users/purohitamann/repos`, {
//             headers: {
//                 'User-Agent': 'Next.js App',
//             },
//             cache: 'no-store', // Ensures fresh data on every request
//         });

//         if (!response.ok) {
//             return NextResponse.json({ error: "Failed to fetch repositories" }, { status: response.status });
//         }

//         const repos = await response.json();
//         return NextResponse.json(repos);
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic"; 

export async function GET() {
    try {
        const username = "purohitamann";

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'User-Agent': 'Next.js App',
            },
            cache: 'no-store',
        });

        if (!reposResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch repositories" }, { status: reposResponse.status });
        }

        const repos = await reposResponse.json();

        // Return repositories **without README**
        const repoData = repos.map((repo: { name: string; language: string; html_url: string; }) => ({
            name: repo.name,
            techStack: repo.language || "Not specified",
            githubLink: repo.html_url,
        }));

        return NextResponse.json(repoData);
    } catch (_error) {
        return NextResponse.json({ error: `Internal Server Error${_error}` }, { status: 500 });
    }
}
