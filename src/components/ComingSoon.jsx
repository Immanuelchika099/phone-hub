import "./ComingSoon.css";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

function ComingSoon() {
  return (
    <section className="coming-soon-section" aria-labelledby="coming-soon-title">
      <motion.div
        className="coming-soon-card"
        initial={{ opacity: 0, y: 80, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="coming-soon-glow" />

        <div className="coming-soon-content">
          <motion.p
            className="coming-soon-eyebrow"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            COMING SOON
          </motion.p>

          <motion.h2
            id="coming-soon-title"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Something bigger is <span>loading.</span>
          </motion.h2>

          <motion.p
            className="coming-soon-copy"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We are working on a new PhoneHub experience built to make discovering,
            comparing and getting your next device even better.
          </motion.p>

          <motion.div
            className="coming-soon-status"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <span className="status-dot" />
            <span>In development</span>
            <FiArrowUpRight size={17} />
          </motion.div>
        </div>

        <motion.div
          className="laptop-scene"
          initial={{ opacity: 0, x: 80, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="laptop-glow" />
          <motion.div
            className="laptop"
            whileHover={{ scale: 1.025, rotateY: -5, rotateX: 2 }}
            transition={{ duration: 0.35 }}
          >
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=85"
              alt="Laptop showing a modern workspace"
              className="laptop-image"
              loading="lazy"
            />
            <div className="laptop-shine" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ComingSoon;
