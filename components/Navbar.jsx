'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

function fallbackCopy(text) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) {
            console.error('Fallback copy command was unsuccessful');
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy using clipboard API: ', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

export default function Navbar() {
    const [caState, setCaState] = useState('normal'); // 'normal' | 'hover' | 'action'
    const isCaHoveredRef = useRef(false);
    const caTimeoutRef = useRef(null);

    const handleCaMouseEnter = () => {
        isCaHoveredRef.current = true;
        if (caState !== 'action') {
            setCaState('hover');
        }
    };

    const handleCaMouseLeave = () => {
        isCaHoveredRef.current = false;
        if (caState !== 'action') {
            setCaState('normal');
        }
    };

    const handleCaClick = () => {
        copyToClipboard('6KDh3wLSZMg37nnU7prtKZr7Rut7WQGSf33Vp1G7pump');
        setCaState('action');

        if (caTimeoutRef.current) {
            clearTimeout(caTimeoutRef.current);
        }

        caTimeoutRef.current = setTimeout(() => {
            if (isCaHoveredRef.current) {
                setCaState('hover');
            } else {
                setCaState('normal');
            }
            caTimeoutRef.current = null;
        }, 2000);
    };

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // ② Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        // ─── Navbar Right (CA Button) handled reactively ───

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
            if (caTimeoutRef.current) {
                clearTimeout(caTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <img src="/assets/VimeoHero SVG/usdc-logo.png" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                        </div>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <a href="https://dexscreener.com/solana/edexqsn8ndyudusndngmybr9czevkbvxjb2vpfmvo6x3" target="_blank" rel="noopener noreferrer" className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="/assets/social/dex.png" loading="eager" alt="Dexscreener" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-maroon">dexscreener</span>
                                        <h4 className="nav-work-title">buy $ansem now!</h4>
                                    </div>
                                </a>
                                <a href="https://x.com/theblackbull_x" target="_blank" rel="noopener noreferrer" className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="/assets/social/x.png" loading="eager" alt="X Account" sizes="100vw" srcSet="/assets/social/x.png 1080w" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">x</span>
                                        <h4 className="nav-work-title">follow our x account</h4>
                                    </div>
                                </a>
                                <a href="https://x.com/i/communities/2027147135070982610" target="_blank" rel="noopener noreferrer" className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="/assets/social/x.png" loading="eager" alt="Community" sizes="100vw" srcSet="/assets/social/community.png 1080w" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">community</span>
                                        <h4 className="nav-work-title">join our community!</h4>
                                    </div>
                                </a>
                                <a href="#sticker-pack" className="nav-work-btn"><span className="nav-work-btn__text">stickers pack</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                </div>
                <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <button
                        className="ca-button"
                        onClick={handleCaClick}
                        onMouseEnter={handleCaMouseEnter}
                        onMouseLeave={handleCaMouseLeave}
                        aria-label="Copy contract address"
                    >
                        <img
                            src="/assets/ca-button/normal-state.png"
                            alt="CA Copy"
                            className={`ca-button-img ${caState === 'normal' ? 'active' : ''}`}
                        />
                        <img
                            src="/assets/ca-button/hover-state.png"
                            alt="CA Copy Hover"
                            className={`ca-button-img ${caState === 'hover' ? 'active' : ''}`}
                        />
                        <img
                            src="/assets/ca-button/action-state.png"
                            alt="CA Copy Clicked"
                            className={`ca-button-img ${caState === 'action' ? 'active' : ''}`}
                        />
                    </button>
                </div>
            </nav>
        </>
    );
}
