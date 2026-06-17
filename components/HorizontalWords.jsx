'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalWords = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx;

        const initAnimation = () => {
            if (window.innerWidth <= 768) {
                if (ctx) { ctx.revert(); ctx = null; }
                return;
            }
            if (ctx) ctx.revert();

            ctx = gsap.context(() => {
                const container = sectionRef.current;
                const textRef = container?.querySelector('.horizontal-words__relative');
                if (!container || !textRef) return;

                const letters = container.querySelectorAll('.letter');
                const stickers = container.querySelectorAll('.horizontal-words__sticker-watch, .horizontal-words__sticker-cursor, .horizontal-words__sticker-phone');
                const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

                // --- ENTRANCE & PINNING LOGIC ---
                const entranceDistance = window.innerHeight;
                
                // Measure the actual scrollWidth of the text
                const scrollWidth = textRef.scrollWidth;
                
                // The original text "We wanna be where the people are" was ~220vw wide (including 50vw padding)
                // Let's use 2.2 * window.innerWidth as the baseline to scale pinnedDistance
                const baseScrollWidth = window.innerWidth * 2.2;
                const pinnedDistance = Math.max(2500, Math.round(2500 * (scrollWidth / baseScrollWidth)));

                const scrollTween = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: () => `+=${entranceDistance + pinnedDistance}`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                scrollTween
                    .fromTo(textRef, {
                        x: window.innerWidth // Start words off-screen right
                    }, {
                        x: window.innerWidth * 0.5,
                        ease: "none",
                        duration: entranceDistance
                    })
                    .to(textRef, {
                        x: () => -(textRef.scrollWidth - window.innerWidth * 0.5),
                        ease: "none",
                        duration: pinnedDistance
                    });

                // Separate pinning logic so it only locks when the section hits the top
                ScrollTrigger.create({
                    trigger: container,
                    start: "top top",
                    end: () => `+=${pinnedDistance}`,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true
                });

                // Bounce each letter randomly
                letters.forEach((letter) => {
                    gsap.from(letter, {
                        yPercent: (Math.random() - 0.5) * 500,
                        rotation: (Math.random() - 0.5) * 60,
                        ease: "elastic.out(1.2, 1)",
                        scrollTrigger: {
                            trigger: letter,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 50%', // Finish as it reaches center
                            scrub: 0.5
                        }
                    });
                });

                // Bounce stickers
                stickers.forEach((sticker) => {
                    gsap.from(sticker, {
                        scale: 0,
                        yPercent: (Math.random() - 0.5) * 400,
                        rotation: (Math.random() - 0.5) * 60,
                        ease: "elastic.out(1.2, 1)",
                        scrollTrigger: {
                            trigger: sticker,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 50%', // Finish as it reaches center
                            scrub: 0.5
                        }
                    });
                });

                // Animate Drawing SVG Arrows 
                arrows.forEach((arrowPath) => {
                    if (arrowPath.getTotalLength) {
                        const pathLen = arrowPath.getTotalLength();
                        gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                        gsap.to(arrowPath, {
                            strokeDashoffset: 0,
                            duration: 1,
                            scrollTrigger: {
                                trigger: arrowPath.parentElement,
                                containerAnimation: scrollTween,
                                start: 'left 90%',
                                end: 'left 50%', // This is the last arrow's end point
                                scrub: 0.5
                            }
                        });
                    }
                });

            }, sectionRef);
        };

        // Initialize animation on mount
        initAnimation();

        // Recalculate and re-initialize if custom web fonts load late or window is resized
        if (typeof document !== 'undefined' && document.fonts) {
            document.fonts.ready.then(initAnimation);
        }
        window.addEventListener('resize', initAnimation);

        return () => {
            if (ctx) ctx.revert();
            window.removeEventListener('resize', initAnimation);
        };
    }, []);

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section">
            <div className="horizontal-words__relative">
                <div className="horizontal-words__sticker-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg"><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>
                    <img src="/assets/stamp/usdc-flying.png" className="horizontal-words__sticker-watch" alt="thumbs up sticker" />
                    <img src="/assets/stamp/dicktime.png" className="horizontal-words__sticker-cursor" alt="cursor sticker" />
                    <img src="/assets/stamp/computer.png" className="horizontal-words__sticker-phone" alt="phone sticker" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg"><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>

                    <h2 
  className="display horizontal-words__h2" 
  aria-label="Protecting the Trenches Through Every Cycle"
>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>P</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>o</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>c</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>i</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>n</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>g</div>

  {" "}

  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>h</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>

  {" "}

  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>T</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>n</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>c</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>h</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>s</div>

  {" "}

  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>T</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>h</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>o</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>u</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>g</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>h</div>

  {" "}

  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>E</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>v</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>y</div>

  {" "}

  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>C</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>y</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>c</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>l</div>
  <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
</h2>
                </div>
            </div>

            <div className="horizontal-words__bottom-text">
                <div className="horizontal-words__bottom-text-l">
  The trenches are entering critical conditions. Lifespans are shorter than ever.
  You cannot even sleep on your bags anymore without waking up completely destroyed
  by the morning. Every narrative becomes sell the news. Every launch lasts forty
  eight hours before disappearing into oblivion.

  <br />
  <br />

Most narratives come and go. ANSEM remains. One of the few uncs still pulling profit from the trenches, ANSEM embodies the Black Bull mentality: charging forward through every bear market while others stop believing.

  <br />
  <br />

  The Black Bull charges, motherfuckers!
</div>
            </div>
        </section>
    );
};

export default HorizontalWords;
