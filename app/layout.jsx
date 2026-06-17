import './globals.css';

export const metadata = {
    title: 'ANSEM | The Black Bull',
    description: 'The Black Bull charges when everyone else stops believing.',
    openGraph: {
        title: 'ANSEM | The Black Bull',
        description: 'The Black Bull charges when everyone else stops believing.',
        images: [
            {
                url: '/assets/social-banner.jpg',
                width: 1200,
                height: 630,
                alt: 'ANSEM | The Black Bull',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ANSEM | The Black Bull',
        description: 'The Black Bull charges when everyone else stops believing.',
        images: ['/assets/social-banner.jpg'],
    },
    icons: {
        icon: '/assets/favicon/favicon.ico',
        shortcut: '/assets/favicon/favicon.ico',
        apple: '/assets/favicon/apple-touch-icon.png',
    },
    manifest: '/assets/favicon/site.webmanifest',
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
