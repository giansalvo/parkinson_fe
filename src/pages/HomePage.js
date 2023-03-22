import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

import img1 from "../images/img_ai1.jpg"
import img2 from "../images/img_ai2.jpg"
import img3 from "../images/img_ai3.jpg"
import img4 from "../images/img_ai4.jpg"
import img5 from "../images/img_ai5.jpg"

const colors = ["#0088FE", "#00C49F", "#FFBB28", "red", "pink"];
const delay = 2500;
const img = [img1, img2, img3, img4, img5]

function HomePage() {

  console.log("HomePage")

  const {formState: { errors } } = useForm();

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

    return (
      <div>
        <Header/>
        <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((backgroundColor, index) => (
          <div
            className="slide"
            key={index}
          ><img src={img[index]}/></div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
        <div class="message">
          <h2>
            Welcome! This website uses a Neural Network Artificial Intelligence to identify and highlight the Substantia Nigra found in Parkinson's patients.
            You can either try it with the following button or register to participate to the project and send new images. 
            In this case you will help us develop a more performant syste.
          </h2>
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;
