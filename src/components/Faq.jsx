import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiPlus } from "react-icons/fi"
import "./Faq.css"

const faqs = [
 {question:"Do your phones come with a warranty?",answer:"Yes. Eligible devices come with an official manufacturer warranty. Warranty coverage depends on the specific device and is shown where applicable."},
 {question:"Can I return a phone after purchase?",answer:"Returns are accepted within our return window, provided the phone meets the applicable return conditions."},
 {question:"Do you offer nationwide delivery?",answer:"Yes. We deliver across Nigeria with secure packaging and order tracking."},
 {question:"Are all phones brand new?",answer:"Yes. Phones listed as brand new are sealed and sourced from trusted suppliers. Product condition is stated on the product listing."},
 {question:"Which payment methods do you accept?",answer:"We accept bank transfers, debit cards, and other supported payment options available at checkout."}
]

export default function Faq(){
 const [activeFaq,setActiveFaq]=useState(null)
 return <section id="faq" className="faq">
  <div className="faq-intro">
   <div><span className="faq-eyebrow">NEED TO KNOW</span><h2>Questions,<br/><em>answered.</em></h2></div>
   <p>Everything you need to know before ordering your next phone from Phone Hub.</p>
  </div>
  <div className="faq-list">
   {faqs.map((faq,index)=>{
    const isOpen=activeFaq===index
    return <div className={"faq-row "+(isOpen?"is-open":"")} key={faq.question}>
     <button type="button" className="faq-question" onClick={()=>setActiveFaq(isOpen?null:index)} aria-expanded={isOpen}>
      <span className="faq-number">{String(index+1).padStart(2,"0")}</span><span className="faq-question-text">{faq.question}</span><span className="faq-toggle"><FiPlus/></span>
     </button>
     <AnimatePresence initial={false}>{isOpen&&<motion.div className="faq-answer-wrap" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.32,ease:[.22,1,.36,1]}}><div className="faq-answer">{faq.answer}</div></motion.div>}</AnimatePresence>
    </div>
   })}
  </div>
 </section>
}