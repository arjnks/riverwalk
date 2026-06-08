import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import './Hero.css';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(containerRef.current.children, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="schematic-box" style={{ padding: '2rem', display: 'inline-block', textAlign: 'left', border: '1px solid var(--border)' }} ref={containerRef}>
          <p className="hero-subtitle text-accent">
            {'>'} INITIATING_PROJECT_PROPOSAL
          </p>
          
          <h1 className="hero-title">
            RIVERWALK
          </h1>

          <div className="hero-divider"></div>

          <div className="hero-description">
            <p className="hero-text">
              SYS.ARCHITECT: ARJUN S.
              <br/>
              CONTACT.NODE: +91 7736728416
            </p>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text text-accent">SCROLL_DOWN ▼</span>
        <motion.div 
          className="scroll-line"
          animate={{
            scaleY: [0, 1, 0],
            translateY: [0, 40, 80]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: "top", backgroundColor: 'var(--accent)' }}
        />
      </div>
    </section>
  );
};
