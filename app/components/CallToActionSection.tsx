import React from 'react';
import Image from 'next/image';
import styles from './CallToActionSection.module.css';
import Button from './Button';


const renderStrandplyText = (lineText: string, startIndex: number = 0, isHighlight: boolean = false) => {
  let currentIndex = startIndex;
  const words = lineText.trim().split(/\s+/);

  return words.map((word, wordIndex) => {
    const chars = word.split("");
    const wordStartIndex = currentIndex;
    currentIndex += chars.length;

    return (
      <span key={wordIndex} className={`${styles.wordWrapper} ${isHighlight ? styles.highlight : ""}`}>
        {chars.map((char, charIndex) => {
          const i = wordStartIndex + charIndex;
          return (
            <span
              key={charIndex}
              aria-hidden="true"
              className={styles.strandplyChar}
              style={{ "--i": i } as React.CSSProperties}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  });
};

export default function CallToActionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.heading}>
          {renderStrandplyText("Ready to start ", 0, false)}
          {renderStrandplyText("your project?", 12, true)}
        </h2>
          
          <p className={styles.description}>
            Whether you have questions, ideas, or projects in mind, we&apos;re here
            to help turn your visions into reality. Let&apos;s talk Custom Doors — your journey
            starts now.
          </p>
          
          <div className={styles.actions}>
            <Button 
              href="/contact" 
              variant="primary" 
              size="lg"
            >
              Get in Touch
            </Button>
          </div>
        </div>
        
        <div className={styles.graphicWrapper}>
          <div className={styles.doorsContainer}>
            <div className={`${styles.door} ${styles.door1}`}>
              <Image 
                src="/doors/dark_wood_door.jpg" 
                alt="Dark Wood Door" 
                fill 
                sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 240px"
              />
            </div>
            <div className={`${styles.door} ${styles.door2}`}>
              <Image 
                src="/doors/medium_wood_door.jpg" 
                alt="Medium Wood Door" 
                fill
                sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 240px"
              />
            </div>
            <div className={`${styles.door} ${styles.door3}`}>
              <Image 
                src="/doors/light_oak_door.jpg" 
                alt="Light Oak Door" 
                fill
                sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 240px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




