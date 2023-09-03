"use client"
import React, { useState, useEffect, useCallback } from 'react';

const ImageMotion: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });//setを使うならuseStateを使っとけ
  const [keyState, setKeyState] = useState<{ [key: string]: boolean }>({});//setを使うと画面が更新される
  const realspeed = 10;
  const reqIdRef = React.useRef<number>();
  let speed: number = realspeed; // 移動速度を調整

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
    // キーボードイベントリスナーを設定
    // window.addEventListener('keydown', (event: KeyboardEvent) => {
    // const key = event.key; // 押されたキーの文字列

    // // キーが特定の文字列と一致するかを判定
    // if  (key === 'ArrowUp') {
    //   // 'ArrowUp' キーが押された場合の処理
    //   setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - speed }));
    //   console.log('ArrowUp キーが押されました');
    // } else if (key === 'ArrowDown') {
    //   // 'ArrowDown' キーが押された場合の処理
    //   console.log('ArrowDown キーが押されました');
    // } else if (key === 'ArrowLeft') {
    //   // 'ArrowLeft' キーが押された場合の処理
    //   console.log('ArrowLeft キーが押されました');
    // } else if (key === 'ArrowRight') {
    //   // 'ArrowRight' キーが押された場合の処理
    //   console.log('ArrowRight キーが押されました');
    // }
    // // 他のキーに対する処理を追加できます
    // });


    // キーの状態に応じて画像を連続的に移動する関数
   

    // アニメーションを開始
    if(reqIdRef.current!=undefined){
      cancelAnimationFrame(reqIdRef.current) 
    }
    reqIdRef.current = requestAnimationFrame(moveImage);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyState]);

  const moveImage = useCallback(() => {

    if (keyState['ArrowUp'] || keyState['w']) {
      speed = realspeed
      setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - speed }));
    }
    if (keyState['ArrowDown']|| keyState['s']) {
      setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + speed }));
    }
    if (keyState['ArrowLeft']|| keyState['a']) {
      setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - speed }));
    }
    if (keyState['ArrowRight']|| keyState['d']) {
      setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + speed }));
    }
    console.log(keyState)
    console.log(position)
    

    requestAnimationFrame(moveImage);
  }, [keyState]);

  return (
    <div>
      <h1>キーボードの矢印キーで画像を動かす</h1>
      
      <img
        src="/sozai/front-hato.gif"
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
