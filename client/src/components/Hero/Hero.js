import React from "react";
import "./Hero.css";

const Hero = (props) => {
    return (
        <div className="hero">
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
};

export default Hero;
