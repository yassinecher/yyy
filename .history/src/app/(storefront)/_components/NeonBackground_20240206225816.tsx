"use client"
import { useEffect } from 'react';

const HexagonBackground: React.FC = () => {
  useEffect(() => {
    const parent = document.querySelector('.hexa-list') as HTMLElement;
    const height = parent?.offsetHeight || 0;
    const width = parent?.offsetWidth || 0;
    const hex = 36;

    const fill = (): string => {
      const fillV = Math.ceil(height / hex) * 1.3;
      const fillH = Math.ceil(width / hex) * 2;
  
      let els = '';
      for (let x = 0; x < fillH; x++) {
        for (let y = 0; y < fillV / 2; y++) {
          let posY = y * (hex - 4) * 2;
          let posX = (x * hex / 2 + x) - hex;
          if (x % 2 === 0) {
            posY = posY - (hex - 4);
          }
          els += `<div class="hexa" style="top:${posY}px;left:${posX}px;"></div>`;
        }
      }
      return els;
    };

    const els = fill();
    const hexas = document.createElement('div');
    hexas.innerHTML = els;
    parent?.appendChild(hexas);
  }, []);

  return (
    <>
      <style jsx>{`



      `}</style>
      <div className="hx-wrap">
        <div className="hx-image"></div>
        <div className="hexa-list"></div>
      </div>
     
    </>
  );
};

export default HexagonBackground;
