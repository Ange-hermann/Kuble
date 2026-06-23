import AVNavbar from './studio/AVNavbar';
import AVHero from './studio/AVHero';
import AVStats from './studio/AVStats';
import AVServices from './studio/AVServices';
import AVPortfolio from './studio/AVPortfolio';
import AVProcess from './studio/AVProcess';
import AVSocial from './studio/AVSocial';
import AVEquipement from './studio/AVEquipement';
import AVTestimonials from './studio/AVTestimonials';
import AVBlog from './studio/AVBlog';
import AVContact from './studio/AVContact';
import AVFooter from './studio/AVFooter';

export default function AudioVisuel() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <AVNavbar />
      <AVHero />
      <AVStats />
      <AVServices />
      <AVPortfolio />
      <AVProcess />
      <AVSocial />
      <AVEquipement />
      <AVTestimonials />
      <AVBlog />
      <AVContact />
      <AVFooter />
    </div>
  );
}

