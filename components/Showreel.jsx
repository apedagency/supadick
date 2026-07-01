'use client';

export default function Showreel() {
    return (
        <section className="showreel-section" id="showreel-section">
            <div className="showreel__content">
                <h2 className="showreel__title">Live Market Activity</h2>
                <p className="showreel__subtitle">Watch The Black Bull charge in real time.</p>
                <div className="chart-wrapper">
                    <iframe
                        src="https://dexscreener.com/solana/FnzKY6x7entQ1eR3D225dQyT7ybfka4PskBMQhb8L3CC?embed=1&theme=dark&trades=0&info=0"
                        title="DexScreener Live Chart"
                        className="chart-iframe"
                        allow="fullscreen"
                    />
                </div>
            </div>
        </section>
    );
}
