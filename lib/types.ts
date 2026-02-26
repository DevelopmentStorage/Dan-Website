export type Customer = {
    name: string
    url: string
    logo: string
    summary: string
}
export type Customers = Customer[]

export type YoutubeAccount = {
    id: string
    videoCount: number
    cutBy: string | null
    youtubeVideos: YoutubeVideo[]
}

export type YoutubeVideo = {
    channelId: string;
    channelTitle: string;
    thumbnail?: string;
    videoId: string;
    title: string;
    published: string;
    link: string;
}

export type YoutubeAccounts = YoutubeAccount[]