import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import navLogo from '../assets/logo/navLogo.PNG';
import './PhoneHubIntro.css';

export default function PhoneHubIntro() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('phonehub-intro-seen') !== 'true');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    let value = 0;
    const timer = window.setInterval(() => {
      value += value < 65 ? 5 : value < 92 ? 2 : 1;
      if (value >= 100) {
        value = 100;
        window.clearInterval(timer);
        window.setTimeout(() => {
          sessionStorage.setItem('phonehub-intro-seen', 'true');
          setVisible(false);
        }, 480);
      }
      setProgress(value);
    }, 24);
    return () => window.clearInterval(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div className="phonehub-intro" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
      <div className="phonehub-grid" />
      <div className="phonehub-orb" />
      <div className="phonehub-content">
        <motion.div
          className="phonehub-logo-wrap"
          initial={{ opacity: 0, scale: .88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={navLogo} alt="Phone Hub" className="phonehub-logo" />
          <span className="phonehub-scan" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, letterSpacing: '.4em' }}
          animate={{ opacity: 1, letterSpacing: '.22em' }}
          transition={{ delay: .3, duration: .6 }}
        >NEXT-GEN DEVICES · CURATED FOR YOU</motion.p>
      </div>
      <div className="phonehub-status">
        <span>SYSTEM READY</span>
        <div className="phonehub-line"><i style={{ width: `${progress}%` }} /></div>
        <strong>{String(progress).padStart(3, '0')}</strong>
      </div>
      <div className="phonehub-corner phonehub-corner-tl" />
      <div className="phonehub-corner phonehub-corner-tr" />
      <div className="phonehub-corner phonehub-corner-bl" />
      <div className="phonehub-corner phonehub-corner-br" />
      <motion.div
        className="phonehub-reveal"
        initial={{ scaleX: 1 }}
        animate={progress === 100 ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}
      />
    </motion.div>
  );
}
