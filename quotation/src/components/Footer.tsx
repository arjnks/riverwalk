import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 75%',
          }
        }
      );
      
      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 60%',
          }
        }
      )
    }, footerRef);

    return () => {
      ctx.revert();
    }
  }, []);

  return (
    <footer className="footer-section" ref={footerRef}>
      <div className="container footer-content">
        <h2 className="footer-cta" ref={textRef}>
          {'>'} EXECUTE_BUILD_SEQUENCE<br />
          <span className="text-accent">AWAITING_INPUT</span>
        </h2>
        
        <div>
          <a 
            href="https://wa.me/917736728416" 
            target="_blank" 
            rel="noreferrer" 
            className="footer-button schematic-box"
            ref={buttonRef}
          >
            [ ACCEPT_PROPOSAL_VIA_WAPP ]
          </a>
        </div>
        
        <div className="footer-bottom">
          <p>SYS.DATE: {new Date().getFullYear()} // ALL_RIGHTS_RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
