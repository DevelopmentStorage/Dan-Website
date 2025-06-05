"use server";
import { YoutubeVideo } from "@/types/YoutubeVideo";
import { XMLParser } from 'fast-xml-parser';
import { video } from "framer-motion/client";

const parser = new XMLParser();

const CHANNEL_IDS = [{
    id: 'UCsf35WJxfZ2Uh0TPLJN1Sqw',
    videoCount: null,
    all: true,
    cutBy: null
},
{
    id: 'UCVZmhmDtF8wCHNqpviNsAlw',
    videoCount: 2,
    all: false,
    cutBy: null
},
{
    id: 'UCxzAgP3LiHKki4OAy0le9sw',
    videoCount: 10,
    all: false,
    cutBy: "Dan J. Deutschmann"
}
]

export async function fetchYouTubeVideos(): Promise<YoutubeVideo[]> {
    const allVideos: YoutubeVideo[] = [];

    for (const channel of CHANNEL_IDS) {
        const feedData = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`);
        const feedString = await feedData.text();
        const feed = await parser.parse(feedString);

        let done = 0;

        for (const item of feed.feed.entry || []) {
            if (channel.videoCount && done >= channel.videoCount) break;
            done++;

            const videoId = item.id?.split(':').pop() ?? '';
            if (channel.cutBy && !item['media:group']['media:description'].includes(channel.cutBy)) continue;
            if (item.title.toLowerCase().includes('#shorts')) continue;

            allVideos.push({
                channelId: channel.id,
                channelTitle: item.author?.name || '',
                videoId,
                thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
                title: item.title || '',
                published: item.published || '',
                link: `https://www.youtube.com/watch?v=${videoId}`,
            });
        }
    }

    return allVideos.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}
