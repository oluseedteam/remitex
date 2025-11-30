import PropTypes from "prop-types";

const buttonType = {
  light: "bg-white text-[#0328ee] px-7 py-4 text-[16px] font-[400]",
  blue: "bg-[#0328ee] text-white px-4 py-2 lg:px-7 lg:py-4 text-sm md:text-[16px] font-[400] no-wrap",
  dark: "bg-[#97a7fd] text-white px-5 py-2",
};

export const Button = ({ title, clickHandler, type, _style }) => {
  return (
    <button
      onClick={clickHandler}
      className={` ${buttonType[type]} cursor-pointer font-medium rounded-3xl border-none focus:outline-none ${_style}}`}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  clickHandler: PropTypes.func,
  _style: PropTypes.string,
  type: PropTypes.string,
};
