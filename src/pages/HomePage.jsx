import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import phones from "../assets/rem1.svg";
import lady2 from "../assets/ladytwo.png";
import logos from "../assets/logos.png";
import send from "../assets/send.svg";
import chart from "../assets/chart.svg";
import lady from "../assets/lady.png";
import lowest from "../assets/lowest.png";
import banking from "../assets/banking.svg";
import account from "../assets/account.svg";
import downloads from "../assets/download.svg";
import AppleComputers from "../assets/AppleComputers.png";
import people from "../assets/people.png";
import video from "../assets/video.svg";
import guy from "../assets/mann.avif";
import { Button } from "../components/button";
import { download, news, testimonials } from "../data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Section Layout Component
export const SectionLayout = ({ _style, _space = "", children }) => {
  return <section className={`bg-[#0328EE] ${_space} ${_style}`}>{children}</section>;
};

SectionLayout.propTypes = {
  _style: PropTypes.string,
  children: PropTypes.node.isRequired,
  _space: PropTypes.string,
};

const Homepage = () => {
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Inject small CSS to hide scrollbars for the testimonial container.
  useEffect(() => {
    const styleId = "hide-scrollbar-styles-remitex";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        /* Hide scrollbar for webkit browsers */
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        /* Hide for IE, Edge */
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Auto-scroll logic (smooth, resets at end). Pauses while user is interacting.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let current = 0;
    const cardWidthApprox = 450; // tweak if you change card width/spacing

    const step = () => {
      if (!container) return;

      // If user is actively scrolling (pointer over or dragging), don't auto advance.
      if (container.matches(":hover") || document.activeElement === container) {
        return;
      }

      current += cardWidthApprox;
      // smooth scroll
      container.scrollTo({
        left: current,
        behavior: "smooth",
      });

      // reset when at end
      if (current >= container.scrollWidth - container.clientWidth - 10) {
        current = 0;
      }
    };

    // store interval id so we can clear later
    autoScrollRef.current = window.setInterval(step, 3000);

    // cleanup
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  // small helper to set focus index (and optionally bring the clicked card into view)
  const handleCardClick = (index, el) => {
    setFocusedIndex(index);
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const left = el.offsetLeft - 16; // small offset
      container.scrollTo({ left, behavior: "smooth" });
    }
  };

  return (
    <Layout _space="mt-16 " _style={{ fontFamily: "Dm Sans" }}>
      <SectionLayout className="bg-[#0328EE] w-full">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-center justify-center gap-8 px-6 md:px-10 xl:px-24 min-h-screen"
        >
          {/* Left Content */}
          <div className="mt-6 md:mt-0 text-white max-w-xl flex flex-col" style={{ fontFamily: "Dm Sans" }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-3xl lg:text-5xl font-bold leading-tight"
              style={{ lineHeight: "1.05" }}
            >
              Simplify your global payment with one platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="text-[15px] md:text-[16px] mt-6 max-w-lg font-[350]"
              style={{ lineHeight: "1.8rem" }}
            >
              Discover a smarter way to unify your global payment experience to facilitate seamless, secure, and cost-effective international transactions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
              className="mt-6"
            >
              <Button clickHandler={() => navigate("/dashboard")} title="Get Started" type="light" _style="py-4 px-6" />
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-6 lg:mt-0 flex justify-center lg:basis-1/2 w-full"
          >
            <img
              src={lady2}
              alt="Showcase of Remitex features"
              className="w-full lg:w-[90%] max-w-xl object-contain"
            />
          </motion.div>
        </motion.header>
      </SectionLayout>

      <section className="hidden">
        <p className="mt-24 text-[#0328ee] text-[18px] text-center">Remitex has been featured on</p>

        <marquee behavior="" direction="">
          <div className="flex items-center justify-center mt-8 mb-20">
            <img src={logos} alt="Logos" className="" />
          </div>
        </marquee>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-20 md:mt-24 px-6 lg:px-24 mb-10"
        style={{ fontFamily: "Dm Sans" }}
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[#0328ee] text-[22px] md:text-[42px] m-0 mt-8 text-center font-bold"
        >
          Move Money Without Borders
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-2 text-[14px] md:text-[18px] text-center py-4 max-w-3xl mx-auto"
        >
          Breakdown borders and make international money transfer easy and convenient.
        </motion.p>

        {/* Cards */}
        <div className="lg:flex gap-8 items-start justify-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="h-fit bg-[#0328ee] px-6 py-8 rounded-3xl w-full md:w-auto mx-auto max-w-md"
          >
            <motion.img src={send} alt="Send" className="bg-[#0328EE] p-2 rounded-lg mb-4 inline-block" whileHover={{ scale: 1.06 }} />
            <p className="text-[18px] text-white font-bold uppercase">Send & Receive</p>
            <p className="text-white text-md mt-2" style={{ lineHeight: "1.5rem" }}>
              Send & Receive money with ease on our platform using the web.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="h-fit bg-[#0328ee] px-6 py-8 rounded-3xl w-full md:w-auto mx-auto max-w-md"
          >
            <motion.img src={chart} alt="Chart" className="bg-[#0328EE] p-2 rounded-lg mb-4 inline-block" whileHover={{ scale: 1.06 }} />
            <p className="text-[18px] text-white font-bold uppercase">Enjoy Good Rate</p>
            <p className="text-white text-[16px] mt-2" style={{ lineHeight: "1.5rem" }}>
              We prioritize our rates for our customers, and it's the best and second to none.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="hidden">
        <div className=" pt-10 lg:pt-20 lg:pb-14 px-6 lg:px-32 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="">
              <img src={phones} alt="Phones showcasing tech features" className="w-10/12 h-auto hidden sm:flex" />
            </div>

            <div className="w-auto  ">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#0328ee] font-space font-medium max-w-sm">Earn daily rewards on your idle tokens</h1>
                <p className="lg:text-[18px] text-base max-w-[500px] text-[#353535] font-normal" style={{ lineHeight: "2rem" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene.</p>
                <div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <img src={lowest} alt="" className="bg-[#0328EE] p-2 rounded-lg" />
                      <p className=" text-[#353535]">Lowest fees in market</p>
                    </div>
                    <div className="flex gap-4">
                      <img src={lowest} alt="" className="bg-[#0328EE] p-2 rounded-lg" />
                      <p className=" text-[#353535]">Lowest fees in market</p>
                    </div>
                    <div className="flex gap-4">
                      <img src={lowest} alt="" className="bg-[#0328EE] p-2 rounded-lg" />
                      <p className=" text-[#353535]">Lowest fees in market</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="hidden">
        <div className="pt-10 lg:pt-20 lg:pb-14 px-6 lg:px-0 lg:pl-32 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="w-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#0328ee] font-space font-medium max-w-sm">
                Earn daily rewards on your idle tokens
              </h1>
              <p className="lg:text-[18px] text-base max-w-[500px] text-[#353535] font-normal" style={{ lineHeight: "2rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene.
              </p>
              <div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <img src={lowest} alt="" className="bg-[#0328EE] p-2 rounded-lg" />
                    <p className="text-[#353535]">Lowest fees in market</p>
                  </div>
                  <div className="flex gap-4">
                    <img src={lowest} alt="" className="bg-[#0328EE] p-2 rounded-lg" />
                    <p className="text-[#353535]">Lowest fees in market</p>
                  </div>
                  <div className="flex gap-4">
                    <img src={lowest} alt="" className="bg-[#0328EE] p-2 rounded-lg" />
                    <p className="text-[#353535]">Lowest fees in market</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="ml-auto">
              <img src={AppleComputers} alt="Phones showcasing tech features" className="w-[400px] lg:w-[600px] h-auto hidden md:flex" />
            </div>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-32 relative bg-[#0328EE] text-white py-12 px-6 lg:px-0 lg:pl-32"
        style={{ fontFamily: "Dm Sans" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-xl text-left space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">Explore endless possibilities with Remitex</h2>
            <p className="text-lg font-light" style={{ lineHeight: "2rem" }}>
              Send and receive money globally with ease and make international transactions in a few clicks.
            </p>
            <Button clickHandler={() => navigate("/dashboard")} title="Get Started" type="light" _style="py-4" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="hidden xl:block absolute -bottom-1 right-0">
            <img src={people} alt="People illustration" className="w-[90%]" />
          </motion.div>
        </div>
      </motion.section>

      <section className="" style={{ fontFamily: "Dm Sans" }}>
        <div className="flex items-center justify-between mt-12 md:mt-24 px-6 lg:px-32">
          <p className="text-[#0328ee] font-bold text-[18px] md:text-[40px] ">What our Customers say?</p>

          <Button clickHandler={() => navigate("/")} title="Get Started" type="blue" _style="py-4 " />
        </div>

        <section className="bg-linear-to-b from-white via-gray-100 to-gray-200 py-6">
          <div className="mx-auto overflow-hidden max-w-7xl px-4">
            {/* Testimonial list - auto scroll; scrollbar hidden via injected CSS */}
            <div
              ref={scrollRef}
              className="flex items-stretch space-x-6 overflow-x-auto scroll-smooth custom-scrollbar py-6"
              role="list"
              aria-label="Customer testimonials"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  onClick={(e) => handleCardClick(index, e.currentTarget)}
                  role="listitem"
                  className={`flex-none rounded-xl transition-transform duration-300 ease-out w-[320px] sm:w-[360px] md:w-[420px] lg:w-[450px] p-4 shadow-lg cursor-pointer transform
                    ${focusedIndex === index ? "scale-105 bg-[#0328ee] text-white" : "bg-white/95 text-gray-900 hover:scale-105"}
                  `}
                >
                  <div className="h-[200px] flex flex-col justify-between">
                    <p className="text-sm md:text-base mb-4 leading-relaxed" style={{ lineHeight: "1.5rem" }}>
                      {testimonial.text}
                    </p>

                    <div className="flex items-center space-x-4">
                      <img src={guy} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex flex-col gap-1">
                        <p className={`font-semibold m-0 ${focusedIndex === index ? "text-white" : ""}`}>{testimonial.name}</p>
                        <p className={`text-sm m-0 ${focusedIndex === index ? "text-white/90" : "text-gray-500"}`}>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* 
        The following sections / blocks were in your original file and are preserved exactly as they were (hidden/commented).
        I have not changed them per your instruction.
      */}

      {/* <section style={{fontFamily: 'Dm Sans'}}>
        <div className=" pt-14 lg:pt-28 lg:pb-14 px-6 lg:px-32 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">

            <div className="  ">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#0328ee] font-space font-medium max-w-sm">Get started today</h1>
                {/* <p className="lg:text-[18px] text-base max-w-[500px] text-[#353535] font-normal">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium perferendis esse repudiandae fuga placeat magnam fugiat id blanditiis mollitia natus, fugit voluptates nulla cumque dicta?</p> 
                <div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <img src={downloads} alt="" className="bg-[#0328EE] p-[9px] rounded-lg" />
                      <p className=" text-[#353535]">Download app</p>
                    </div>
                    <div className="flex gap-4">
                      <img src={account} alt="" className="bg-[#0328EE] p-[11px] rounded-lg" />
                      <p className=" text-[#353535]">Create a free account</p>
                    </div>
                    <div className="flex gap-4">
                      <img src={banking} alt="" className="bg-[#0328EE] p-1.5 rounded-lg" />
                      <p className=" text-[#353535]">Start transacting</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="">
              <img
                src={video}
                alt="Phones showcasing tech features"
                className="w-full md:w-full h-auto flex mt-6 md:mt-0"
              />

            </div>

          </div>
        </div>
      </section> */}

      <section className="hidden mt-12 md:mt-24 px-6 lg:px-32">
        <div className="md:flex items-center justify-between  ">
          <p className="text-[#0328ee] font-bold text-[20px] md:text-[40px]">Browse our latest news</p>

          <p className="md:w-[35%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet .</p>
        </div>

        <div className="md:flex gap-8 ">
          {news.map((mynew, index) => (
            <div className="relative bg-[#0328ee] text-white rounded-2xl mt-6 md:mt-0 " key={index}>
              <div>
                <img src={mynew.image} alt="" className="w-full rounded-t-2xl" />

                <span className="bg-[#0328EE] p-2 rounded-2xl absolute top-44 md:top-[25%] lg:top-[45%] left-[1.2rem]">products</span>

                <div className="py-4 px-6">
                  <p className="text-xl md:text-2xl font-medium leading-snug">
                    {mynew.title}
                  </p>
                  <p className="text-[16px] md:text-sm font-light leading-snug" style={{ lineHeight: "1.5rem" }}>
                    {mynew.info}
                  </p>
                </div>

                <hr className="border-white/50" />

                <div className="flex items-center space-x-4 px-6 pb-6">
                  <img src={guy} alt="" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="text-[16px] font-semibold">{mynew.name}</p>
                    <p className="text-sm font-normal">{mynew.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </Layout>
  );
};

export default Homepage;
