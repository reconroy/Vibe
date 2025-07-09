"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Starfield() {
	const mountRef = useRef(null);

	useEffect(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 1;

		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(width, height);
		mountRef.current.appendChild(renderer.domElement);

		const starsGeometry = new THREE.BufferGeometry();
		const starCount = 10000;
		const positions = new Float32Array(starCount * 3);

		for (let i = 0; i < starCount * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 2000;
		}

		starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
		const stars = new THREE.Points(starsGeometry, starsMaterial);
		scene.add(stars);

		const animate = () => {
			requestAnimationFrame(animate);
			stars.rotation.y += 0.0005;
			renderer.render(scene, camera);
		};
		animate();

		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			mountRef.current.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div
			ref={mountRef}
			className="fixed inset-0 -z-10"
		/>
	);
}
