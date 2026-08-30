import { useEffect, useState } from "react";
import "./CookieConsent.css";

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("phonehub-cookie-consent")) return;
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem("phonehub-cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookieConsent" role="dialog" aria-label="Cookie notice">
      <div className="cookieCopy">
        <span className="cookieEyebrow">PHONEHUB</span>
        <p>We use cookies to keep your experience smooth and remember your preferences.</p>
      </div>
      <button type="button" onClick={accept}>Got it</button>
    </div>
  );
}

export default CookieConsent;
