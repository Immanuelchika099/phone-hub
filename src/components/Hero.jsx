import heroTechImg from "../assets/phones/heroImg.png";
import "../components/Hero.css"

function Hero(){
    return(
        <>
        <main className="hero-container">
            <div className="heroFlex">
                <ul >
                    <p className="summerTx">"Summer Sale - Up to 50% off Smartphones"</p>
                    <h1 className="heroH1"> Shop the Latest <br />Phones & Accesories </h1>
                    <p className="heroText">
                        Discover premuim smartphones from top brands at unbeatable prices.
                        Find perfect device for work, gaming, and everyday life.
                    </p>
                    <button className="shopNow btn">Shop Now</button>
                </ul>
                <ul>
                <img className="heroTechImg" src= { heroTechImg }  alt="Tech Products" />
                    <div className="blob blob1"></div>
                    <div className="blob blob2"></div>
                    <div className="blob blob3"></div>
                </ul>
            </div>
        </main>
        <p className="hero-footerTx">CALL TO ORDER <a className="callNo" href="tel:+2349161229138"> 234 916 122 9138 </a> </p>
        </>
    )
}

export default Hero;