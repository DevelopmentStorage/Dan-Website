"use client";
import {motion} from "framer-motion";
import {Card, CardContent} from "../ui/card";
import React, {useEffect, useState} from "react";
import {DataSpace} from "@/lib/DataSpace";
import {YoutubeAccounts} from "@/lib/types";

export default function Showcase() {
    const [accounts, setAccounts] = useState<YoutubeAccounts | null>();
    const fetch = async () => {
        const accounts = await DataSpace.fetch<YoutubeAccounts>("https://raw.githubusercontent.com/DevelopmentStorage/Dan-Website/refs/heads/dataSpace/youtubers.json")
        setAccounts(
            await Promise.all(accounts.map(async (a) => {
                return await DataSpace.videoBuilder(a);
            }))
        )
    }
    useEffect(() => {
        fetch()
    }, []);


    return (
        <section
            className="py-24 px-4 md:px-16 bg-gradient-to-br from-[#181c23] to-[#23272f] min-h-screen"
            id="showcase"
        >
            <h2 className="text-4xl md:text-5xl font-black mb-14 tracking-tight text-white drop-shadow-neon">
                <span className="border-b-4 border-cyan-400 pb-1">Showcase</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {accounts ? accounts.map((account) => (
                    account.youtubeVideos.map((video) => {
                        return (
                            <motion.div
                                key={video?.videoId}
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                whileHover={{scale: 1.04}}
                                className="relative group"
                            >
                                <Card
                                    className="bg-gradient-to-br from-[#23272f]/90 to-[#181c23]/80 border border-cyan-500/20 shadow-xl shadow-cyan-400/10 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-cyan-400/30 backdrop-blur-lg">
                                    <div className="relative">
                                        <img
                                            src={video?.thumbnail}
                                            alt={video?.title}
                                            className="w-full h-48 object-cover rounded-t-2xl border-b-2 border-cyan-400/30"
                                        />

                                        <div
                                            className="absolute inset-0 pointer-events-none group-hover:shadow-[0_0_24px_8px_rgba(34,211,238,0.25)] transition-shadow duration-300"/>
                                        <div
                                            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-cyan-400 transition-all duration-500"/>
                                    </div>
                                    <CardContent className="p-6">
                                        <a
                                            href={video?.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-lg font-bold text-cyan-400 hover:underline truncate transition-colors"
                                            title={video?.title}
                                        >
                                            {video?.title}
                                        </a>
                                        <p className="text-gray-300 text-xs mt-2 mb-1">
                                            <span className="font-mono text-cyan-300">Channel:</span>{" "}
                                            {video?.channelTitle}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            <span className="font-mono text-cyan-300">Published:</span>{" "}
                                            {new Date(video?.published).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })

                )) : <div>No Videos...</div>}
            </div>
        </section>
    );
}
