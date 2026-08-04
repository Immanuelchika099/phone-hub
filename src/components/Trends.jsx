import "../pages/Home.css"
import phone1 from "../assets/news/phone1.jpg"
import phone2 from "../assets/news/phone2.jpg"
import phone3 from "../assets/news/phone3.jpg"
import phone4 from "../assets/news/phone4.jpg"
import phone5 from "../assets/news/phone5.jpg"
import phone6 from "../assets/news/phone6.jpg"
import phone7 from "../assets/news/phone7.jpg"
import { Link } from "react-router-dom";
import { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function Trends(){

const sliderRef = useRef(null);

const scrollLeft = () => {
    sliderRef.current.scrollBy({
        left: -450,
        behavior: "smooth",
    });
};

const scrollRight = () => {
    sliderRef.current.scrollBy({
        left: 450,
        behavior: "smooth",
    });
};

    return(
        <>
            <section id="trends" className="trend-session">
                    <div className="trendHeader">

                        <div>
                            <h1 className="phoneHeading trendHead">
                                Top Stories
                            </h1>

                            <p className="phoneTx trendd">
                                Everything happening across Apple's ecosystem, from iPhone and Mac to Watch, AirPods, and iOS.
                            </p>
                        </div>

                        <div className="trendButtons">
                            <button onClick={scrollLeft}>
                                <IoChevronBack className="trend-btnArrow" />
                            </button>

                            <button onClick={scrollRight}>
                                <IoChevronForward className="trend-btnArrow" />
                            </button>
                        </div>

                    </div>

                <div className="trendGrid" ref={sliderRef}>

                    <div className="trendCard">
                    <img
                        src={phone1}
                        alt="iPhone 18 Pro"
                        className="trendImage"
                    />

                        <div className="trendContent">
                            <div className="trendBetween">
                                <div className="trendTop">
                                <span className="trendBadge">NEWS</span>
                                <p className="trendSource">
                                    Mashable • 1d
                                </p>
                                </div>

                                <h3 className="trendTitle">
                                How Much Will the iPhone 18 Pro Cost? Fresh Leak Hints at a Major Price Hike
                                </h3>

                                <p className="trendDescription">
                                    The iPhone 18 Pro and iPhone 18 Pro Max could launch with higher
                                    prices as Apple reportedly introduces premium hardware upgrades
                                    and new AI-powered features.
                                </p>
                            </div>

                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>
                        </div>
                    </div>

                    <div className="trendCard">
                        <img
                            src= { phone2 }
                            alt="Foldable iPhone"
                            className="trendImage"
                        />

                        <div className="trendContent">

                            <div className="trendBetween">
                                <div className="trendTop">
                                <span className="trendBadge leak">
                                    LEAK
                                </span>

                                <p className="trendSource">
                                    MacRumors • 5h
                                </p>

                                </div>

                                <h3 className="trendTitle">
                                Apple's First Foldable iPhone Could Arrive Sooner Than Expected
                                </h3>

                                <p className="trendDescription">
                                    Fresh reports suggest Apple's foldable iPhone may feature a
                                    nearly crease-free display, a slimmer design, and a premium
                                    build aimed at competing with Samsung.
                                </p>
                            </div>

                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>

                        </div>
                    </div>

                    <div className="trendCard">
                        <img
                            src={ phone3 }
                            alt="iPhone 18 Pro"
                            className="trendImage"
                        />
                        <div className="trendContent">
                            <div className="trendBetween">
                                <div className="trendTop">
                                    <span className="trendBadge">UPDATE</span>
                                    <p className="trendSource">
                                        The Verge • 2h
                                    </p>
                                </div>

                                <h3 className="trendTitle">
                                iPhone 18 Camera Upgrade Could Be Apple's Biggest Leap
                                </h3>

                                <p className="trendDescription">
                                    Apple is reportedly testing a next-generation camera system
                                    with improved low-light performance,sharper zoom capabilities,
                                    features expected to debut on the iPhone 18 Pro.
                                </p>
                            </div>
                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>
                        </div>

                    </div>

                    <div className="trendCard">
                        <img
                            src={ phone4 }
                            alt="iPhone 18 "
                            className="trendImage"
                        />
                        <div className="trendContent">
                            <div className="trendBetween">
                                <div className="trendTop">
                                    <span className="trendBadge">AUDIO</span>
                                    <p className="trendSource">
                                        9to5Mac • 4h
                                    </p>
                                </div>

                                <h3 className="trendTitle">
                                    AirPods Pro 3 Could Deliver Apple's Best Audio Yet
                                </h3>

                                <p className="trendDescription">
                                    Leaks point to improved Active Noise Cancellation,
                                    better battery life,and enhanced spatial audio,
                                    making AirPods Pro 3 Apple's most advanced earbuds yet.
                                </p>
                            </div>
                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>
                        </div>

                    </div>
                    <div className="trendCard">
                        <img
                            src={ phone5 }
                            alt="iPhone 18 Pro"
                            className="trendImage"
                        />
                        <div className="trendContent">
                            <div className="trendBetween">
                                <div className="trendTop">
                                    <span className="trendBadge">WATCH</span>
                                    <p className="trendSource">
                                        Bloomberg • 6h
                                    </p>
                                </div>

                                <h3 className="trendTitle">
                                    Apple Watch Ultra 3 Rumored to Feature a Brighter Display
                                </h3>

                                <p className="trendDescription">
                                    Apple's next Ultra smartwatch is expected to
                                    feature a brighter MicroLED display, faster
                                    performance, and new health tracking capabilities for outdoor users.
                                </p>
                            </div>
                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>
                        </div>

                    </div>
                    <div className="trendCard">
                        <img
                            src={ phone6 }
                            alt="iPhone 18 Pro"
                            className="trendImage"
                        />
                        <div className="trendContent">
                            <div className="trendBetween">
                                <div className="trendTop">
                                    <span className="trendBadge">MAC</span>
                                    <p className="trendSource">
                                        Bloomberg • 8h
                                    </p>
                                </div>

                                <h3 className="trendTitle">
                                     M5 MacBook Pro Rumored to Launch Later This Year
                                </h3>

                                <p className="trendDescription">
                                    The upcoming MacBook Pro is expected to feature Apple's
                                    powerful M5 chip, offering improved graphics, faster AI performance,
                                    and longer battery life.
                                </p>
                            </div>
                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>
                        </div>

                    </div>

                    <div className="trendCard">
                        <img
                            src={ phone7 }
                            alt="iPhone 18 Pro"
                            className="trendImage"
                        />
                        <div className="trendContent">
                            <div className="trendBetween">
                                <div className="trendTop">
                                    <span className="trendBadge">IOS</span>
                                    <p className="trendSource">
                                        The Verge • 11h
                                    </p>
                                </div>

                                <h3 className="trendTitle">
                                    iOS 27 Brings the Biggest iPhone Redesign in Years
                                </h3>

                                <p className="trendDescription">
                                    Apple is reportedly redesigning iOS 27 with a refreshed
                                    Control Center, smarter Siri features, improved customization,
                                    and smoother system-wide animations.
                                </p>
                            </div>
                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>
                        </div>

                    </div>
                    
                </div>
        </section>
        </>
    )
}

export default Trends