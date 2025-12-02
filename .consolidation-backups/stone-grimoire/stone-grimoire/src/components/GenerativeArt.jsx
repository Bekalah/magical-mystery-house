import React, { useRef } from 'react';

function randomColor() {
  const palette = ['#FFD700', '#9370DB', '#4A90E2', '#00FFFF', '#1a1e27'];
  return palette[Math.floor(Math.random() * palette.length)];
}

function drawArt(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 12; i++) {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((Math.PI * 2 * i) / 12);
    ctx.beginPath();
    ctx.arc(0, 0, 80 + Math.random() * 40, 0, Math.PI * 2);
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = 4 + Math.random() * 6;
    ctx.globalAlpha = 0.3 + Math.random() * 0.5;
    ctx.stroke();
    ctx.restore();
  }
  // Center sigil
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2);
  ctx.fillStyle = randomColor();
  ctx.globalAlpha = 0.7;
  ctx.fill();
}

export default function GenerativeArt() {
  const canvasRef = useRef();

  const handleGenerate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      drawArt(ctx, canvas.width, canvas.height);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-4 border-[#FFD700] rounded shadow-lg bg-[#1a1e27]"
        style={{ background: '#1a1e27' }}
      />
      <button
        onClick={handleGenerate}
        className="bg-[#FFD700] text-[#1a1e27] px-4 py-2 rounded font-bold hover:bg-[#9370DB] transition-colors"
      >
        Generate Art
      </button>
    </div>
  );
}
