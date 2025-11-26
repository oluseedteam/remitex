import Layout from "../components/layout"
import { GrMail } from "react-icons/gr";
import FAQ from "../components/faq";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";



const Contact = () => {

    const contactDetails = [
        { text: "contact@remitex.co", icon: <GrMail />, href: "mailto:contact@remitex.co" },
        { text: "2667 Kipling Ave Etobicoke, ON M9V 4N9", icon: <FaMapMarkerAlt />, href: "#" },
      ];
    return (
        <Layout>
            <section className="mx-auto py-12 px-6 lg:px-32">
                <h2 className="text-3xl font-dm font-bold mb-6">Get in touch</h2>

                <div className="flex flex-col lg:flex-row justify-between">
                    
                    <form className="flex flex-col gap-6 w-full lg:w-1/2">
                        <div className="grid grid-cols-2 gap-4 lg:gap-12">
                            <input type="text" placeholder="Full Name" className="border p-3 rounded-md lg:w-full" />
                            <input type="email" placeholder="email@example.com" className="border p-3 rounded-md lg:w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 lg:gap-12">
                            <input type="text" placeholder="Company Name" className="border p-3 rounded-md lg:w-full" />
                            <input type="text" placeholder="How can we help?" className="border p-3 rounded-md lg:w-full" />
                        </div>
                        <textarea placeholder="Your Message" className="border p-3 rounded-md lg:w-full col-span-2"></textarea>
                        <button className="bg-blue-600 text-white px-6 py-3 w-fit border-none rounded-md">SEND MESSAGE</button>
                    </form>



                    
                    <div className="mt-8 md:mt-0 space-y-4 w-full lg:w-1/3">
                        <h3 className="font-semibold">Want to reach us directly?</h3>
                        {/* <p className="text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id dui pharetra elementum sit id sagittis non donec egestas.
                        </p> */}
                        <div className="space-y-2">
                        {contactDetails.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="text-white flex items-center justify-center bg-primary1 p-2 rounded-full">{item.icon}</span>
                            <a href={item.href} className="text-gray-700 no-underline my-2">
                            {item.text}
                            </a>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </section>


            <FAQ/>

        </Layout>
    )
}

export default Contact