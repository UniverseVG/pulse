import logo from "../../assets/pulse.png";
const TopBar = () => {
  return (
    <div className=" pl-5 pt-5 flex justify-between bg-white">
      <div className="  ">
        <img src={logo} alt="" />
      </div>
      <div className="text-xs pt-5 flex text-right pr-8 text-black">
        <a href="/privacy policy" className="  hover:underline">
          Our privacy policy
        </a>
        <a href="/contact us" className=" pl-6  hover:underline">
          Contact Us
        </a>
      </div>
    </div>
  );
};
export default TopBar;
