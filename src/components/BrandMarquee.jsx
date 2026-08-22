import { motion } from "framer-motion";
import { FaApple, FaAndroid } from "react-icons/fa";
import { SiSamsung, SiGoogle, SiXiaomi, SiOneplus, SiNothing } from "react-icons/si";
import "./BrandMarquee.css";

const brands = [
  { name: "Apple", icon: FaApple },
  { name: "Samsung", icon: SiSamsung },
  { name: "Google", icon: SiGoogle },
  { name: "Xiaomi", icon: SiXiaomi },
  { name: "OnePlus", icon: SiOneplus },
  { name: "Nothing", icon: SiNothing },
  { name: "Android", icon: FaAndroid },
];

function BrandMarquee() {
  const items = [...brands, ...brands];

  return (
    <section className="brand-marquee" aria-label="Brands available on PhoneHub">
      <div className="brand-marquee-track">
        <motion.div
          className="brand-marquee-inner"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {items.map(({ name, icon: Icon }, index) => (
            <div className="brand-marquee-item" key={`${name}-${index}`}>
              <Icon />
              <span>{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BrandMarquee;
