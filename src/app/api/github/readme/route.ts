import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic"; 

export async function GET(req: Request) {
    try {
        const username = "purohitamann";
        const { searchParams } = new URL(req.url);
        const repoName = searchParams.get("repo");

        if (!repoName) {
            return NextResponse.json({ error: "Repository name is required" }, { status: 400 });
        }

        const readmeUrl = `https://raw.githubusercontent.com/${username}/${repoName}/main/README.md`;

        const readmeResponse = await fetch(readmeUrl, { cache: 'no-store' });

        if (!readmeResponse.ok) {
            return NextResponse.json({ error: "README not available" }, { status: 404 });
        }

        const readmeContent = await readmeResponse.text();

        return NextResponse.json({ repo: repoName, readme: readmeContent });
    } catch (_) {
        return NextResponse.json({ error: `An error occurred while fetching the README${_}` }, { status: 500 });
    }
}
