import { useEffect, useState } from "react";
import { COLUMN_GAP, COLUMN_WIDTH } from "../constants";

export const useResize = (): { columns: number, windowWidth: number } => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [columns, setColumns] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      const newColumns = Math.floor(window.innerWidth / (COLUMN_WIDTH + COLUMN_GAP));
      setColumns(newColumns);
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { columns, windowWidth };
};