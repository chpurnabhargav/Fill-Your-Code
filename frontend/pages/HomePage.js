"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedWords } from "./AnimatedWords"; // Import the new component

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      // Get the second section element
      const secondSection = document.querySelector('#second-section'); // Replace with your actual section ID
      
      if (secondSection) {
        // Get section position details
        const sectionTop = secondSection.offsetTop;
        const sectionHeight = secondSection.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Calculate the 70% threshold point of the second section
        const threshold = sectionTop + (sectionHeight * 0.7);
        
        // Show the button only after passing the 70% threshold
        // Hide it when scrolling back up past the threshold
        if (scrollPosition > threshold) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
      {/* Animated Background Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="container"></div>
        </div>
        
        <h1 className="text-7xl font-extrabold font-sans relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Welcome to Fill Your Code
        </h1>
        <p className="mt-4 text-xl font-medium text-gray-300 relative z-10 tracking-wide">
          Learn, Understand & Grow  
        </p>
        <div className="mt-10 animate-bounce relative z-10">
          <span className="text-lg">Scroll Down ⬇️</span>
        </div>
      </div>
      
      {/* Transition Section - Added new code here */}
<div className="relative w-full h-0 overflow-visible z-10">
  {/* Diagonal gradient overlay connecting the sections */}
  <div 
    className="absolute w-full" 
    style={{
      height: '100px',
      bottom: '-50px',
      background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)',
      zIndex: 5
    }}
  ></div>
  
  {/* Floating particles that bridge the gap between sections */}
  <div className="absolute w-full" style={{ height: '150px', bottom: '-150px', zIndex: 10 }}>
    {[...Array(20)].map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full animate-pulse"
        style={{
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 150}px`,
          opacity: 0.6,
          boxShadow: '0 0 5px 2px rgba(255,255,255,0.1)',
          filter: 'blur(1px)',
          animation: `pulse 3s ease-in-out infinite alternate`
        }}
      ></div>
    ))}
  </div>
        {/* Bottom part with dot pattern fade-in */}
        <div className="absolute bottom-0 left-0 w-full h-2/3"
             style={{
               background: 'radial-gradient(circle, rgba(0,0,0,0) 1.5px, #000 0 5px, rgba(0,0,0,0) 5px)',
               backgroundSize: '12px 20.7846097px',
               opacity: 0.5,
               clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)'
             }}>
        </div>
      </div>
      
      {/* Other Content Section */}
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 overflow-hidden relative" id="second-section">
        {/* From Uiverse.io by SelfMadeSystem */}
        <div className="animated-background"></div>
       
        {/* Animated Words component - only shown when scrolled down */}
        {showButton && <AnimatedWords />}
        
        <div
          className={`transition-transform duration-1000 ${
            showButton ? 'translate-x-0' : 'translate-x-full'
          } w-full h-full flex items-center justify-center relative z-10`}
        >
          {showButton && (
            <button
            onClick={() => router.push("/FYC")}
            className="group relative flex items-center justify-between px-6 py-4 rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white font-bold text-lg transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/30 hover:brightness-125 overflow-hidden"
          >
            <span className="relative z-10 tracking-wide">Fill Your Code</span>
            <div className="relative z-10 flex items-center justify-center w-10 h-10 ml-4 rounded-full bg-white transform transition-all duration-500 group-hover:rotate-90">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute -left-4 -top-4 w-16 h-16 rounded-full bg-white opacity-10 transform transition-transform duration-700 group-hover:scale-150"></div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white opacity-10 transform transition-transform duration-700 group-hover:scale-150"></div>
            </div>
            
            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 -left-[100%] w-[80%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform transition-transform duration-1000 group-hover:left-[100%]"></div>
            </div>
          </button>
          )}
        </div>
      </div>
      
      <style jsx>{`/* From Uiverse.io by SelfMadeSystem */
  .animated-background {
    position: absolute;
    inset: -1em;
    --c: 7px;
    background-color: #000;
    background-image: radial-gradient(
        circle at 50% 50%,
        #0000 1.5px,
        #000 0 var(--c),
        #0000 var(--c)
      ),
      radial-gradient(
        circle at 50% 50%,
        #0000 1.5px,
        #000 0 var(--c),
        #0000 var(--c)
      ),
      radial-gradient(circle at 50% 50%, #f00, #f000 60%),
      radial-gradient(circle at 50% 50%, #ff0, #ff00 60%),
      radial-gradient(circle at 50% 50%, #0f0, #0f00 60%),
      radial-gradient(ellipse at 50% 50%, #00f, #00f0 60%);
    background-size:
      12px 20.7846097px,
      12px 20.7846097px,
      200% 200%,
      200% 200%,
      200% 200%,
      200% 20.7846097px;
    --p: 0px 0px, 6px 10.39230485px;
    background-position:
      var(--p),
      0% 0%,
      0% 0%,
      0% 0px;
    animation:
      wee 40s linear infinite,
      filt 6s linear infinite;
  }
 
  @keyframes filt {
    0% {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(360deg);
    }
  }
 
  @keyframes wee {
    0% {
      background-position:
        var(--p),
        800% 400%,
        1000% -400%,
        -1200% -600%,
        400% 41.5692194px;
    }
    to {
      background-position:
        var(--p),
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%;
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    100% {
      transform: translateY(-20px) translateX(10px);
    }
  }
`}</style>
    </>
  );
}