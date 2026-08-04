import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../pages/Home.css"
import { HiPlus } from "react-icons/hi2"
import { div } from "framer-motion/client"

function Faq (){

    const [activeFaq, setActiveFaq] =  useState(null)

    return(
        <>
            <section id="faq" className="faq">
                <h2 className="phoneHeading faqHead">FAQ's</h2>

                <div className="faqContainer">
                    
                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq( activeFaq === 1 ? null: 1 ) )}>
                            <p> Do your phone come with a warranty?</p>
                            <span className= {activeFaq === 1 ? "faqPlusIcon rotate" : "faqPlusIcon"} > < HiPlus /> </span>
                        </div>
                    
                       { activeFaq === 1 && 
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                        >
                                <p className="faqAnswer">Yes. All eligible devices include an official manufacturer warranty</p> 
                        </motion.div>
                       }
                    </div>
                    

                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 2 ? null: 2) )}>
                            <p>Can i return a phone after purchase?</p>
                            <span className= {activeFaq === 2 ? "faqPlusIcon rotate" : "faqPlusIcon"} > < HiPlus /> </span>

                        </div>

                            { activeFaq === 2 &&
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5 }}
                                >
                                        <p className="faqAnswer">Returns are accepted within our return window as long as the phone meets the return conditions</p> 
                                </motion.div>
                          }
                    </div>
                    
                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 3 ? null: 3) )}>
                            <p>Do you offer nationwide delivery?</p>
                            <span className= {activeFaq === 3 ? "faqPlusIcon rotate" : "faqPlusIcon"} >< HiPlus /> </span>

                        </div>
                            { activeFaq  === 3 &&                                
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5 }}
                                >
                                        <p className="faqAnswer">Yes. We deliver across Nigeria with secure packaging and tracking</p> 
                                </motion.div>
                            }
                    </div>

                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 4 ? null: 4) )}>

                            <p>
                                Are all phones brand new?
                            </p>
                            <span className= {activeFaq === 4 ? "faqPlusIcon rotate" : "faqPlusIcon"} > < HiPlus /> </span>
                        </div>
                             { activeFaq === 4 &&
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p className="faqAnswer">Yes. Every Phone listed is brand new, sealed, and sourced from trusted suppliers</p> 
                                </motion.div>
                             }
                    </div>

                    <div className="faqMarginContainer">
                        <div className="faqItem" onClick={(() => setActiveFaq(activeFaq === 5 ? null: 5) )}>
                            <p>
                                Which payment method do you accept?
                            </p>
                            <span className= {activeFaq === 5 ? "faqPlusIcon rotate" : "faqPlusIcon"} >< HiPlus /> </span>
                        </div>
                        { activeFaq === 5 && 
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="faqAnswer">We accept bank transfers, debit cards, and other supported payment options during checkout</p>
                            </motion.div>
                        }
                    </div>

                </div>
            </section>
        </>
    )
}

export default Faq