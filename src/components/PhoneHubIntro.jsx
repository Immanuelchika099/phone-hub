import { useEffect, useState } from 'react';
import navLogo from '../assets/logo/navLogo.PNG';
import './PhoneHubIntro.css';

export default function PhoneHubIntro() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('phonehub-intro-seen') !== 'true');

  useEffect(() => {
    if (!visible) return undefined;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem('phonehub-intro-seen', 'true');
      setVisible(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="phonehub-intro" aria-label="Phone Hub">
      <img src={navLogo} alt="Phone Hub" className="phonehub-logo" />
    </div>
  );
}
