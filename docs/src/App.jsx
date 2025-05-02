import React, { useState, useEffect, useRef } from 'react';
import { Github, Twitter, Globe, Copy, Check } from 'lucide-react';
import arhaan from "./assets/arhaan.jpg";
// Add this to your CSS or use a CSS-in-JS solution
const styles = `
  
  .text-stroke {
    -webkit-text-stroke: 1px white;
    color: transparent;
  }
  
  .text-gradient {
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-5px, 5px); }
    40% { transform: translate(-5px, -5px); }
    60% { transform: translate(5px, 5px); }
    80% { transform: translate(5px, -5px); }
    100% { transform: translate(0); }
  }
  
  @keyframes shine {
    0% { background-position: -500%; }
    100% { background-position: 500%; }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-rotate {
    animation: rotate 10s linear infinite;
  }
  
  .animate-glitch {
    animation: glitch 1s linear infinite;
  }
  
  .animate-shine {
    animation: shine 8s linear infinite;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    background-size: 200% auto;
  }
  
  .hover-scale {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
  }
  
  .hover-underline {
    position: relative;
  }
  
  .hover-underline::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }
  
  .hover-underline:hover::after {
    width: 100%;
  }
  
  .glow {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
  
  .glow-purple {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.7);
  }
  
  .glow-blue {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.7);
  }
  
  .glow-pink {
    box-shadow: 0 0 20px rgba(236, 72, 153, 0.7);
  }
`;

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [copied, setCopied] = useState({ npm: false, yarn: false });
  const [hoverItem, setHoverItem] = useState(null);
  const [cursorColor, setCursorColor] = useState('#ffffff');
  
  const sectionRefs = {
    home: useRef(null),
    installation: useRef(null),
    usage: useRef(null),
    props: useRef(null),
    examples: useRef(null),
    about: useRef(null),
  };

  // Enhanced cursor component with more effects
  const Cursor = ({ hoverText }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    
    useEffect(() => {
      const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      
      const handleMouseDown = () => {
        setIsClicking(true);
      };
      
      const handleMouseUp = () => {
        setIsClicking(false);
      };
      
      window.addEventListener('mousemove', updatePosition);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, []);
    
    useEffect(() => {
      setIsHovering(!!hoverText);
    }, [hoverText]);
    
    return (
      <div className="fixed top-0 left-0 z-50 pointer-events-none">
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div 
          className={`rounded-full mix-blend-difference transition-all duration-300 ease-out ${
            isHovering ? 'w-24 h-24' : isClicking ? 'w-8 h-8' : 'w-12 h-12'
          }`}
          style={{ 
            transform: `translate(${position.x - (isHovering ? 48 : isClicking ? 16 : 24)}px, ${
              position.y - (isHovering ? 48 : isClicking ? 16 : 24)
            }px)`,
            opacity: isClicking ? 0.9 : 0.8,
            background: cursorColor,
            transition: 'width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {hoverText && (
            <div className="flex items-center justify-center h-full w-full text-black text-sm font-bold font-syne">
              {hoverText}
            </div>
          )}
        </div>
        <div 
          className="rounded-full absolute"
          style={{ 
            width: isHovering ? '12px' : '6px',
            height: isHovering ? '12px' : '6px',
            transform: `translate(${position.x - (isHovering ? 6 : 3)}px, ${position.y - (isHovering ? 6 : 3)}px)`,
            opacity: 0.7,
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: cursorColor
          }}
        />
        <div 
          className="rounded-full absolute pointer-events-none"
          style={{
            width: isHovering ? '40px' : '24px',
            height: isHovering ? '40px' : '24px',
            transform: `translate(${position.x - (isHovering ? 20 : 12)}px, ${position.y - (isHovering ? 20 : 12)}px)`,
            opacity: 0.2,
            transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            border: `2px solid ${cursorColor}`
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sectionPositions = Object.entries(sectionRefs).map(([id, ref]) => ({
        id,
        top: ref.current.offsetTop - 100
      }));
      
      const currentSection = [...sectionPositions].reverse().find(section => scrollY >= section.top);
      
      if (currentSection) {
        setActiveSection(currentSection.id);
        // Change cursor color based on section
        const colors = {
          home: '#ffffff',
          installation: '#8b5cf6',
          usage: '#3b82f6',
          props: '#ec4899',
          examples: '#10b981',
          about: '#f59e0b'
        };
        setCursorColor(colors[currentSection.id] || '#ffffff');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => {
      setCopied({ ...copied, [type]: false });
    }, 2000);
  };

  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Cursor hoverText={hoverItem} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-lg z-40 border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 hover-scale"
            onMouseEnter={() => setHoverItem('Home')}
            onMouseLeave={() => setHoverItem(null)}
          >
            <div className="w-5 h-5 bg-white rounded-full glow" />
            <span className="text-white font-bold text-xl font-syne tracking-tight">REACT NOIR CURSOR</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {Object.keys(sectionRefs).map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium font-space transition-all hover-underline ${
                  activeSection === section ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
                onMouseEnter={() => setHoverItem(`View ${section.charAt(0).toUpperCase() + section.slice(1)}`)}
                onMouseLeave={() => setHoverItem(null)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section 
        ref={sectionRefs.home} 
        className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-24 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container mx-auto px-6 py-24 flex flex-col items-center text-center z-10">
          <div className="relative mb-12 animate-float">
            <div className="w-40 h-40 bg-purple-600 rounded-full blur-3xl absolute -z-10 opacity-20 glow-purple"></div>
            <div className="w-40 h-40 bg-blue-600 rounded-full blur-3xl absolute -z-10 opacity-20 translate-x-8 glow-blue"></div>
            <div className="w-24 h-24 bg-white rounded-full relative z-10 glow flex items-center justify-center">
              <div className="w-8 h-8 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-archivo tracking-tighter">
            <span className="text-stroke">REACT</span> <span className="text-gradient">NOIR</span> <span className="text-stroke">CURSOR</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 font-space leading-relaxed">
            A sleek, customizable cursor component that replaces the default browser cursor with a modern, animated alternative.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <button 
              onClick={() => scrollToSection('installation')}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all hover-scale font-syne text-lg"
              onMouseEnter={() => setHoverItem('Get Started')}
              onMouseLeave={() => setHoverItem(null)}
            >
              GET STARTED
            </button>
            <a 
              href="https://github.com/Arhaan-Siddiquee/react-noir-cursor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:bg-opacity-10 transition-all hover-scale font-syne text-lg"
              onMouseEnter={() => setHoverItem('View on GitHub')}
              onMouseLeave={() => setHoverItem(null)}
            >
              GITHUB REPO
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>
      
      {/* Installation Section */}
      <section 
        ref={sectionRefs.installation} 
        className="py-24 bg-black relative overflow-hidden"
        id="installation"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxMzksOTIsMjQ2LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-12 font-archivo tracking-tight">
            <span className="text-gradient">INSTALLATION</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover-scale">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                <h3 className="text-xl font-medium text-white font-syne">Using npm</h3>
              </div>
              <div className="relative">
                <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto font-space">npm install react-noir-cursor</pre>
                <button 
                  onClick={() => copyToClipboard('npm install react-noir-cursor', 'npm')}
                  className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
                  onMouseEnter={() => setHoverItem('Copy Command')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.npm ? <Check size={18} className="text-green-400 animate-pulse" /> : <Copy size={18} className="text-gray-400" />}
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover-scale">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                <h3 className="text-xl font-medium text-white font-syne">Using yarn</h3>
              </div>
              <div className="relative">
                <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto font-space">yarn add react-noir-cursor</pre>
                <button 
                  onClick={() => copyToClipboard('yarn add react-noir-cursor', 'yarn')}
                  className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
                  onMouseEnter={() => setHoverItem('Copy Command')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.yarn ? <Check size={18} className="text-green-400 animate-pulse" /> : <Copy size={18} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-900 rounded-xl p-6 border border-gray-800 hover-scale">
            <h3 className="text-xl font-medium text-white mb-4 font-syne">Peer Dependencies</h3>
            <p className="text-gray-300 mb-4 font-space">This package requires React (16.8+) and styled-components (5.0+) as peer dependencies.</p>
            <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto font-space">npm install react styled-components<br/>yarn add react styled-components</pre>
          </div>
        </div>
      </section>
      
      {/* Usage Section */}
      <section 
        ref={sectionRefs.usage} 
        className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
        id="usage"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSg1OSwxMzAsMjQ2LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-12 font-archivo tracking-tight">
            <span className="text-gradient">USAGE</span>
          </h2>
          
          <div className="space-y-12">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover-scale">
              <h3 className="text-2xl font-medium text-white mb-4 font-syne">Basic Usage</h3>
              <p className="text-gray-300 mb-6 font-space">Wrap your component with a React Fragment and add the Cursor component:</p>
              <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto font-space">
{`import React from 'react';
import Cursor from 'react-noir-cursor';

function App() {
  return (
    <>
      <Cursor />
      <div style={{ minHeight: '100vh' }}>
        {/* Your application content */}
      </div>
    </>
  );
}`}
              </pre>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover-scale">
              <h3 className="text-2xl font-medium text-white mb-4 font-syne">With Hover Detection</h3>
              <p className="text-gray-300 mb-6 font-space">Add hover text that changes based on user interaction:</p>
              <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto font-space">
{`import React, { useState } from 'react';
import Cursor from 'react-noir-cursor';

function App() {
  const [hoverItem, setHoverItem] = useState(null);
  
  return (
    <>
      <Cursor 
        hoverText={hoverItem}
      />
      
      <div style={{ minHeight: '100vh', padding: '2rem' }}>
        <h1
          onMouseEnter={() => setHoverItem('Home')}
          onMouseLeave={() => setHoverItem(null)}
        >
          Hover over me
        </h1>
        
        <button
          onMouseEnter={() => setHoverItem('Click Me')}
          onMouseLeave={() => setHoverItem(null)}
          style={{ padding: '1rem 2rem', margin: '1rem' }}
        >
          Button
        </button>
      </div>
    </>
  );
}`}
              </pre>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover-scale">
              <h3 className="text-2xl font-medium text-white mb-4 font-syne">Advanced Customization</h3>
              <p className="text-gray-300 mb-6 font-space">Customize the appearance and behavior of the cursor:</p>
              <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto font-space">
{`<>
  <Cursor
    size={30}
    color="#ff3366"
    opacity={0.9}
    hoverSize={60}
    hoverText="Action!"
    hoverTextColor="#ffffff"
    hoverTextSize={14}
    blendMode="exclusion"
  />
  {/* Your app content */}
</>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
      
      {/* Props Reference Section */}
      <section 
        ref={sectionRefs.props} 
        className="py-24 bg-gray-900 relative overflow-hidden"
        id="props"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyMzYsNzIsMTUzLDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-12 font-archivo tracking-tight">
            <span className="text-gradient">PROPS REFERENCE</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="px-6 py-4 text-gray-200 font-syne">Prop</th>
                  <th className="px-6 py-4 text-gray-200 font-syne">Type</th>
                  <th className="px-6 py-4 text-gray-200 font-syne">Default</th>
                  <th className="px-6 py-4 text-gray-200 font-syne">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">size</td>
                  <td className="px-6 py-4 text-gray-300 font-space">number</td>
                  <td className="px-6 py-4 text-gray-300 font-space">40</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Base size of the cursor in pixels</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">color</td>
                  <td className="px-6 py-4 text-gray-300 font-space">string</td>
                  <td className="px-6 py-4 text-gray-300 font-space">'white'</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Color of the cursor circle</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">opacity</td>
                  <td className="px-6 py-4 text-gray-300 font-space">number</td>
                  <td className="px-6 py-4 text-gray-300 font-space">0.8</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Opacity of the cursor (0-1)</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">blendMode</td>
                  <td className="px-6 py-4 text-gray-300 font-space">string</td>
                  <td className="px-6 py-4 text-gray-300 font-space">'difference'</td>
                  <td className="px-6 py-4 text-gray-300 font-space">CSS mix-blend-mode property</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">hoverSize</td>
                  <td className="px-6 py-4 text-gray-300 font-space">number</td>
                  <td className="px-6 py-4 text-gray-300 font-space">80</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Size when hovering over interactive elements</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">hoverText</td>
                  <td className="px-6 py-4 text-gray-300 font-space">string</td>
                  <td className="px-6 py-4 text-gray-300 font-space">null</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Text to display when hovering</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">hoverTextColor</td>
                  <td className="px-6 py-4 text-gray-300 font-space">string</td>
                  <td className="px-6 py-4 text-gray-300 font-space">'black'</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Color of hover text</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">hoverTextSize</td>
                  <td className="px-6 py-4 text-gray-300 font-space">number</td>
                  <td className="px-6 py-4 text-gray-300 font-space">12</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Font size of hover text in pixels</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">innerScale</td>
                  <td className="px-6 py-4 text-gray-300 font-space">number</td>
                  <td className="px-6 py-4 text-gray-300 font-space">0.5</td>
                  <td className="px-6 py-4 text-gray-300 font-space">Scale of inner circle relative to main cursor (0-1)</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium font-space">transitionDuration</td>
                  <td className="px-6 py-4 text-gray-300 font-space">string</td>
                  <td className="px-6 py-4 text-gray-300 font-space">'0.3s'</td>
                  <td className="px-6 py-4 text-gray-300 font-space">CSS transition duration for animations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
            {/* Examples Section */}
            <section 
        ref={sectionRefs.examples} 
        className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
        id="examples"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxNiwxODUsMTI5LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-12 font-archivo tracking-tight">
            <span className="text-gradient">EXAMPLES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-400 transition-all duration-300 hover-scale">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                <h3 className="text-xl font-medium text-white font-syne">Basic Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => copyToClipboard(`<Cursor />`, 'basic')}
                  onMouseEnter={() => setHoverItem('Copy Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.basic ? <Check size={18} className="text-green-400 animate-pulse" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 opacity-80 animate-pulse"></div>
                  <p className="text-gray-300 font-space">Default cursor with basic settings</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto font-space">
{`<Cursor />

// Additional settings:
// - size={40}
// - color="white"
// - opacity={0.8}
// - blendMode="difference"`}
              </pre>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all duration-300 hover-scale">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                <h3 className="text-xl font-medium text-white font-syne">Interactive Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => copyToClipboard(`<Cursor hoverText="Click Me" hoverSize={80} />`, 'interactive')}
                  onMouseEnter={() => setHoverItem('Copy Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.interactive ? <Check size={18} className="text-green-400 animate-pulse" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 opacity-80 flex items-center justify-center animate-pulse">
                    <span className="text-black text-sm font-bold font-syne">Click Me</span>
                  </div>
                  <p className="text-gray-300 font-space">Hover state with custom text</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto font-space">
{`<Cursor 
  hoverText="Click Me"
  hoverSize={80}
  hoverTextColor="black"
  hoverTextSize={14}
/>`}
              </pre>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-400 transition-all duration-300 hover-scale">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                <h3 className="text-xl font-medium text-white font-syne">Colored Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => copyToClipboard(`<Cursor color="#8B5CF6" blendMode="normal" />`, 'colored')}
                  onMouseEnter={() => setHoverItem('Copy Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.colored ? <Check size={18} className="text-green-400 animate-pulse" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 opacity-80 animate-pulse"></div>
                  <p className="text-gray-300 font-space">Custom colored cursor</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto font-space">
{`<Cursor 
  color="#8B5CF6"
  blendMode="normal"
/>`}
              </pre>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover-scale">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                <h3 className="text-xl font-medium text-white font-syne">Custom Size Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => copyToClipboard(`<Cursor size={60} opacity={0.6} innerScale={0.3} />`, 'size')}
                  onMouseEnter={() => setHoverItem('Copy Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.size ? <Check size={18} className="text-green-400 animate-pulse" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 opacity-60 animate-pulse"></div>
                  <p className="text-gray-300 font-space">Larger cursor with reduced opacity</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto font-space">
{`<Cursor 
  size={60}
  opacity={0.6}
  innerScale={0.3}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        ref={sectionRefs.about} 
        className="py-24 bg-black relative overflow-hidden"
        id="about"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNDUsMTU4LDExLDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-12 font-archivo tracking-tight">
            <span className="text-gradient">ABOUT THE AUTHOR</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover-scale">
                <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-6 overflow-hidden animate-float">
                  <img src={arhaan} alt="Arhaan Siddiquee" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 font-syne">ARHAAN SIDDQUEE</h3>
                <p className="text-gray-300 mb-6 font-space">Frontend Developer & UI/UX Enthusiast</p>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://github.com/Arhaan-Siddiquee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors hover-scale"
                    onMouseEnter={() => setHoverItem('GitHub')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="https://x.com/ArhaanSiddique0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors hover-scale"
                    onMouseEnter={() => setHoverItem('Twitter')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Twitter size={24} />
                  </a>
                  <a 
                    href="https://arhaan-dev.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors hover-scale"
                    onMouseEnter={() => setHoverItem('Portfolio')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Globe size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover-scale">
                <h3 className="text-2xl font-medium text-white mb-6 font-syne">ABOUT THIS PROJECT</h3>
                <p className="text-gray-300 mb-6 font-space leading-relaxed">
                  React Noir Cursor was created to provide developers with an elegant, customizable cursor solution 
                  that enhances user experience with smooth animations and interactive hover states. 
                </p>
                <p className="text-gray-300 mb-6 font-space leading-relaxed">
                  The goal was to create a performant, lightweight component that works seamlessly with React applications 
                  while offering extensive customization options to match any design system.
                </p>
                <p className="text-gray-300 mb-8 font-space leading-relaxed">
                  This project is open source and available on GitHub. Contributions, issues, and feature requests 
                  are welcome!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/Arhaan-Siddiquee/react-noir-cursor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all hover-scale font-syne flex items-center space-x-2"
                    onMouseEnter={() => setHoverItem('View on GitHub')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Github size={18} />
                    <span>GITHUB REPOSITORY</span>
                  </a>
                  <a 
                    href="https://arhaan-dev.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:bg-opacity-10 transition-all hover-scale font-syne flex items-center space-x-2"
                    onMouseEnter={() => setHoverItem('View Portfolio')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Globe size={18} />
                    <span>MY PORTFOLIO</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div 
              className="flex items-center space-x-2 mb-6 md:mb-0 hover-scale"
              onMouseEnter={() => setHoverItem('Home')}
              onMouseLeave={() => setHoverItem(null)}
            >
              <div className="w-5 h-5 bg-white rounded-full glow" />
              <span className="text-white font-bold text-lg font-syne tracking-tight">REACT NOIR CURSOR</span>
            </div>
            
            <div className="flex space-x-8 mb-6 md:mb-0">
              {Object.keys(sectionRefs).map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium font-space transition-all hover-underline ${
                    activeSection === section ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onMouseEnter={() => setHoverItem(`View ${section.charAt(0).toUpperCase() + section.slice(1)}`)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="https://github.com/Arhaan-Siddiquee" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover-scale"
                onMouseEnter={() => setHoverItem('GitHub')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Github size={20} />
              </a>
              <a 
                href="https://x.com/ArhaanSiddique0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover-scale"
                onMouseEnter={() => setHoverItem('Twitter')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://arhaan-dev.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover-scale"
                onMouseEnter={() => setHoverItem('Portfolio')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm font-space">
              © {new Date().getFullYear()} REACT NOIR CURSOR. CREATED BY ARHAAN SIDDQUEE.
            </p>
            <p className="text-gray-500 text-xs mt-2 font-space">
              THIS PROJECT IS OPEN SOURCE UNDER THE MIT LICENSE.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;