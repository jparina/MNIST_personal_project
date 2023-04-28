import React, { useEffect, useRef } from 'react';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const DigitRecognizer = () => {
  const canvasRef = useRef(null);
  const predictedNumberRef = useRef(null);
  const resizedCanvasContainerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;
    let lastX, lastY;

    const drawLine = (x1, y1, x2, y2, radius, intensity) => {
      const gradient = ctx.createRadialGradient(x1, y1, 0, x1, y1, radius);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(x1, y1, ctx.lineWidth / 2, 0, 2 * Math.PI);
      ctx.fill();

      const gradient2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, radius);
      gradient2.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
      gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.arc(x2, y2, ctx.lineWidth / 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${intensity})`;
      ctx.stroke();
      ctx.closePath();
    };

    const handleMouseDown = (e) => {
      drawing = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
    };

    const handleMouseMove = (e) => {
      if (!drawing) return;
      drawLine(lastX, lastY, e.offsetX, e.offsetY, 10, 1);
      lastX = e.offsetX;
      lastY = e.offsetY;
    };

    const handleMouseUp = () => {
      drawing = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };

  }, []);

  const getImageData = () => {
    const canvas = canvasRef.current;
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 28;
    resizedCanvas.height = 28;
    const resizedCtx = resizedCanvas.getContext('2d');

  
    resizedCtx.drawImage(canvas, 0, 0, 28, 28)
  
    const imageData = resizedCtx.getImageData(0, 0, 28, 28);

  
    const array2D = new Array(28).fill(0).map(() => new Array(28).fill(0));
    for (let i = 0; i < imageData.data.length; i += 4) {
      const brightness = (imageData.data[i] / 255);
      const row = Math.floor(i / 4 / 28);
      const col = (i / 4) % 28;
      array2D[row][col] = brightness;
    }
    return array2D;
  } 

  const handleProcessImageClick = async () => {
    const tensor = getImageData();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/predict_ff/", { tensor });
      const predictedNumber = response.data.predictedNumber;
      predictedNumberRef.current.textContent = predictedNumber;
    } catch (error) {
      console.error('Error processing the image:', error);
    }
  };

  const handleClearCanvasClick = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="canvas-container">
      <div className="canvas">
        <canvas
          id="drawingCanvas"
          width="280"
          height="280"
          ref={canvasRef}
        ></canvas>
        <button
          id="processImageButton"
          onClick={handleProcessImageClick}
        >
          Process Image
        </button>
        <button
          id="clearCanvasButton"
          onClick={handleClearCanvasClick}
        >
          Clear Canvas
        </button>
        <div>
          I predict this number is{' '}
          <span id="predictedNumber" ref={predictedNumberRef}></span>
        </div>
        
      </div>
    </div>
  );
};

export default DigitRecognizer;
