import "./Newsletter.css";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <motion.div
        className="newsletter-card"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="newsletter-copy"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.65 }}
        >
          <p className="newsletter-eyebrow">STAY IN THE LOOP</p>
          <h2 id="newsletter-title">Get the latest <span>news.</span></h2>
          <p>
            New devices, product drops, PhoneHub updates and more — delivered
            straight to your inbox. No noise, just the good stuff.
          </p>
        </motion.div>

        <motion.form
          className="newsletter-form"
          onSubmit={(event) => event.preventDefault()}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.65 }}
        >
          <label htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-input-wrap">
            <Mail size={19} aria-hidden="true" />
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              required
            />
            <button type="submit" aria-label="Subscribe to PhoneHub news">
              <ArrowRight size={20} />
            </button>
          </div>
          <small>By subscribing, you agree to receive PhoneHub updates.</small>
        </motion.form>
      </motion.div>
    </section>
  );
}

export default Newsletter;
