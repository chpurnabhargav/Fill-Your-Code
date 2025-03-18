import { useEffect, useState } from 'react';

export function AnimatedWords() {
  const [visibleWords, setVisibleWords] = useState([]);
  
  // Words with their properties including the new words
  const words = [
    { text: "Innovate", size: "text-4xl", delay: 200, top: "10%", left: "15%" },
    { text: "Create", size: "text-5xl", delay: 400, top: "15%", left: "35%" },
    { text: "Code", size: "text-6xl", delay: 600, top: "25%", left: "20%" },
    { text: "Build", size: "text-3xl", delay: 800, top: "40%", left: "10%" },
    { text: "Design", size: "text-5xl", delay: 1000, top: "30%", left: "50%" },
    { text: "Solve", size: "text-4xl", delay: 1200, top: "55%", left: "25%" },
    { text: "Explore", size: "text-3xl", delay: 1400, top: "60%", left: "45%" },
    { text: "Develop", size: "text-5xl", delay: 1600, top: "70%", left: "15%" },
    { text: "Transform", size: "text-2xl", delay: 1800, top: "50%", left: "60%" },
    { text: "Imagine", size: "text-4xl", delay: 2000, top: "20%", left: "70%" },
    { text: "Hack", size: "text-3xl", delay: 2200, top: "65%", left: "65%" },
    { text: "Execute", size: "text-2xl", delay: 2400, top: "80%", left: "40%" },
    { text: "Power", size: "text-4xl", delay: 2600, top: "85%", left: "55%" },
    { text: "Future", size: "text-5xl", delay: 2800, top: "75%", left: "75%" },
    { text: "Invent", size: "text-6xl", delay: 3000, top: "90%", left: "80%" },
    { text: "Engineer", size: "text-5xl", delay: 3200, top: "35%", left: "80%" },
    { text: "Construct", size: "text-4xl", delay: 3400, top: "5%", left: "45%" },
    { text: "Evolve", size: "text-3xl", delay: 3600, top: "88%", left: "25%" },
    { text: "Disrupt", size: "text-5xl", delay: 3800, top: "15%", left: "5%" },
  ];
  
  useEffect(() => {
    // Gradually add each word to create staggered animation
    const timers = words.map((word, index) => {
      return setTimeout(() => {
        setVisibleWords(prev => [...prev, index]);
      }, word.delay);
    });
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ position: 'absolute' }}>
      {words.map((word, index) => (
        <div
          key={index}
          className={`absolute font-bold transition-all duration-1000 ease-out opacity-0 ${
            visibleWords.includes(index) ? 'opacity-70' : '-translate-x-full -translate-y-full'
          } ${word.size}`}
          style={{
            top: word.top,
            left: word.left,
            transform: visibleWords.includes(index) ? 'translate(0, 0)' : 'translate(-100%, -100%)',
            color: `hsl(${(index * 20) % 360}, 70%, 65%)`,
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 0
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
}


export default AnimatedWords;