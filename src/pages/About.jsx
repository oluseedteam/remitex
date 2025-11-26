import React from 'react'
import Layout from '../components/layout'
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
            <section className="flex flex-col md:items-center justify-center px-6 lg:px-32 pt-10">
                <h1 className=" text-primary1 m-0 p-0 text-[22px] md:text-[42px] font-bold ">About Remitex</h1>
                <p className="text-md md:text-center lg:w-[1100px] xl:w-[1400px]" style={{ lineHeight: "2rem" }}>Similar to many significant innovations, Remitex originated from the recognition of an inconvenience. Initially, the aspiration was to simplify the process by which students (especially international ones) pay tuition fees to Canadian institutions; however, it later evolved to assist diasporans in transferring or receiving funds between Africa, Europe and North America. This shift occurred because the founders realized a broader need existed in the financial transaction landscape. Although the focus changed, the underlying goal remained the same: to enhance convenience in money transfers.</p>
            </section>

            <section className="hidden mt-12 md:mt-18 px-6 lg:px-32">
                <div className="md:flex items-center justify-between  ">
                    <p className="text-primary1 font-bold text-[20px] md:text-[40px]">What drives Remitex?</p>

                    <p className="md:w-[35%] text-sm" style={{ lineHeight: "1.6rem" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet .</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {abouts.map((about, index) => (
                        <div className="flex gap-4 bg-primary2 px-4 py-8 rounded-3xl w-fit mx-auto">
                        <img src={set} alt="" className="bg-primary1 w-6 h-6 md:w-8 md:h-8 lg:h-10 lg:w-10 p-2 rounded-lg" />
                        <div>
                            <div>
                                <p className="text-18px text-white font-bold uppercase m-0 p-0">{about.title}</p>
                            </div>
                            <p className="text-white text-[16px]" style={{ lineHeight: "1.5rem" }}>{about.info}</p>
                        </div>
                    </div>
                    ))}
                    

                </div>
            </section>



            <section>
                <div className="pt-10 lg:pt-20 lg:pb-14 px-6 lg:px-0 lg:pl-32 ">
                    <div className="flex flex-col md:flex-row items-center justify-between">

                        <div className="w-auto">


                            {mission.map((ourmission, index)=> (
                            <div >
                                <p className="text-18px text-dark font-bold uppercase m-0 p-0">Our History</p>

                                <p className="text-base text-justify max-w-[500px] text-dark mt-2 p-0 font-normal" style={{ lineHeight: "2rem" }}>
                                    {ourmission.story1}</p>
                                <p className="text-base max-w-[500px] text-dark mt-2 p-0 font-normal" style={{ lineHeight: "2rem" }}>
                                    {ourmission.story2}
                                </p>
                            </div>
                             ))}

                            {mission.map((ourmission, index)=> (
                                <div className="mt-8">
                                <p className="text-18px text-dark font-bold uppercase m-0 p-0">Our mission</p>

                                <p className="text-base text-justify max-w-[500px] text-dark mt-2 p-0 font-normal" style={{ lineHeight: "2rem" }}>
                                    {ourmission.mission1}</p>
                                <p className="text-base max-w-[500px] text-dark font-normal mt-2 p-0" style={{ lineHeight: "2rem" }}>
                                    {ourmission.mission2}
                                </p>
                            </div>
                             ))}        
                           
                            <div>

                            </div>
                        </div>


                        <div className="md:ml-auto">
                            <img
                                src={planet}
                                alt="Phones showcasing tech features"
                                className="bg-primary2 py-4 w-[350px] lg:w-[550px] xl:w-[600px]h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>



            <section class="hidden bg-white py-10 px-6 lg:px-32">
                <div class="mx-auto lg:flex  justify-between gap-32">
                    <div className="lg:w-[50%]">
                        <h2 class="text-blue-600 text-3xl font-bold">Timeline</h2>
                        <p class="text-gray-600 mt-4" style={{ lineHeight: "2rem" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                        </p>
                    </div>


                    <div class="md:col-span-2 space-y-10">

                        {timeline.map((time, index) => (
                            <div class="flex items-start space-x-4">



                            <div class="">
                                <div className="flex gap-8">
                                    <div class="w-4 h-4 bg-black rounded-full shrink-0 mt-1"></div>
                                    <div>
                                        <h3 class="text-lg font-bold p-0 m-0">{time.year}</h3>
                                        <p class="text-sm font-semibold text-gray-600">{time.title}</p>
                                        <p class="text-gray-500 mt-2 text-sm" style={{ lineHeight: "1.6rem" }}>
                                            {time.info}
                                        </p>
                                    </div>
                                </div>

                                <hr class="mt-4 border-gray-300" />
                            </div>
                        </div>
                        ))}
                        
                       





                    </div>
                </div>
            </section>


            <section className="hidden bg-white py-10 px-6 lg:px-32">
                <div className="md:flex items-center justify-between  ">
                    <p className="text-primary1 font-bold text-[20px] md:text-[40px]">Our Team</p>

                    <p className="md:w-[35%] text-sm" style={{ lineHeight: "1.6rem" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient lorem purus justo, ultricies.</p>
                </div>

                <div className="bg-white lg:px-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                name: "John Carter",
                                role: "CEO & Co-Founder",
                                image: team1
                            },
                            {
                                name: "Sophie Moore",
                                role: "Community Lead",
                                image: team2
                            },
                            {
                                name: "Alex Turner",
                                role: "Operations",
                                image: team3
                            },
                        ].map((person, index) => (
                            <div
                                key={index}
                                className="bg-primary2 text-white rounded-4xl overflow-hidden shadow-md "
                            >
                                <div className="flex items-center justify-center p-2 lg:p-4 mb-4 md:mb-0 ">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className=""
                                    />
                                </div>
                                <div className="pl-6 ">
                                    <h3 className="text-lg font-bold p-0 m-0">{person.name}</h3>
                                    <p className="text-sm mt-2">{person.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>


            <section className="hidden flex-col items-center justify-center px-6 lg:px-32 mt-10">
                <h1 className=" text-primary1 m-0 p-0 text-[22px] md:text-[40px] text-center font-bold ">Investors</h1>
                <p className="text-md text-center md:w-[300px] lg:w-[500px]" style={{ lineHeight: "2rem" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient lorem purus justo, ultricies.</p>

                <marquee behavior="" direction="">
                    <div className="flex items-center justify-center mt-8 mb-20">
                        <img src={logos} alt="" className="" />
                    </div>
                </marquee>
            </section>


        </Layout>
    )
}

export default About
