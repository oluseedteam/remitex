import React from "react";
import Logo from "../assets/remlogo.png";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import AppleStore from "../assets/apple.svg";
import PlayStore from "../assets/plays.svg";

const Footer = () => {

    const date = new Date().getFullYear();
  const socialLinks = [
    { href: "https://www.instagram.com/", icon: <FaInstagram /> },
    { href: "https://www.facebook.com/", icon: <ImFacebook2 /> },
    { href: "https://www.linkedin.com/", icon: <FaLinkedinIn /> },
    { href: "https://www.tiktok.com/", icon: <FaTiktok /> },
    { href: "https://www.youtube.com/", icon: <FaYoutube /> },
    { href: "https://twitter.com/", icon: <FaXTwitter /> },
  ];

  return (
    <footer className="bg-[#010d50] pt-8 px-6 lg:px-32">
      <div className="mx-auto p-4 md:py-8">
        {/* Logo and Social Icons */}
        <div className="flex  justify-between">
          <a href="/"><img src={Logo} alt="Remitlex Logo" className="h-8 w-auto" /></a>
          <div className="grid grid-cols-3 md:flex text-white gap-2 md:gap-4">
            {socialLinks.map((item, index) => (
              <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                <div className="bg-white/50 p-3 rounded-full text-white flex items-center justify-center hover:bg-white/70 transition duration-300">
                  {item.icon}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Social Icons - 3x2 Grid on Mobile */}
        {/* <div className="mt-6 flex md:hidden justify-center">
          <div className="grid grid-cols-3 gap-4">
            {socialLinks.map((item, index) => (
              <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                <div className="bg-white/50 p-3 rounded-full text-white flex items-center justify-center hover:bg-white/70 transition duration-300">
                  {item.icon}
                </div>
              </a>
            ))}
          </div>
        </div> */}

        {/* Other Footer Sections */}
        <div className="container mx-auto pt-12 flex flex-col lg:flex-row justify-between items-start space-y-10 lg:space-y-0">
          {/* Menu Section */}
          <div className="text-white">
            <h2 className="text-sm font-semibold mb-4">MENU</h2>
            <hr className="border-white w-full mb-4" />
            <div className="flex flex-wrap gap-6 text-sm font-normal">
              <div className="space-y-2">
                <a href="/home" className="text-white no-underline cursor-pointer hover:text-secondary">
                  <p>HOME</p>
                </a>
                <a href="/about" className="text-white no-underline cursor-pointer hover:text-secondary">
                  <p>ABOUT</p>
                </a>
                <a href="terms-and-conditions" className="text-white no-underline cursor-pointer hover:text-secondary">
                  <p>TERMS & CONDITION</p>
                </a>
              </div>
              <div className="space-y-2">
                <a href="" className="text-white no-underline cursor-pointer hover:text-secondary">
                  <p>TOKENS</p>
                </a>
                <a href="/blog" className="text-white no-underline cursor-pointer hover:text-secondary">
                  <p>BLOG</p>
                </a>
                <a href="/privacy-policy" className="text-white no-underline cursor-pointer hover:text-secondary">
                  <p>PRIVACY POLICY</p>
                </a>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start bg-white/10 p-6 rounded-2xl lg:w-96">
            <p className="text-md text-center md:text-start font-thin mb-4 text-white">
              DOWNLOAD OUR APPLICATION
            </p>
            <p className="text-gray-300 text-center md:text-start mb-6 text-sm leading-relaxed">
              Send and receive money globally with ease and make international transactions in a few clicks.
            </p>
            <div className="flex justify-center items-center md:justify-start md:items-start gap-2 w-fit">
              <img src={AppleStore} alt="Apple Store" className="w-28 md:w-32" />
              <img src={PlayStore} alt="Play Store" className="w-28 md:w-32" />
            </div>
          </div>
        </div>

        <hr className="my-6 border-white/30 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-center text-gray-500">© {date} Remitex.{""}All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
