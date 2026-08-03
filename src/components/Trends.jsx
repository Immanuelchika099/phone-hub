import "../pages/Home.css"
import phone1 from "../assets/news/phone1.jpg"
import phone2 from "../assets/news/phone2.jpg"
import phone3 from "../assets/news/phone3.png"
import { Link } from "react-router-dom"

function Trends(){

    return(
        <>
            <section id="trends" className="trend-session">
                <h1 className="phoneHeading trendHead">Top Stories</h1>
                <p className="phoneTx trendd">Apple iPhone 18 Pro models reportedly face price hikes</p>

                <div className="trendGrid">

                    <ul className="trendCard">
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
                                The iPhone 18 Pro and iPhone 18 Pro Max could launch with a price
                                increase according to recent reports...
                                </p>
                            </div>

                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>
                        </div>
                    </ul>

                    <ul className="trendCard">
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
                                Fresh leaks reveal Apple's foldable iPhone may feature a
                                book-style design with a nearly crease-free display,
                                positioning it as one of the company's biggest hardware
                                launches in years.
                                </p>
                            </div>

                            <div className="trendFooter">
                            <Link to="/" className="readMore">
                                Read More →
                            </Link>
                            </div>

                        </div>
                    </ul>

                    <ul className="trendCard">
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
                                iPhone 18 Camera Upgrade Could Be Apple's Biggest Leap Yet
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

                    </ul>
                    
                </div>
        </section>
        </>
    )
}

export default Trends