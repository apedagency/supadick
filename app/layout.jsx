import './globals.css';

export const metadata = {
    title: 'ANSEM | The Black Bull',
    description: 'The Black Bull charges when everyone else stops believing.',
    openGraph: {
        title: 'ANSEM | The Black Bull',
        description: 'The Black Bull charges when everyone else stops believing.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ANSEM | The Black Bull',
        description: 'The Black Bull charges when everyone else stops believing.',
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
