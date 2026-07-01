'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_ICONS, WIGGLE_CONFIG } from '@/lib/data';

const FOOTER_STAMPS = [
    { name: 'middle-finger', src: '/assets/stamp/middle-finger.png', className: 'sticker-boom' },
    { name: 'lfg', src: '/assets/stamp/lfg.png', className: 'sticker-smiley' },
    { name: 'cape', src: '/assets/stamp/cape.png', className: 'sticker-heart' },
    { name: 'handshake', src: '/assets/stamp/handshake.png', className: 'sticker-hands' },
    { name: 'computer', src: '/assets/stamp/computer.png', className: 'sticker-100' },
    { name: 'usdc-flying', src: '/assets/stamp/usdc-flying.png', className: 'sticker-camera' },
    { name: 'dicktime', src: '/assets/stamp/dicktime.png', className: 'sticker-dicktime' }
];

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => { tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' }); };
    const onLeave = () => { if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); } };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => { element.removeEventListener('mouseenter', onEnter); element.removeEventListener('mouseleave', onLeave); };
}

export default function Footer() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ─── Map link underline draw/undraw ───
        const footerMapLink = document.querySelector('.footer-map-link');
        if (footerMapLink) {
            const mapSvgPaths = footerMapLink.querySelectorAll('.draw-btn__svg path');
            mapSvgPaths.forEach(path => {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
            });
            const onEnter = () => gsap.fromTo(mapSvgPaths, { strokeDashoffset: (i, el) => el.getTotalLength() }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, overwrite: true });
            const onLeave = () => gsap.to(mapSvgPaths, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
            footerMapLink.addEventListener('mouseenter', onEnter);
            footerMapLink.addEventListener('mouseleave', onLeave);
        }

        // ─── Credits pop-out ───
        const creditsWrapper = document.querySelector('.footer-credits-wrapper');
        if (creditsWrapper) {
            const creditsBox = creditsWrapper.querySelector('.credits-box');
            const creditsItems = creditsBox.querySelectorAll('.credits-item');

            // Temporarily make the box visible to measure full dimensions
            gsap.set(creditsBox, { visibility: 'visible', width: 'auto', height: 'auto', opacity: 1 });
            const boxRect = creditsBox.getBoundingClientRect();
            const fullWidth = boxRect.width;
            const fullHeight = boxRect.height;
            const boxHeight = boxRect.height; // for text Y translation

            // Distance from box's final position down to behind the credits button
            const creditsBtn = creditsWrapper.querySelector('.footer-credits');
            const startY = creditsBtn.offsetHeight + 15;

            // Set precise initial states for box and text
            // Box starts collapsed rather than 0 scale
            gsap.set(creditsBox, { visibility: 'hidden', width: 0, height: 0, opacity: 0, y: startY });
            gsap.set(creditsItems, { y: boxHeight });

            const onEnter = () => {
                gsap.set(creditsBox, { visibility: 'visible' });
                gsap.killTweensOf(creditsBox);
                gsap.killTweensOf(creditsItems);

                // Box physically grows to full dimensions instead of scaling
                gsap.to(creditsBox, { width: fullWidth, height: fullHeight, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });

                // Text slides up smoothly, slightly delayed
                gsap.to(creditsItems, { y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.1 });
            };

            const onLeave = () => {
                gsap.killTweensOf(creditsBox);
                gsap.killTweensOf(creditsItems);

                // Box physically shrinks to 0x0
                gsap.to(creditsBox, {
                    width: 0, height: 0, opacity: 0, y: startY, duration: 0.35, ease: 'power3.in',
                    onComplete: () => gsap.set(creditsBox, { visibility: 'hidden' })
                });

                // Text sits perfectly still while the box begins crushing it, 
                // and then slowly slides back down in reverse order (`stagger: -0.03`) so the rightmost column clears first
                gsap.to(creditsItems, { y: boxHeight, duration: 0.4, ease: 'power3.in', stagger: -0.03, delay: 0.1 });
            };

            creditsWrapper.addEventListener('mouseenter', onEnter);
            creditsWrapper.addEventListener('mouseleave', onLeave);
        }

        // ─── Footer sticker pop-up on scroll ───
        const footerStickers = gsap.utils.toArray('.footer-sticker');
        const stickerRotations = [12, -10, 8, -12, 10, -8];
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (!isMobile) {
            // Desktop: animated pop-in on scroll + cursor proximity push
            gsap.set(footerStickers, { scale: 0, opacity: 0, transformOrigin: 'center bottom' });
            footerStickers.forEach((sticker, i) => gsap.set(sticker, { rotation: stickerRotations[i % stickerRotations.length] }));

            gsap.to(footerStickers, {
                scale: 1, opacity: 1,
                rotation: (i) => stickerRotations[i % stickerRotations.length] * 0.7,
                duration: 0.7, ease: 'back.out(1.7)', stagger: 0.12,
                scrollTrigger: {
                    trigger: '.footer-stickers',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            // ─── Sticker cursor-velocity push (desktop only) ───
            footerStickers.forEach((sticker, i) => {
                const baseRotation = stickerRotations[i % stickerRotations.length] * 0.7;
                const PROXIMITY_RADIUS = 180, STRENGTH = 4, MAX_PUSH = 55, MIN_SPEED = 3;
                let prevX = 0, prevY = 0;
                const clamp = (v, max) => Math.max(-max, Math.min(max, v));

                const onMove = (e) => {
                    const dx = e.clientX - prevX, dy = e.clientY - prevY;
                    prevX = e.clientX; prevY = e.clientY;
                    const rect = sticker.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
                    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
                    const onSticker = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
                    const speed = Math.hypot(dx, dy);
                    const isOverCreditsBox = e.target.closest('.credits-box') !== null;

                    if (!onSticker && !isOverCreditsBox && dist < PROXIMITY_RADIUS && speed > MIN_SPEED) {
                        const falloff = 1 - (dist / PROXIMITY_RADIUS);
                        const pushX = clamp(dx * STRENGTH * falloff, MAX_PUSH);
                        const pushY = clamp(dy * STRENGTH * falloff, MAX_PUSH);
                        gsap.killTweensOf(sticker);
                        gsap.to(sticker, { x: pushX, y: pushY, rotation: baseRotation + pushX * 0.25, duration: 0.18, ease: 'power3.out' });
                        gsap.to(sticker, { x: 0, y: 0, rotation: baseRotation, duration: 1.1, ease: 'elastic.out(1, 0.35)', delay: 0.18 });
                    }
                };
                document.addEventListener('mousemove', onMove);
            });
        } else {
            // Mobile: stickers appear immediately — no animation, no cursor tracking
            footerStickers.forEach((sticker, i) => {
                gsap.set(sticker, {
                    scale: 1,
                    opacity: 1,
                    rotation: stickerRotations[i % stickerRotations.length] * 0.7
                });
            });
        }


        // ─── Wiggle on footer interactive elements ───
        const wiggleTargets = [
            { selector: '.footer-column:first-child h3', key: 'jobHeading' },
            { selector: '.footer-map-link span', key: 'googleMap' },
            { selector: '.footer-email', key: 'email' },
            { selector: '.footer-whatsapp', key: 'whatsapp' },
            { selector: '.credits-name', key: 'socials' }, // Added wiggle target for names using social intensity
        ];
        wiggleTargets.forEach(({ selector, key }) => {
            document.querySelectorAll(selector).forEach(el => initWiggle(el, WIGGLE_CONFIG[key]));
        });

        // ─── Social icon wiggle ───
        document.querySelectorAll('.single-social').forEach(el => initWiggle(el, WIGGLE_CONFIG.socials));

    }, []);

    return (
        <div className="footer-inner">
            <div className="footer-top">
                {/* Office */}
                <div className="footer-column">
                    <span className="footer-badge">operations</span>
                    <address>
                        24/7 narrative surveillance<br />
                        ongoing trench protection
                    </address>
                </div>
                {/* Contact */}
                <div className="footer-column">
                    <span className="footer-badge">links</span>
                    <a className="footer-email">$ANSEM socials</a>
                    <div className="footer-socials" id="footer-socials">
                        {SOCIAL_ICONS.map(({ href, label, imgSrc }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="single-social w-inline-block"
                                aria-label={label}
                            >
                                <img
                                    src={imgSrc}
                                    alt={label}
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Big TRUUS wordmark */}
            <div className="footer-bottom">
                <div className="footer-big-text">
                    <img
                        src="/assets/VimeoHero SVG/usdc-logo.png"
                        alt=""
                        aria-hidden="true"
                        className="footer-logo__img"
                    />
                </div>

                {/* Stickers */}
                <div className="footer-stickers">
                    {FOOTER_STAMPS.map(({ name, src, className }) => (
                        <div key={name} className={`footer-sticker ${className}`}>
                            <img src={src} width="100%" alt="" aria-hidden="true" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
