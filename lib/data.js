// ─── lib/data.js — All static data for the Truus website ─────────────────────
// ES Module exports — imported by React components

// Marquee brand logos
export const brands = [
    { name: "sticker-1", src: "/assets/stickers/1.png", type: "image" },
    { name: "sticker-2", src: "/assets/stickers/2.png", type: "image" },
    { name: "sticker-3", src: "/assets/stickers/3.png", type: "image" },
    { name: "sticker-4", src: "/assets/stickers/4.png", type: "image" },
    { name: "sticker-5", src: "/assets/stickers/5.png", type: "image" },
    { name: "sticker-6", src: "/assets/stickers/6.png", type: "image" },
    { name: "sticker-7", src: "/assets/stickers/7.png", type: "image" },
    { name: "sticker-8", src: "/assets/stickers/8.png", type: "image" },
    { name: "sticker-9", src: "/assets/stickers/9.png", type: "image" },
    { name: "sticker-10", src: "/assets/stickers/10.png", type: "image" }
];

// Marquee background colors
export const colors = [
    "var(--color-green)",
    "var(--color-lightblue)",
    "var(--color-darkblue)",
    "var(--color-lightgreen)",
    "var(--color-orange)",
    "var(--color-maroon)",
    "var(--color-pink)"
];

// Footer social icon links + PNG image paths
export const SOCIAL_ICONS = [
    {
        href: 'https://dexscreener.com/solana/FnzKY6x7entQ1eR3D225dQyT7ybfka4PskBMQhb8L3CC',
        label: 'Dexscreener',
        imgSrc: '/assets/social/dex.png'
    },
    {
        href: 'https://x.com/theblackbull_x',
        label: 'X',
        imgSrc: '/assets/social/x.png'
    },
    {
        href: 'https://x.com/i/communities/2027147135070982610',
        label: 'Community',
        imgSrc: '/assets/social/community.png'
    }
];

// ANSEM Departments / Long Term Mission Cards

export const CARDS_DATA = [
    {
        color: 'green',
        sticker: 'cape',
        title: 'bull conviction',
        services: [
            'Buy The Fear',
            'Hold The Red',
            'Ignore The Noise',
            'Survive The Shakeout',
            'Stay In Position',
            'Keep Charging',
            'Never Fold'    
        ]
    },
    {
        color: 'darkblue',
        sticker: 'lfg',
        title: 'trench survival',
        services: [
            'Dodge The Rugs',
            'Avoid Exit Liquidity',
            'Outlive The Farmers',
            'Endure The Chop',
            'Beat The FUD',
            'Survive Bear Cycles',
            'Stay Solvent'
        ]
    },
    {
        color: 'orange',
        sticker: 'usdc-flying',
        title: 'bull instincts',
        services: [
            'Spot Opportunity',
            'Follow Momentum',
            'Trust Experience',
            'Read The Room',
            'Know The Cycle',
            'Respect Liquidity',
            'Move With Conviction'
        ]
    },
    {
        color: 'maroon',
        sticker: 'dicktime',
        title: 'unc wisdom',
        services: [
            'Seen It Before',
            'Heard Every Narrative',
            'Survived Every Cycle',
            'Ignore The Panic',
            'Trust The Process',
            'Stay Patient',
            'Collect The Upside'
        ]
    },
    {
        color: 'pink',
        sticker: 'computer',
        title: 'black bull code',
        services: [
            'Conviction Over Hype',
            'Patience Over Panic',
            'Strength Over Sentiment',
            'Discipline Over Emotion',
            'Experience Over Noise',
            'Belief Over Fear',
            'Charge Forward'
        ]
    }
];

// ─── Wiggle Intensity Config ────────────────────────────────────────────────
export const WIGGLE_CONFIG = {
    logoTruus: 4,
    socials: 5,
    jobHeading: 1,
    googleMap: 1,
    email: 1,
    whatsapp: 1,
};

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        durationIn: 2.2,
        durationOut: 2.7
    }
};
