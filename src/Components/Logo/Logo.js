import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain-6182.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Tilt
      className="Tilt br2 shadow-2"
      options={{ max: 25 }}
      style={{ height: 150, width: 150 }}
    >
      <div className="Tilt-inner pa3">
        <img 
        style={{ paddingTop: "5px" }} 
        src={brain} 
        alt="Brain" />
      </div>
    </Tilt>
  );
};
export default Logo;
