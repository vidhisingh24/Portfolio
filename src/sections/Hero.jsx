import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, CheckCircle2, Star, Brain, BookOpen } from 'lucide-react';
import CustomButton from '../components/CustomButton';
import profileImage from "../assets/profile.png";

const stats = [
  { label: 'Professional Projects', val: '4+', icon: <CheckCircle2 className="text-purple-400" size={18} /> },
  { label: 'Open Source Contributor', val: 'Active', icon: <Star className="text-pink-400" size={18} /> },
  { label: 'AI & ML Learner', val: 'Hands-on', icon: <Brain className="text-blue-400" size={18} /> },
  { label: 'DSA Enthusiast', val: 'C++', icon: <BookOpen className="text-green-400" size={18} /> },
];

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Scene Setup
    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry - Create Particle Sphere
    const particleCount = 750;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#C4B5FD'), // Lavender
      new THREE.Color('#FBCFE8'), // Soft Pink
      new THREE.Color('#BFDBFE'), // Sky Blue
      new THREE.Color('#BBF7D0'), // Mint
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spherical coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0; // Sphere radius

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      // Random color from palette
      const randColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i] = randColor.r;
      colors[i + 1] = randColor.g;
      colors[i + 2] = randColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Points Mesh
    const particleSphere = new THREE.Points(geometry, material);
    scene.add(particleSphere);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate sphere
      particleSphere.rotation.y += 0.002;
      particleSphere.rotation.x += 0.001;

      // Inertia mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particleSphere.rotation.y += targetX * 0.5;
      particleSphere.rotation.x += targetY * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden">
      {/* Background Blobs inside Hero (Local Context) */}
      <div className="absolute top-[20%] right-[-25%] w-[350px] h-[350px] bg-softpink/5 rounded-full blur-[100px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-[10%] left-[-25%] w-[400px] h-[400px] bg-lavender/5 rounded-full blur-[120px] animate-pulse-slow -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Column - Copy & CTA */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border border-glassBorder dark:border-glassBorderDark text-xs font-semibold text-purple-700 dark:text-lavender w-fit shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-purple-900 animate-ping" />
            Recruiter Ready Portfolio
          </motion.div>

          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-lg font-medium text-slate-500 dark:text-slate-400 font-sans"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold font-display tracking-tight text-slate-950 dark:text-white"
            >
              Vidhi Singh
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-2xl font-bold text-gradient font-display h-[36px]"
            >
              <TypeAnimation
                sequence={[
                  'Software Engineer in Progress',
                  1500,
                  'AI & ML Enthusiast',
                  1500,
                  'Full Stack Learner',
                  1500,
                  'Problem Solver',
                  1500,
                  'Open Source Contributor',
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm md:text-base text-slate-600 dark:text-slate-350 max-w-xl leading-relaxed font-sans"
          >
            I am a Computer Engineering student focused on building scalable systems, mastering Data Structures & Algorithms, and exploring the frontiers of Machine Learning. Combining core software principles with modern web technologies, I design products with intuitive aesthetics and technical depth.
          </motion.p>

          {/* Social Icons & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <CustomButton href="#projects" variant="primary">
              View Projects <ArrowUpRight size={16} />
            </CustomButton>
            <CustomButton href="#contact" variant="primary">
              Contact Me
            </CustomButton>

            <div className="flex items-center gap-3 ml-2">
              <a
                href="https://github.com/vidhisingh24"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass-effect flex items-center justify-center text-slate-800 hover:text-slate-900 dark:text-slate-700 dark:hover:text-white hover:scale-105 transition-all shadow-sm border border-glassBorder dark:border-glassBorderDark"
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://LinkedIn.com/in/vidhi-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass-effect flex items-center justify-center text-slate-800 hover:text-slate-900 dark:text-slate-700 dark:hover:text-white hover:scale-105 transition-all shadow-sm border border-glassBorder dark:border-glassBorderDark"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:vidhiisingh2403@gmail.com"
                className="w-11 h-11 rounded-full glass-effect flex items-center justify-center text-slate-800 hover:text-slate-900 dark:text-slate-700 dark:hover:text-white hover:scale-105 transition-all shadow-sm border border-glassBorder dark:border-glassBorderDark"
                aria-label="Send email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Metrics Quick Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-effect rounded-2xl p-4 border border-glassBorder/80 dark:border-glassBorderDark flex flex-col justify-between h-[100px] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-700 dark:text-slate-600 font-medium">{stat.label}</span>
                  {stat.icon}
                </div>
                <span className="text-xl font-bold text-slate-950 dark:text-white font-display mt-2">{stat.val}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl"></div>

            <img
              src={profileImage}
              alt="Vidhi Singh"
              className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] object-cover rounded-full border-2 border-purple-500 shadow-2xl relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
