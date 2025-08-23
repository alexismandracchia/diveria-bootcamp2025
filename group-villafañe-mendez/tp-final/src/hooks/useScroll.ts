import { useState, useEffect } from "react";

//Hook que devuelve `true` si el usuario ha hecho scroll
//más allá de un umbral específico.

export const useScroll = (scrollThreshold: number = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]); 

  return isScrolled;
};