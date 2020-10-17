import {useState, useEffect, useRef} from 'react';

function getWindowDimensions(refResizeCount) {
  return refResizeCount.current+=1;
}


export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(0);

  useEffect(() => {

    const handleResize = ()=>setWindowDimensions(windowDimensions+1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}