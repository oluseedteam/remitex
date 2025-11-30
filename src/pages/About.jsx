import React from "react";
import Layout from "../components/layout";
import logos from "../assets/logos.png";
import set from "../assets/set.png";
import planet from "../assets/planet.png";
import team1 from "../assets/team1.png";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";
import { abouts, mission, timeline } from "../data";

const About = () => {
  return (
    <Layout>
      {/* Hero About Section with Blue Background */}
      <section className="bg-[#0328EE] text-white py-20 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <h1 style={{fontFamily: 'Dm Sans'}} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 animate-fade-in">
            About Remitex
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-center max-w-5xl mx-auto leading-relaxed opacity-95">
            Transforming cross-border payments for students and diasporans across Africa, Europe, and North America
          </p>
        </div>
      </section>

      {/* About Us & History Side by Side */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-32 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* About Us */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#0328EE] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 style={{fontFamily: 'Dm Sans' }} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0328EE]">
                  About Us
                </h2>
              </div>
              <div style={{fontFamily: 'Dm Sans'}}  className=" space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base lg:text-lg">
                  Similar to many significant innovations, Remitex originated from the recognition of an inconvenience. Initially, the aspiration was to simplify the process by which students (especially international ones) pay tuition fees to Canadian institutions.
                </p>
                <p className="text-base lg:text-lg">
                  However, it later evolved to assist diasporans in transferring or receiving funds between Africa, Europe and North America. This shift occurred because the founders realized a broader need existed in the financial transaction landscape.
                </p>
                <p className="text-base lg:text-lg font-semibold text-[#0328EE]">
                  Although the focus changed, the underlying goal remained the same: to enhance convenience in money transfers.
                </p>
              </div>
            </div>

            {/* Our History */}
            <div className="bg-[#0328EE] text-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0328EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 style={{fontFamily: 'Dm Sans' }}  className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Our History
                </h2>
              </div>
              {mission.map((ourmission, index) => (
                <div key={`history-${index}`} style={{fontFamily: 'Dm Sans'}} className="space-y-4 leading-relaxed">
                  <p className="text-base lg:text-lg opacity-95">
                    {ourmission.story1}
                  </p>
                  <p className="text-base lg:text-lg opacity-95">
                    {ourmission.story2}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Mission Text */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#0328EE] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 style={{fontFamily: 'Dm Sans' }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0328EE]">
                  Our Mission
                </h2>
              </div>
              {mission.map((ourmission, index) => (
                <div key={`mission-${index}`} className="space-y-6">
                  <p className="text-base lg:text-lg text-gray-700 leading-loose">
                    {ourmission.mission1}
                  </p>
                  <p className="text-base lg:text-lg text-gray-700 leading-loose">
                    {ourmission.mission2}
                  </p>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="bg-linear-to-br from-[#0328EE] to-blue-600 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src={planet}
                  alt="Global reach illustration"
                  className="w-full h-auto object-contain p-8 lg:p-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What drives Remitex Section */}
      <section className="hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-32 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0328EE] mb-4">
              What Drives Remitex?
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values and principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {abouts.map((about, index) => (
              <div
                key={index}
                className="flex gap-6 bg-[#0328EE] text-white px-8 py-10 rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="shrink-0">
                  <div className="bg-white rounded-xl p-3 w-14 h-14 flex items-center justify-center">
                    <img src={set} alt="" className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold uppercase mb-3">
                    {about.title}
                  </h3>
                  <p className="text-base leading-relaxed opacity-95">
                    {about.info}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="hidden bg-[#0328EE] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Our Timeline
              </h2>
              <p className="text-base lg:text-lg leading-loose opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                varius enim in eros elementum tristique. Duis cursus, mi quis
                viverra ornare, eros dolor interdum nulla, ut commodo diam libero
                vitae erat.
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((time, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-white/30 pb-8 last:pb-0">
                  <div className="absolute -left-2.5 top-1 w-5 h-5 bg-white rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1">{time.year}</h3>
                  <p className="text-base font-semibold mb-3 opacity-90">
                    {time.title}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed opacity-80">
                    {time.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="hidden bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0328EE] mb-4">
              Meet Our Team
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              The talented individuals driving innovation at Remitex
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Carter", role: "CEO & Co-Founder", image: team1 },
              { name: "Sophie Moore", role: "Community Lead", image: team2 },
              { name: "Alex Turner", role: "Operations", image: team3 },
            ].map((person, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-[#0328EE]"
              >
                <div className="aspect-square overflow-hidden bg-linear-to-br from-[#0328EE]/10 to-blue-600/10">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 bg-[#0328EE] text-white">
                  <h3 className="text-xl font-bold mb-2">{person.name}</h3>
                  <p className="text-base opacity-90">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="hidden bg-linear-to-br from-[#0328EE] to-blue-600 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Investors
            </h2>
            <p className="text-base lg:text-lg max-w-2xl mx-auto leading-loose opacity-90">
              Backed by leading investors who believe in our vision
            </p>
          </div>

          <div className="w-full overflow-hidden bg-white/10 backdrop-blur-sm rounded-3xl py-8">
            <div className="flex items-center justify-center">
              <img src={logos} alt="Investor logos" className="max-w-full h-auto opacity-90" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;