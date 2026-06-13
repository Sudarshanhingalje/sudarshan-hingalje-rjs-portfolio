import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = color;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    const handleParticles = () => {
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }
    };

    const getColor = (x) => {
      const hue = (x / canvas.width) * 360;
      return `hsla(${hue}, 100%, 50%, 1)`;
    };

    const addParticle = (e) => {
      const rect = canvas.getBoundingClientRect();
      const posX = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
      const posY = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
      const color = getColor(posX);
      particlesRef.current.push(new Particle(posX, posY, color));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    canvas.addEventListener("mousemove", addParticle);
    canvas.addEventListener("touchstart", addParticle);
    canvas.addEventListener("touchmove", addParticle);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", addParticle);
      canvas.removeEventListener("touchstart", addParticle);
      canvas.removeEventListener("touchmove", addParticle);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden pointer-events-none z-50">
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto cursor-none"
      />
      <style jsx>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
