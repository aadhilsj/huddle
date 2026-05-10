"use client";

import { useState } from "react";
import styles from "./archive-slide-deck.module.css";

export type ArchiveSlide = {
  label: string;
  title: string;
  body?: string;
  points?: string[];
};

export function ArchiveSlideDeck({
  eyebrow,
  heading,
  slides
}: {
  eyebrow: string;
  heading: string;
  slides: ArchiveSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides.length) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  return (
    <section className={styles.deck}>
      <div className={styles.deckHeader}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2>{heading}</h2>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1))}
          >
            Prev
          </button>
          <span>
            {activeIndex + 1}/{slides.length}
          </span>
          <button
            type="button"
            onClick={() => setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <div className={styles.tabRail}>
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            className={index === activeIndex ? styles.tabActive : styles.tab}
            onClick={() => setActiveIndex(index)}
          >
            {slide.label}
          </button>
        ))}
      </div>

      <article className={styles.slideCard}>
        <p className={styles.slideLabel}>{activeSlide.label}</p>
        <h3>{activeSlide.title}</h3>
        {activeSlide.body ? <p className={styles.slideBody}>{activeSlide.body}</p> : null}
        {activeSlide.points?.length ? (
          <div className={styles.pointList}>
            {activeSlide.points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        ) : null}
      </article>
    </section>
  );
}
