import "../pages/Home.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import phone1 from "../assets/news/phone1.jpg";
import phone2 from "../assets/news/phone2.jpg";
import phone3 from "../assets/news/phone3.jpg";
import phone4 from "../assets/news/phone4.jpg";
import phone5 from "../assets/news/phone5.jpg";
import phone6 from "../assets/news/phone6.jpg";
import phone7 from "../assets/news/phone7.jpg";

const stories = [
  { image: phone1, category: "APPLE", meta: "Mashable • 1d", title: "How Much Will the iPhone 18 Pro Cost? Fresh Leak Hints at a Major Price Hike", description: "The iPhone 18 Pro and iPhone 18 Pro Max could launch with higher prices as Apple reportedly introduces premium hardware upgrades and new AI-powered features." },
  { image: phone2, category: "LEAK", meta: "MacRumors • 5h", title: "Apple's First Foldable iPhone Could Arrive Sooner Than Expected", description: "Fresh reports suggest Apple's foldable iPhone may feature a nearly crease-free display, a slimmer design, and a premium build aimed at competing with Samsung." },
  { image: phone3, category: "UPDATE", meta: "The Verge • 2h", title: "iPhone 18 Camera Upgrade Could Be Apple's Biggest Leap", description: "Apple is reportedly testing a next-generation camera system with improved low-light performance and sharper zoom capabilities." },
  { image: phone4, category: "AUDIO", meta: "9to5Mac • 4h", title: "AirPods Pro 3 Could Deliver Apple's Best Audio Yet", description: "Leaks point to improved Active Noise Cancellation, better battery life, and enhanced spatial audio." },
  { image: phone5, category: "WATCH", meta: "Bloomberg • 6h", title: "Apple Watch Ultra 3 Rumored to Feature a Brighter Display", description: "Apple's next Ultra smartwatch is expected to feature a brighter display, faster performance, and new health tracking capabilities." },
  { image: phone6, category: "MAC", meta: "Bloomberg • 8h", title: "M5 MacBook Pro Rumored to Launch Later This Year", description: "The upcoming MacBook Pro is expected to feature Apple's powerful M5 chip, offering improved graphics, faster AI performance, and longer battery life." },
  { image: phone7, category: "IOS", meta: "The Verge • 11h", title: "iOS 27 Brings the Biggest iPhone Redesign in Years", description: "Apple is reportedly redesigning iOS 27 with a refreshed Control Center, smarter Siri features, improved customization, and smoother system-wide animations." }
];

function StoryCard({ story, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="story-stack-item" style={{ zIndex: index + 1 }}>
      <motion.article className="story-stack-card" style={{ scale, y }}>
        <div className="story-card-topline">
          <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span>{story.category}</span>
        </div>
        <div className="story-card-image-wrap">
          <img src={story.image} alt={story.title} className="story-card-image" />
        </div>
        <div className="story-card-content">
          <p className="story-card-meta">{story.meta}</p>
          <h3>{story.title}</h3>
          <p className="story-card-description">{story.description}</p>
          <Link to="/" className="story-read-more">Read story <span>↗</span></Link>
        </div>
      </motion.article>
    </div>
  );
}

function Trends() {
  return (
    <main className="trendMainContainer">
      <section id="trends" className="trend-session story-editorial-section">
        <div className="story-editorial-heading">
          <p className="story-eyebrow">PHONEHUB / NEWS</p>
          <h1>The latest<br />in tech.</h1>
          <p className="story-intro">The stories shaping Apple, Samsung and the world of mobile technology.</p>
        </div>
        <div className="story-stack">
          {stories.map((story, index) => <StoryCard key={story.title} story={story} index={index} total={stories.length} />)}
        </div>
        <motion.div className="story-end" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span>That's the latest.</span>
          <Link to="/">View all news <span>→</span></Link>
        </motion.div>
      </section>
    </main>
  );
}

export default Trends;
