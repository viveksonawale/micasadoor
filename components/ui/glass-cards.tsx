"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CardData {
    id: string | number;
    title: string;
    description: string;
    color: string;
    image: string;
}

interface CardProps {
    id: string | number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
    image: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, index, totalCards, color, image }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        // Set initial state
        gsap.set(card, {
            scale: 1,
            transformOrigin: "center top"
        });

        // Create scroll trigger for stacking effect
        const st = ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);

                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center top"
                });
            }
        });

        return () => {
            st.kill();
        };
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            style={{
                height: '90vh',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                position: 'sticky',
                top: '90px',
                paddingTop: '20px'
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: '1000px',
                    height: '480px',
                    borderRadius: 'var(--radius-md)', // 6px from rules.md
                    isolation: 'isolate',
                    top: `${index * 20}px`,
                    transformOrigin: 'top',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    overflow: 'hidden'
                }}
            >
                {/* Left Content Area */}
                <div style={{
                    width: '50%',
                    padding: '48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff'
                }}>
                    <div style={{
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        fontSize: '80px',
                        fontWeight: '800',
                        color: '#f0f0f0', // Very light grey for the big background number
                        lineHeight: 1,
                        marginBottom: '16px',
                        letterSpacing: '-0.02em'
                    }}>
                        {id}
                    </div>
                    <h3 style={{
                        fontFamily: 'var(--font-playfair, serif)',
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '16px'
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        fontSize: '18px',
                        color: '#666666',
                        lineHeight: 1.6
                    }}>
                        {description}
                    </p>
                </div>

                {/* Right Image Area */}
                <div style={{
                    width: '50%',
                    position: 'relative',
                    height: '100%',
                    backgroundColor: '#f5f5f5'
                }}>
                    <img 
                        src={image} 
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export const StackedCards: React.FC<{ cards: CardData[] }> = ({ cards }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }, []);

    return (
        <div ref={containerRef}>
            {/* Cards Section */}
            <section style={{
                width: '100%',
                paddingBottom: '40px'
            }}>
                {cards.map((card, index) => {
                    return (
                        <Card
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            index={index}
                            totalCards={cards.length}
                            color={card.color}
                            image={card.image}
                        />
                    );
                })}
            </section>
        </div>
    );
};
