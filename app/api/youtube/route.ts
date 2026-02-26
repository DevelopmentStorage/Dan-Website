"use server"
import {NextRequest, NextResponse} from "next/server";
import {YoutubeAccount, YoutubeVideo} from "@/lib/types";
import {XMLParser} from "fast-xml-parser";

export async function POST(
    req: NextRequest,
) {
    const account = await req.json() as YoutubeAccount
    if (!account) return Response.json({message: "No Account..."})

    const parser = new XMLParser();

    const feedData = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${account.id}`,
        {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
    );
    const feedString = await feedData.text();
    const feed = await parser.parse(feedString);

    account.youtubeVideos = (feed.feed.entry as any[]).filter((f) => {
        if (account.cutBy) {
            if (!f['media:group']['media:description'].includes(account.cutBy)) return false
        } else if (!f.title.toLowerCase().includes('#shorts')) {
            return true
        } else return false
    }).slice(
        0, account.videoCount ? account.videoCount : 3
    ).map((item) => {

        const videoId = item.id?.split(':').pop() ?? '';

        return {
            channelId: account.id,
            channelTitle: item.author?.name || '',
            videoId,
            thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
            title: item.title || '',
            published: item.published || '',
            link: `https://www.youtube.com/watch?v=${videoId}`,
        } satisfies YoutubeVideo
    }) as YoutubeVideo[]

    return Response.json(account)
}