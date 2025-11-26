import PropTypes from "prop-types";

import Navbar from "./navbar";
import Footer from "./footer"



const Layout = ({ children, _style, _space = "mt-20 md:mt-28" }) => {
  return (
    <>
      <Navbar />
      <main className={` ${_space} ${_style} `}>{children}</main>

      <Footer/>
    
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  _style: PropTypes.string,
  _space: PropTypes.string,
};

export default Layout;
