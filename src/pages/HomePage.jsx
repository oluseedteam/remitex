import React, { useState } from "react";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import phones from "../assets/rem1.svg";
import lady2 from "../assets/ladytwo.png";
import logos from "../assets/logos.png";
import send from "../assets/send.svg";
import chart from "../assets/chart.svg";
import iphone from "../assets/iPhones.svg";
import lady from "../assets/lady.png";
import lowest from "../assets/lowest.png";
import banking from "../assets/banking.svg";
import account from "../assets/account.svg";
import downloads from "../assets/download.svg";
import AppleComputers from "../assets/AppleComputers.png";
import Twophones from "../assets/2phones.svg";
import people from "../assets/people.png";
import video from "../assets/video.svg";
import guy from "../assets/mann.avif";
import { Button } from "../components/button";
import { download, news, testimonials } from "../data";
import { motion } from "framer-motion";


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

  const [focusedIndex, setFocusedIndex] = useState(0);

  return (
    <Layout _space="mt-16 " _style={{fontFamily: 'Dm Sans'}}>
      <SectionLayout className="bg-[#0328EE] w-full">
      <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 md:px-10 xl:px-24 min-h-screen"
    >
      {/* Left Content */}
      <div className="mt-4 md:mt-0 text-white max-w-xl flex flex-col" style={{fontFamily: 'Dm Sans'}}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block text-4xl lg:text-6xl font-bold"
          style={{ lineHeight: "5rem" }}
        >
          Simplify your global payment with one platform
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="block lg:hidden mt-14 text-4xl lg:text-6xl font-bold"
          style={{ lineHeight: "3rem" }}
        >
          Simplify your global payment with one platform
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-[16px] font-thin"
          style={{ lineHeight: "2rem" }}
        >
          Discover a smarter way to unify your global payment experience to facilitate seamless, secure, and cost-effective international transactions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-4"
        >
          <Button
            clickHandler={() => navigate("/")}
            title="Get Started"
            type="light"
            _style="py-4"
          />
        </motion.div>
      </div>

      {/* Right Image */}
      <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
    className="mt-10 lg:mt-0 flex justify-center lg:basis-1/2"
  >
    <img
      src={lady2}
      alt="Phones showcasing remitex features"
      className="w-full lg:w-[90%] max-w-none"
    />
  </motion.div>
    </motion.header>
      </SectionLayout>



      <section className="hidden">
        <p className="mt-24 text-[#0328ee] text-[18px] text-center">Remitex has been featured on</p>

        <marquee behavior="" direction="">
          <div className="flex items-center justify-center mt-8 mb-20">
            <img src={logos} alt="" className="" />
          </div>
        </marquee>
      </section>


      <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }} // Re-animates when scrolling
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-20 md:mt-24 px-6 lg:px-24 mb-10"
      style={{fontFamily: 'Dm Sans'}}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-[#0328ee] text-[22px] md:text-[42px] m-0 mt-8 text-center font-bold"
        style={{fontFamily: 'Dm Sans'}}
      >
        Move Money Without Borders
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-0 text-[14px] md:text-[18px] text-center py-4"
      >
        Breakdown borders and make international money transfer easy and convenient.
      </motion.p>

      {/* Content Container */}
      <div className="lg:flex gap-6">
        {/* Card 1: Send & Receive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="h-fit bg-[#0328ee] px-4 py-8 rounded-3xl w-fit mx-auto"
        >
          <motion.img
            src={send}
            alt=""
            className="bg-[#0328EE] p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
          />
          <p className="text-[18px] text-white font-bold uppercase">Send & Receive</p>
          <p className="text-white text-md" style={{ lineHeight: "1.5rem" }}>
            Send & Receive money with ease on our platform using the Android and iOS App.
          </p>
        </motion.div>

        {/* Card 2: iOS & Android App */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="bg-[#0328EE] px-4 pt-8 my-8 lg:my-0 rounded-3xl text-white mx-auto w-fit"
        >
          <p className="uppercase text-[20px]">iOS & Android App</p>
          <p className="text-[16px]" style={{ lineHeight: "1.5rem" }}>
            Explore endless possibilities with Remitex* with seamless transactions without hassle.
          </p>
          <motion.div
            className="flex flex-col items-center justify-bottom"
            whileHover={{ scale: 1.05 }}
          >
            <img src={ lady} alt="" className="w-7/12 lg:w-11/12" />
          </motion.div>
        </motion.div> */}

        {/* Card 3: Enjoy Good Rate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="grid md:flex items-end justify-end lg:grid gap-8"
        >
          <div className="h-fit bg-[#0328ee] px-4 py-8 rounded-3xl mx-auto w-fit">
            <motion.img
              src={chart}
              alt=""
              className="bg-[#0328EE] p-2 rounded-lg"
              whileHover={{ scale: 1.1 }}
            />
            <p className="text-[18px] text-white font-bold uppercase">Enjoy Good Rate</p>
            <p className="text-white text-[16px]" style={{ lineHeight: "1.5rem" }}>
              We prioritize our rates for our customers, and it's the best and second to none.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>

      <section className="hidden">
        <div className=" pt-10 lg:pt-20 lg:pb-14 px-6 lg:px-32 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">

            <div className="">
              <img
                src={phones}
                alt="Phones showcasing tech features"
                className="w-10/12 h-auto hidden sm:flex"
              />

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
              <img
                src={AppleComputers}
                alt="Phones showcasing tech features"
                className="w-[400px] lg:w-[600px] h-auto hidden md:flex"
              />
            </div>
          </div>
        </div>
      </section>




      <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }} // Triggers when 20% of section is visible
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-32 relative bg-[#0328EE] text-white py-12 px-6 lg:px-0 lg:pl-32"
      style={{fontFamily: 'Dm Sans'}}
    >
      <div className="container mx-auto">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-md text-left space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Explore endless possibilities with Remitex
          </h1>
          <p className="text-lg font-light" style={{ lineHeight: "2rem" }}>
            Send and receive money globally with ease and make international transactions in a few clicks.
          </p>
          <Button
            clickHandler={() => navigate("/")}
            title="Get Started"
            type="light"
            _style="py-4"
          />
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="hidden xl:block absolute -bottom-1 right-0"
        >
          <img
            src={people}
            alt="Phones showcasing tech features"
            className="w-[90%]"
          />
        </motion.div>
      </div>
    </motion.section>



      <section className="" style={{fontFamily: 'Dm Sans'}}>
        <div className="flex items-center justify-between mt-12 md:mt-24 px-6 lg:px-32">
          <p className="text-[#0328ee] font-bold text-[18px] md:text-[40px] ">What our users say?</p>

          <Button
            clickHandler={() => navigate("/")}
            title="Get Started"
            type="blue"
            _style="py-4 "
          />
        </div>

        <section className="bg-linear-to-b from-white via-gray-100 to-gray-200 py-4">
          <div className="mx-auto overflow-hidden">
            {/* Wrapping the cards in a flex container to ensure horizontal alignment */}
            <div className="flex space-x-4 overflow-x-auto scroll-smooth custom-scrollbar">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  onClick={() => setFocusedIndex(index)} 
                  className={`flex-none animate-scroll rounded-xl bg-[#0328ee] text-white scale-105 w-[400px] md:w-[450px] mx-4 shadow-lg cursor-pointer transition-all duration-300 
                    ${focusedIndex === index
                    ? "bg-[#0328ee] text-white scale-105"
                    : ""
                    }
                    `
                  }
                >
                  <div className="p-4 h-[200px] flex flex-col justify-between">
                    <p className="text-md mb-4" style={{ lineHeight: "1.5rem" }}>{testimonial.text}</p>
                    <div className="flex items-center space-x-4">
                      <img
                        src={guy}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold m-0">{testimonial.name}</p>
                        <p className="text-sm m-0">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </section>




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

              <hr className="border-white/50"/>

              <div className="flex items-center space-x-4 px-6">
                <img
                  src={guy}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
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




      <section className="mt-12 md:mt-24 mb-8 px-6 md:px-32" style={{fontFamily: 'Dm Sans'}}>
        <p className="text-[#0328ee] font-bold text-[20px] md:text-[40px]">Download our app</p>

        <div className="md:flex gap-24 ">
          {download.map((downloadnow, index) => (
            <div className="bg-[#0328ee]  lg:my-0 px-8 rounded-3xl text-white mx-auto w-fit">
            <p className="text-white font-bold text-[20px] pt-8 md:pt-0 md:text-[2rem]">{downloadnow.title}</p>
            <p className="text-[16px] lg:my-0 leading-relaxed">{downloadnow.info}</p>
            <div className=" flex gap-2 items-center w-fit bg-[#0328EE] mt-4 p-4 rounded-3xl">
              <img src={downloadnow.icon} alt="" />
              <span>{downloadnow.name}</span>
            </div>
            <div className="flex flex-col items-center justify-bottom">
              <img src={downloadnow.image} alt="" className="w-[50%] mt-8" />
            </div>
          </div>
          ))}


        </div>
      </section>


    </Layout>

  );
};

export default Homepage;
