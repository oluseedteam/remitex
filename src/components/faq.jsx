import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { faqData } from "../data";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    

    return (
        <section className="hidden p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>
            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <div key={index} className="border-b pb-3">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="flex justify-between items-center w-full bg-white text-left text-lg font-semibold py-2 border-b border-gray-300 border-t-0! border-l-0! border-r-0!"
                        >
                            {faq.question}
                            {openIndex === index ? <FaMinus /> : <FaPlus />}
                        </button>



                        {openIndex === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
