import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
import Testimonials from '../components/Testimonials';
import About from '../components/About';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Projects />
      <TechStack />
      <Testimonials />
      <About />
    </>
  );
}
