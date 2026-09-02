import { motion } from "framer-motion";
import "./BrandMarquee.css";

const specs = [
  "IPHONE 17 PRO",
  "A18 PRO",
  "48MP CAMERA",
  "TITANIUM DESIGN",
  "PRO PERFORMANCE",
  "ALL-DAY BATTERY",
  "SAMSUNG GALAXY",
  "GOOGLE PIXEL",
];

function BrandMarquee() {
  const items = [...specs, ...specs];

  return (
    <section className="brand-marquee" aria-label="Phone Hub product highlights">
      <div className="brand-marquee-track">
        <motion.div
          className="brand-marquee-inner"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {items.map((item, index) => (
            <div className="brand-marquee-item" key={`${item}-${index}`}>
              <span className="brand-marquee-text">{item}</span>
              <span className="brand-marquee-dot" aria-hidden="true" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BrandMarquee;
