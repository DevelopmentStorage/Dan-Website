"use server";
import { YoutubeVideo } from "@/types/YoutubeVideo";
import Parser from 'rss-parser';

const parser = new Parser();

const CHANNEL_IDS = [
    'UCsf35WJxfZ2Uh0TPLJN1Sqw',
    'UCVZmhmDtF8wCHNqpviNsAlw',
    'UCxzAgP3LiHKki4OAy0le9sw'
];


export async function fetchYouTubeVideos(): Promise<YoutubeVideo[]> {
    const allVideos: YoutubeVideo[] = [];

    for (const id of CHANNEL_IDS) {
        const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
        const feed = await parser.parseURL(feedUrl);
        ;
        const channelTitle = feed.title || 'Unknown Channel';

        let done = 0;
        const maxItems = 10;

        for (const item of feed.items) {
            if (done >= maxItems) break;
            done++;

            const videoId = item.id?.split(':').pop() ?? '';

            allVideos.push({
                channelId: id,
                channelTitle,
                videoId,
                thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
                title: item.title || '',
                published: item.pubDate || '',
                link: item.link || ''
            });
        }
    }

    return allVideos.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}
