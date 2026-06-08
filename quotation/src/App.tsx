import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Packages } from './components/Packages';
import { Terms } from './components/Terms';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <div className="ambient-bg"></div>
      <CustomCursor />
      <Hero />
      <Packages />
      <Terms />
      <Footer />
    </>
  );
}

export default App;
