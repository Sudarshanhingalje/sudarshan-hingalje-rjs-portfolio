// GalaxyBackground.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GalaxyBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    // Fullscreen plane
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          vec2 pos = uv - 0.5;
          float dist = length(pos);
          float brightness = smoothstep(0.5, 0.0, dist);

          // Twinkling stars
          float stars = step(0.995, random(floor(gl_FragCoord.xy * 0.5)));
          float twinkle = sin(u_time * 5.0 + dist * 50.0) * 0.5 + 0.5;

          vec3 galaxy = vec3(brightness) * mix(vec3(0.1, 0.2, 0.5), vec3(0.6, 0.7, 1.0), dist) * twinkle;
          galaxy += stars;

          gl_FragColor = vec4(galaxy, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Resize listener
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    const start = Date.now();
    const animate = () => {
      material.uniforms.u_time.value = (Date.now() - start) * 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-20 dark:block hidden" />
  );
}
