import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import codegirl from './assets/codegirl.gif'; // Aapki profile image

export default function App() {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // RIGHT SIDE DRAWER ANIMATION CHANGE DETECTED HERE
  const menuVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "tween", duration: 0.3 } }
  };

  // Sample Projects Data
  const projects = [
    {
      title: "CADA.us",
      desc: "A premium, high-performance web platform developed for a US-based client. Engineered with robust full-stack architecture, optimized data flows, and a sleek, modern UI tailored for the American market.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      link: "https://github.com/UmeHania07/CADA.us-Lithium-Batteries" // Agar active link hai toh url daal dein, warna "#" rakh sakti hain
    },
    {
      title: "Real-Time-Chat-App",
      desc: "A high-performance instant messaging platform featuring real-time bi-directional communication, instant data synchronization, and a sleek, intuitive user interface.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Tailwind CSS"],
      link: "https://github.com/UmeHania07/Real-Time-Chat-App"
    }
  ];

  const navLinks = [
    { id: "home", label: "Home", color: "text-neonPurp", bg: "bg-neonPurp" },
    { id: "about", label: "Behind The Code", color: "text-neonBlue", bg: "bg-neonBlue" },
    { id: "Build", label: "What I Build", color: "text-neonBlue", bg: "bg-neonBlue" },
    { id: "projects", label: "My Portfolio", color: "text-neonPurp", bg: "bg-neonPurp" },
    { id: "contact", label: "Contact Me", color: "text-neonBlue", bg: "bg-neonBlue" },
  ];

  return (
    <div id="home" className="min-h-screen relative text-slate-100 selection:bg-neonPurp selection:text-white bg-slate-950 overflow-x-hidden">

      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* 🌟 Responsive Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/50 px-6 lg:px-24 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">

          {/* Left: Brand Name */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-neonPurp to-neonBlue bg-clip-text text-transparent cursor-pointer font-mono z-50 select-none"
          >
            <span className="text-slate-600 font-light">&lt;</span>
            UmeHani
            <span className="text-neonBlue font-semibold">/</span>
            <span className="text-slate-600 font-light">&gt;</span>
          </motion.h1>
          {/* Center: Navigation Links (Desktop Only) */}
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-slate-400 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenu(link.id)}
                className={`relative py-1 transition-colors ${menu === link.id ? `${link.color} font-semibold` : "hover:text-slate-200"}`}
              >
                {link.label}
                {menu === link.id && (
                  <motion.div layoutId="underline" className={`absolute bottom-0 left-0 right-0 h-[2px] ${link.bg}`} />
                )}
              </a>
            ))}
          </div>

          {/* Right: Connect Button (Desktop Only) */}
          <div className="hidden md:block">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=umehani.mern@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-neonPurp to-neonBlue text-white shadow-lg shadow-purple-500/10 hover:opacity-90 transition-all border border-purple-400/20 cursor-pointer"
            >
              Connect With Me
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer (Right Slide-in) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop Background Overlay (Ispe click karne se menu close ho jayega) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
              />

              {/* Right Side Drawer Content */}
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 right-0 h-screen w-72 max-w-[80vw] bg-slate-950 border-l border-slate-800 p-6 pt-24 flex flex-col gap-6 text-left font-medium z-40 shadow-2xl md:hidden"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => {
                      setMenu(link.id);
                      setIsOpen(false);
                    }}
                    className={`py-2 px-4 text-base rounded-xl transition-all ${menu === link.id ? `${link.color} bg-slate-900/50 font-bold` : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=umehani.mern@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2.5 w-full rounded-full text-sm font-semibold bg-gradient-to-r from-neonPurp to-neonBlue text-white text-center shadow-md block"
                >
                  Connect With Me
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* 🚀 Hero Section */}
      <section className="container mx-auto px-6 pt-16 md:pt-24 pb-24 text-center max-w-3xl flex flex-col items-center">
        {/* Profile Image with Neon Border Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neonPurp to-neonBlue rounded-full blur-md opacity-70 animate-pulse scale-135"></div>
          <img
            src={codegirl}
            alt="UmeHani Profile"
            className="relative w-full h-full object-cover rounded-full border-2 border-slate-700 p-1 bg-slate-900 scale-125 transition-transform"
          />
        </motion.div>

        {/* Status Badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className="mt-8 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider block text-center">
            Available for Freelance & Full-time
          </span>
        </motion.div>

        {/* Customized Name & Role Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold mt-6 tracking-tight leading-tight"
        >
          <span className="bg-gradient-to-r from-neonPurp via-fuchsia-500 to-neonBlue bg-clip-text text-transparent">
            I'm UmeHani,
          </span><br />
          Mern Stack developer based in Pakistan.
        </motion.h2>

        {/* Your Original Professional Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm md:text-lg text-slate-400 max-w-2xl leading-relaxed"
        >
          I am a software engineer passionate about building efficient, user-friendly applications. With expertise in both front-end and back-end development.
        </motion.p>

        {/* Action Buttons: Connect & Resume */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center w-full justify-center"
        >
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=umehani.mern@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-gradient-to-r from-neonPurp to-fuchsia-600 font-medium text-white shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all text-sm"
          >
            Connect With Me
          </a>
          <a
            href="/UmeHani resume.pdf"
            target="_blank"
            className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition-colors font-medium text-sm flex items-center gap-1 text-slate-300 hover:text-white"
          >
            My resume ❤️
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-16 md:py-20 max-w-5xl border-t border-slate-800/60">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* Left Side: Text and Button */}
          <div>
            <div className="flex items-center gap-2 text-neonBlue mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span className="font-semibold tracking-wider uppercase text-sm">My Story</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Crafting Seamless Code & Smart Architectures
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
              I am a passionate MERN Stack Developer dedicated to building highly responsive, visually striking, and interactive web applications. Combining clean frontend logic with robust backend architectures, I turn complex problems into optimized, production-ready solutions.
            </p>
          </div>

          {/* Right Side: Tech Stack Card */}
          <div className="bg-slate-900/60 p-5 md:p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 text-neonPurp">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              <span className="text-xs font-mono">tech-stack.json</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["JavaScript (ES6+)", "React", "Node.js", "Express.js", "MongoDB", "Firebase", "Redux", "Next.js", "React Native", "Git / GitHub", "JWT Auth", "Socket.io", "Axios REST APIs"].map((skill, index) => (
                <span key={index} className="px-3 py-1.5 text-xs font-mono bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </section>
      {/* What I Build */}
      <section id="Build" className="container mx-auto px-6 py-16 md:py-20 max-w-5xl border-t border-slate-800/60">
        <div className="flex items-center gap-2 text-neonPurp mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M5 17V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12M9 9h6M9 13h6" /></svg>
          <span className="font-semibold tracking-wider uppercase text-sm">What I Build</span>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service 1 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/30 transition-all group">
            <h4 className="text-xl font-bold text-white group-hover:text-neonBlue transition-colors mb-3">Frontend Architecture</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Building high-performance, responsive single-page applications (SPAs) using React and Tailwind CSS. Focused on seamless animations, intuitive UX, and clean state management.
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Redux Toolkit", "Framer Motion", "Tailwind"].map((t, i) => (
                <span key={i} className="px-2.5 py-1 text-[11px] font-mono bg-slate-800 text-slate-400 rounded">{t}</span>
              ))}
            </div>
          </div>

          {/* Service 2 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/30 transition-all group">
            <h4 className="text-xl font-bold text-white group-hover:text-neonBlue transition-colors mb-3">Backend & API Engineering</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Designing robust RESTful APIs and scalable server-side logic using Node.js and Express. Expert in secure authentication, database modeling, and optimizing query speeds.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "REST APIs"].map((t, i) => (
                <span key={i} className="px-2.5 py-1 text-[11px] font-mono bg-slate-800 text-slate-400 rounded">{t}</span>
              ))}
            </div>
          </div>
          {/* GitHub Button added here */}
          <div className="flex">
            <a
              href="https://github.com/UmeHania07"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900/80 text-slate-200 border border-slate-800 rounded-xl hover:border-purple-500 hover:text-white shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              {/* GitHub Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>

              <span className="text-sm font-medium">Explore My Project</span>

              {/* Animated Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-6 py-16 md:py-20 max-w-5xl border-t border-slate-800/60">
        <div className="flex items-center gap-2 text-neonPurp mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          <span className="font-semibold tracking-wider uppercase text-sm">Selected Work</span>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <motion.div key={idx} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-white group-hover:text-neonBlue transition-colors">{proj.title}</h4>
                <a href={proj.link} className="text-slate-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{proj.desc}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 text-[11px] font-mono bg-slate-800 text-slate-400 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-24 text-center max-w-2xl border-t border-slate-800/60">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
            Turning Pixels Into Powerful Products
          </h3>
          <p className="text-slate-400 mt-4 mb-8 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Got a groundbreaking idea or a complex problem to solve? Let’s team up and code something that stands out from the digital noise.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=umehani.mern@gmail.com"
              target="_blank"
              className="p-3 bg-slate-900 rounded-full border border-slate-800 hover:border-neonBlue hover:text-neonBlue transition-all cursor-pointer inline-block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a href="https://github.com/UmeHania07" target="_blank" rel="noreferrer" className="p-3 bg-slate-900 rounded-full border border-slate-800 hover:border-neonPurp hover:text-neonPurp transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/umehaniamern/" target="_blank" rel="noreferrer" className="p-3 bg-slate-900 rounded-full border border-slate-800 hover:border-neonBlue hover:text-neonBlue transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>

          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-slate-800/60 text-center text-xs text-slate-500 font-mono">
        <p>
          © {new Date().getFullYear()} UmeHani. Crafted with passion & MERN Stack.❤️
        </p>
      </footer>
    </div>
  );
}