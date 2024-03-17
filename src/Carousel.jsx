import { useState, useEffect, useRef } from "react";
import './Carousel.css'; // Assuming you have your CSS file imported here

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slideRef = useRef(null);
  const intervalRef = useRef(null);

  const images = [
    "https://t4.ftcdn.net/jpg/03/13/65/17/240_F_313651795_OUrd7HrFYuxo9LXuuREFvRyIPeEfVSLj.jpg",
    "https://t3.ftcdn.net/jpg/03/67/56/64/240_F_367566423_XT7p8nSweLhTPMBZkqaDmQXhXujeS4Gq.jpg",
    "https://t4.ftcdn.net/jpg/04/27/25/47/240_F_427254702_cgEOdF7Ukd52MW8a4rs3388sZApeVVAy.jpg",
    "https://t4.ftcdn.net/jpg/04/78/75/27/240_F_478752729_bvtlb01LHcdjCOWvuS35GUbcnlP8ynpp.jpg",
    "https://t4.ftcdn.net/jpg/04/17/42/57/240_F_417425751_z8Rg86FJnDc8vUSC5Frj3CgD4owjLQTB.jpg",
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(goToNextSlide, 3000); // Auto play every 3 seconds
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentIndex]);

  const goToPrevSlide = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
    setTranslateValue(translateValue + slideWidth());
  };

  const goToNextSlide = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
      setTranslateValue(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTranslateValue(translateValue - slideWidth());
    }
  };

  const handleHover = () => {
    setIsPlaying(!isPlaying);
  };

  const slideWidth = () => {
    return slideRef.current.clientWidth;
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      goToPrevSlide();
    } else if (event.key === "ArrowRight") {
      goToNextSlide();
    }
  };

  return (
    <div
      className="carousel"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div
        className="carousel-wrapper"
        style={{
          transform: `translateX(${translateValue}px)`,
          transition: "transform ease-out 0.45s",
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide" ref={slideRef}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={goToPrevSlide}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={goToNextSlide}>
        &#10095;
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={
              index === currentIndex ? "indicator active" : "indicator"
            }
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      {/* E-Flyer */}
      <div className="eflyer">
        <h2>Eflyer</h2>
      
      </div>
    </div>
  );
};

export default Carousel;
