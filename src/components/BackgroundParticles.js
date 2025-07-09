import { useEffect, useRef } from "react";
import * as THREE from "three";

export function BackgroundParticles() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const connectionLinesRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced particle system
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Color palette for particles
    const colorPalette = [
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0x7c3aed), // Violet
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x10b981), // Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      // Velocity with some variation
      const speed = Math.random() * 0.02 + 0.005;
      velocities[i * 3] = (Math.random() - 0.5) * speed;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed;

      // Size variation
      sizes[i] = Math.random() * 3 + 1;

      // Color variation
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const color = colorPalette[colorIndex];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Opacity and phase for pulsing effect
      opacities[i] = Math.random() * 0.8 + 0.2;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));

    // Enhanced particle texture with glow effect
    const canvas = document.createElement("canvas");
    const size = 128;
    canvas.width = canvas.height = size;
    const context = canvas.getContext("2d");

    // Create multiple gradient layers for glow effect
    const centerGradient = context.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 4
    );
    centerGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    centerGradient.addColorStop(0.2, "rgba(139, 92, 246, 0.8)");
    centerGradient.addColorStop(1, "rgba(139, 92, 246, 0)");

    const outerGradient = context.createRadialGradient(
      size / 2, size / 2, size / 4,
      size / 2, size / 2, size / 2
    );
    outerGradient.addColorStop(0, "rgba(139, 92, 246, 0.3)");
    outerGradient.addColorStop(1, "rgba(139, 92, 246, 0)");

    context.fillStyle = outerGradient;
    context.fillRect(0, 0, size, size);
    context.fillStyle = centerGradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);

    // Enhanced particle material with vertex colors
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        texture: { value: texture },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float opacity;
        varying vec3 vColor;
        varying float vOpacity;
        uniform float time;
        uniform vec2 mouse;
        
        void main() {
          vColor = color;
          vOpacity = opacity;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Mouse interaction
          vec2 mouseDistance = mouse - position.xy;
          float distance = length(mouseDistance);
          float mouseInfluence = 1.0 + (1.0 / (1.0 + distance * 0.1)) * 0.3;
          
          // Pulsing effect
          float pulse = sin(time * 2.0 + position.x * 0.1 + position.y * 0.1) * 0.2 + 1.0;
          
          gl_PointSize = size * mouseInfluence * pulse * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D texture;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vec4 texColor = texture2D(texture, gl_PointCoord);
          gl_FragColor = vec4(vColor, texColor.a * vOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Connection lines between nearby particles
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    connectionLinesRef.current = lines;

    camera.position.z = 8;

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.01;

      const pos = particles.geometry.attributes.position.array;
      const opacityArray = particles.geometry.attributes.opacity.array;

      // Update particle positions and create floating effect
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        
        // Update positions
        pos[idx] += velocities[idx];
        pos[idx + 1] += velocities[idx + 1];
        pos[idx + 2] += velocities[idx + 2];

        // Add floating motion
        pos[idx] += Math.sin(time + phases[i]) * 0.001;
        pos[idx + 1] += Math.cos(time + phases[i] * 1.5) * 0.001;

        // Boundary conditions with smooth wrapping
        if (Math.abs(pos[idx]) > 12) pos[idx] = -pos[idx] * 0.9;
        if (Math.abs(pos[idx + 1]) > 12) pos[idx + 1] = -pos[idx + 1] * 0.9;
        if (Math.abs(pos[idx + 2]) > 12) pos[idx + 2] = -pos[idx + 2] * 0.9;

        // Update opacity for breathing effect
        opacityArray[i] = (Math.sin(time * 2 + phases[i]) + 1) * 0.3 + 0.2;
      }

      // Update connection lines
      const linePositions = [];
      const maxDistance = 3;
      
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < maxDistance) {
            linePositions.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
            linePositions.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
          }
        }
      }

      lines.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      // Update shader uniforms
      particleMaterial.uniforms.time.value = time;
      particleMaterial.uniforms.mouse.value.set(
        mouseRef.current.x * 10,
        mouseRef.current.y * 10
      );

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.opacity.needsUpdate = true;

      // Gentle rotation
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
      if (scene) scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}