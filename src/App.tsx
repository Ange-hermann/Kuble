import './styles/globals.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Technologie from './pages/Technologie';
import Cybersecurite from './pages/Cybersecurite';
import DataAnalytique from './pages/DataAnalytique';
import IA from './pages/IA';
import Cloud from './pages/Cloud';
import APropos from './pages/APropos';
import ContactPage from './pages/ContactPage';
import AVLayout from './pages/studio/AVLayout';
import AVHome from './pages/studio/AVHome';
import AVAPropos from './pages/studio/AVAPropos';
import AVServicesPage from './pages/studio/AVServicesPage';
import AVRealisations from './pages/studio/AVRealisations';
import AVBlog from './pages/studio/AVBlog';
import AVContact from './pages/studio/AVContact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/technologie" element={<Technologie />} />
          <Route path="/cybersecurite" element={<Cybersecurite />} />
          <Route path="/data" element={<DataAnalytique />} />
          <Route path="/ia" element={<IA />} />
          <Route path="/cloud" element={<Cloud />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/audiovisuel" element={<AVLayout />}>
          <Route index element={<AVHome />} />
          <Route path="a-propos" element={<AVAPropos />} />
          <Route path="services" element={<AVServicesPage />} />
          <Route path="portfolio" element={<AVRealisations />} />
          <Route path="blog" element={<AVBlog />} />
          <Route path="contact" element={<AVContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
