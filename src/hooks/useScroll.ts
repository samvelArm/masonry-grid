import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { throttle } from "../utils";

export interface UseScrollProps {
  setPage: Dispatch<SetStateAction<number>>
}

export const useScroll = ({setPage}: UseScrollProps): { scrollPosition: number } => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition(window.scrollY);
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setPage]);

  return { scrollPosition };
};