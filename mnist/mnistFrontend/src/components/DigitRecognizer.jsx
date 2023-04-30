import React, { useEffect, useRef, useState } from 'react';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const DigitRecognizer = ({ isLoggedIn, user }) => {
  const canvasRef = useRef(null);
  const predictedNumberRef = useRef(null);
  const [selectedApi, setSelectedApi] = useState('predict_ff');

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
    if (!isLoggedIn) {
      alert("Please sign in to use this feature.");
      return;
    }
    const tensor = getImageData();
    const apiEndpoint = `http://127.0.0.1:8000/api/${selectedApi}/`
    try {
      const response = await axios.post(apiEndpoint, { tensor }, {
        headers: {
          'Authorization': `Token ${user.token}`, 
        },
      });
      
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
      <div className="title-container">
        <h2>Digit Recognizer</h2>
      </div>
      <div className="canvas">
        <canvas
          id="drawingCanvas"
          width="280"
          height="280"
          ref={canvasRef}
        ></canvas>
        <div>
          <input type="radio" id="predict_ff" name="api" value="predict_ff" checked={selectedApi === 'predict_ff'} onChange={(e) => setSelectedApi(e.target.value)} />
          <label htmlFor="predict_ff">Feed Forward</label>
          <input type="radio" id="predict_cnn" name="api" value="predict_cnn" checked={selectedApi === 'predict_cnn'} onChange={(e) => setSelectedApi(e.target.value)} />
          <label htmlFor="predict_cnn">CNN</label>
          <input type="radio" id="predict_cnn2" name="api" value="predict_cnn2" checked={selectedApi === 'predict_cnn2'} onChange={(e) => setSelectedApi(e.target.value)} />
          <label htmlFor="predict_cnn2">CNN v2</label>
        </div>
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