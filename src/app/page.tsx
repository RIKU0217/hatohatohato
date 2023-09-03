"use client"
import React, { useState, useEffect } from 'react';

const ImageMotion: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [keyState, setKeyState] = useState<{ [key: string]: boolean }>({});

  const speed = 5; // 移動速度を調整

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeyState((prevState) => ({
        ...prevState,
        [event.key]: true,
      }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeyState((prevState) => ({
        ...prevState,
        [event.key]: false,
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // キーの状態に応じて画像を連続的に移動する関数
    const moveImage = () => {
      if (keyState['ArrowUp']) {
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - speed }));
      }
      if (keyState['ArrowDown']) {
        setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + speed }));
      }
      if (keyState['ArrowLeft']) {
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - speed }));
      }
      if (keyState['ArrowRight']) {
        setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + speed }));
      }

      requestAnimationFrame(moveImage);
    };

    // アニメーションを開始
    moveImage();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyState]);

  return (
    <div>
      <h1>キーボードの矢印キーで画像を動かす</h1>
      <img
        src="/sozai/front_hato_pa.png"
        alt="画像の説明"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
};

export default ImageMotion;
