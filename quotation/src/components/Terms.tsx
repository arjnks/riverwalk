import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Clock, Server } from 'lucide-react';
import './Terms.css';

gsap.registerPlugin(ScrollTrigger);

export const Terms = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blocksRef.current.forEach((block) => {
        gsap.fromTo(block, 
          { scaleY: 0, opacity: 0 },
          { 
            scaleY: 1, 
            opacity: 1, 
            duration: 0.4, 
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: block,
              start: 'top 90%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="terms-section" ref={sectionRef}>
      <div className="container">
        <div className="terms-grid">
          
          <div className="term-block schematic-box bg-surface" ref={(el) => { blocksRef.current[0] = el; }}>
            <div className="term-icon-wrapper text-accent">
              <Server size={20} />
            </div>
            <h3 className="term-title">{'>'} PAYMENT_PROTOCOL</h3>
            <ul className="term-list">
              <li>[40%] ADVANCE_INITIATION</li>
              <li>[30%] DESIGN_APPROVAL</li>
              <li>[30%] FINAL_DELIVERY</li>
            </ul>
          </div>

          <div className="term-block schematic-box bg-surface" ref={(el) => { blocksRef.current[1] = el; }}>
            <div className="term-icon-wrapper text-accent">
              <Clock size={20} />
            </div>
            <h3 className="term-title">{'>'} EXEC_TIMELINE</h3>
            <p className="term-text">
              ESTIMATED_TTE: <span className="text-accent">3–4 WEEKS</span> 
              <br/>
              (FROM ADVANCE PAYMENT)
            </p>
          </div>

          <div className="term-block schematic-box bg-surface term-warning" ref={(el) => { blocksRef.current[2] = el; }}>
            <div className="term-icon-wrapper text-text-muted">
              <AlertTriangle size={20} />
            </div>
            <h3 className="term-title">{'>'} EXCLUSIONS</h3>
            <ul className="term-list text-muted-list">
              <li>CONTENT_COPYWRITING</li>
              <li>PHOTO/VIDEO_ASSETS</li>
              <li>LOGO_VECTORIZATION</li>
              <li>ANNUAL_HOSTING (~₹3K/YR)</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
