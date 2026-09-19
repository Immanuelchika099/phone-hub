import { useEffect, useState } from 'react';
import navLogo from '../assets/logo/navLogo.PNG';
import './FrankyGadgetIntro.css';

export default function FrankyGadgetIntro() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('frankygadget-intro-seen') !== 'true');

  useEffect(() => {
    if (!visible) return undefined;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem('frankygadget-intro-seen', 'true');
      setVisible(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="frankygadget-intro" aria-label="Franky Gadget">
      <img src={navLogo} alt="Franky Gadget" className="frankygadget-logo" />
    </div>
  );
}
