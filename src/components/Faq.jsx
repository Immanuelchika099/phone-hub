import { useState } from "react"
import "../pages/Home.css"
import { HiPlus } from "react-icons/hi2"

function Faq (){

    const [activeFaq, setActiveFaq] =  useState(null)

    return(
        <>
            <section className="faq">
                <h2 className="phoneHeading faqHead">Frequently Asked Questions</h2>

                <div className="faqContainer">
                    
                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq( activeFaq === 1 ? null: 1 ) )}>
                            <p> Do your phone come with a warranty?</p>
                            <span className= {activeFaq === 1 ? "faqPlusIcon rotate" : "faqPlusIcon"} > < HiPlus /> </span>
                        </div>

                       { activeFaq === 1 && <p className="faqAnswer">Yes. All eligible devices include an official manufacturer warranty</p> }
                    </div>
                    

                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 2 ? null: 2) )}>
                            <p>Can i return a phone after purchase?</p>
                            <span className= {activeFaq === 2 ? "faqPlusIcon rotate" : "faqPlusIcon"} > < HiPlus /> </span>

                        </div>

                            { activeFaq === 2 && <p className="faqAnswer">Returns are accepted within our return window as long as the phone meets the return conditions</p>  }
                    </div>
                    
                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 3 ? null: 3) )}>
                            <p>Do you offer nationwide delivery?</p>
                            <span className= {activeFaq === 3 ? "faqPlusIcon rotate" : "faqPlusIcon"} >< HiPlus /> </span>

                        </div>
                        { activeFaq  === 3 && <p className="faqAnswer">Yes. We deliver across Nigeria with secure packaging and tracking</p>  }
                    </div>

                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 4 ? null: 4) )}>

                            <p>
                                Are all phones brand new?
                            </p>
                            <span className= {activeFaq === 4 ? "faqPlusIcon rotate" : "faqPlusIcon"} > < HiPlus /> </span>
                        </div>
                             { activeFaq === 4 && <p className="faqAnswer">Yes. Every Phone listed is brand new, sealed, and sourced from trusted suppliers</p>  }
                    </div>

                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 5 ? null: 5) )}>
                            <p>
                                Which payment method do you accept?
                            </p>
                            <span className= {activeFaq === 5 ? "faqPlusIcon rotate" : "faqPlusIcon"} >< HiPlus /> </span>
                        </div>
                        { activeFaq === 5 && <p className="faqAnswer">We accept bank transfers, debit cards, and other supported payment options during checkout</p>  }
                    </div>

                </div>
            </section>
        </>
    )
}

export default Faq