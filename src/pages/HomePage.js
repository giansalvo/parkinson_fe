import React from "react";
import { Link } from "react-router-dom";
import { useTranslation} from 'react-i18next';
import i18n from "../i18n"

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

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
  it: { nativeName: 'Italiano' }
};

function HomePage() {

  console.log("HomePage")

  const { t } = useTranslation();
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
        <br/>
        <br/>
        <br/>
        <div className="slideshow" >
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {colors.map((backgroundColor, index) => (
              <div
                className="slide"
                key={index}
              ><img src={img[index]} alt="slideshow"/></div>
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
        <div className="message">
          {t('welcome_message.p1')}<Link to="/Prediction">{t('welcome_message.p2')}</Link>
          {t('welcome_message.p3')}<Link to="/SignIn">{t('welcome_message.p4')}</Link>
          {t('welcome_message.p5')}
            {/* Welcome! This website uses a Neural Network Artificial Intelligence to identify and highlight the Substantia Nigra found in Parkinson's patients.
            You can either <Link to="/Prediction">give it a try</Link> or <Link to="/SignIn">register</Link> to participate to the project and send new images. 
            In this case you will help us develop a more performant system. */}
        </div>
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <br/>
        <br/>
        <br/>
        <Footer/>
    </div>
  );
}

export default HomePage;
