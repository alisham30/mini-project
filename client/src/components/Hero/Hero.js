import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const imageRef = useRef();

  const handleShopNow = () => {
    navigate('/products');
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(heroRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.5 }
    )
    .fromTo(imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5 },
      "-=0.5"
    )
    .fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=1"
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );
  }, []);

  return (
    <div className="hero-section" ref={heroRef}>
      <div className="hero-content">
        <h1 ref={titleRef}>Welcome to <span className="highlight">ShopEasy</span></h1>
        <p ref={subtitleRef}>Discover a World of Quality Products at Your Fingertips</p>
        <div className="cta-buttons" ref={ctaRef}>
          <button className="cta-primary" onClick={handleShopNow}>SHOP NOW</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;