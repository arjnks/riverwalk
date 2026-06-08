import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal } from 'lucide-react';
import './Packages.css';

gsap.registerPlugin(ScrollTrigger);

const package1 = [
  { name: 'DESIGN_AND_PAGES: 6', price: '₹18,000' },
  { name: 'INQUIRY_SYSTEM', price: '₹8,000' },
  { name: 'ADMIN_PANEL_MODULE', price: '₹12,000' },
  { name: 'MOBILE_RESPONSIVE_CONFIG', price: '₹3,000' },
  { name: 'API: WHATSAPP+GMAPS', price: '₹2,000' },
  { name: 'SEO_SETUP_BASIC', price: '₹2,000' },
  { name: 'DEPLOYMENT_ENV', price: '₹5,000' },
  { name: 'SUPPORT_MONTH: 3', price: '0_COST' },
];

export const Packages = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        gsap.fromTo(card, 
          { x: -50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="packages-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">MODULE_PRICING</h2>
        
        <div className="packages-grid">
          {/* Package 1 */}
          <div className="package-card schematic-box bg-surface" ref={(el) => { cardsRef.current[0] = el; }}>
            <div className="package-header">
              <h3 className="package-name">{'>'} PKG_01</h3>
              <p className="package-desc">WEBSITE_ONLY</p>
              <h4 className="package-price">₹45,000</h4>
            </div>
            
            <div className="package-body">
              <ul className="feature-list">
                {package1.map((item, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-icon"><Terminal size={14} /></span>
                    <span className="feature-name">{item.name}</span>
                    <span className="feature-value text-accent">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Package 2 */}
          <div className="package-card schematic-box bg-surface package-highlight" ref={(el) => { cardsRef.current[1] = el; }}>
            <div className="package-badge">BUNDLE_ACTIVE</div>
            <div className="package-header">
              <h3 className="package-name">{'>'} PKG_02</h3>
              <p className="package-desc">WEB + SOCIAL_MEDIA</p>
              <h4 className="package-price">₹48,000+</h4>
              <p className="package-saving text-accent">BUNDLE_SAVE: ₹3,000</p>
            </div>
            
            <div className="package-body">
              <ul className="feature-list">
                <li className="feature-item">
                  <span className="feature-icon"><Terminal size={14} /></span>
                  <span className="feature-name">WEB_MODULE (PKG_01)</span>
                  <span className="feature-value">₹42,000(one time payment)</span>
                </li>
                
                <li className="feature-divider">SOCIAL_OPTIONS</li>
                
                <li className="feature-item">
                  <span className="feature-icon"><Terminal size={14} /></span>
                  <span className="feature-name">BASIC (12_POSTS/MO)</span>
                  <span className="feature-value">₹6,000/MO</span>
                </li>
                
                <li className="feature-item or-divider">XOR</li>
                
                <li className="feature-item">
                  <span className="feature-icon"><Terminal size={14} /></span>
                  <span className="feature-name">STD (16_POSTS + REELS)</span>
                  <span className="feature-value text-accent">₹9,000/MO</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
