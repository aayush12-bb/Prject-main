import React, { useState, useEffect, useRef } from "react";
import shoe01 from "../../assets/images/Banner/banner01.jpg";
import shoe02 from "../../assets/images/Banner/banner02.jpg";
import shoe03 from "../../assets/images/Banner/banner03.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: shoe01,
    title: "Newbalance Running Sneakers",
    description:
      "Shoes that transform your body language and attitude. Experience unmatched comfort and modern design.",
  },
  {
    id: 2,
    image: shoe02,
    title: "Classic Casuals",
    description: "Everyday comfort, premium materials, and timeless style.",
  },
  {
    id: 3,
    image: shoe03,
    title: "Street Ready",
    description: "Bold design and all-day performance for urban life.",
  },
];

function Section01() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="container mx-auto relative overflow-hidden mt-14 pt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 relative" style={{ minHeight: '55vh' }}>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />


          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <button
        aria-label="Previous slide"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-lg z-20 hover:bg-accent"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>

      <button
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-lg z-20 hover:bg-accent"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-6 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-primary" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Section01;
