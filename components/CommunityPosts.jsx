"use client";

import React, { useEffect } from "react";

export default function CommunityPosts() {
    useEffect(() => {
        // Ensure the Twitter widgets script is loaded
        const scriptId = 'twitter-wjs';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);
        } else if (window.twttr && window.twttr.widgets) {
            // Re-render tweets if script is already loaded
            window.twttr.widgets.load();
        }
    }, []);

    const posts = [
        "https://x.com/blknoiz06/status/2067453680920478090",
        "https://x.com/blknoiz06/status/2067438927728849364",
        "https://x.com/blknoiz06/status/2066522670364082426",
        "https://x.com/blknoiz06/status/2066510057307570484",
        "https://x.com/blknoiz06/status/2066287821791301824",
        "https://x.com/blknoiz06/status/2066272347317821942",
    ];

    return (
        <section className="community-posts-section content-section">
            <div className="motion-card__heading" style={{ marginBottom: "3rem" }}>
                <h2 className="motion-card__title" style={{ textAlign: "center" }}>
                    The Trenches
                    <br />
                    Speak.
                </h2>
            </div>

            <div className="community-posts__grid">
                {posts.map((url, index) => (
                    <div key={index} className="community-posts__item">
                        <blockquote className="twitter-tweet" data-theme="dark">
                            <a href={url}></a>
                        </blockquote>
                    </div>
                ))}
            </div>
        </section>
    );
}
