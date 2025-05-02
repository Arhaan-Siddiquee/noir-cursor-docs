import React, { useState, useEffect, useRef } from 'react';
import { Github, Twitter, Globe, Copy, Check } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [copied, setCopied] = useState({ npm: false, yarn: false });
  const [hoverItem, setHoverItem] = useState(null);
  
  const sectionRefs = {
    home: useRef(null),
    installation: useRef(null),
    usage: useRef(null),
    props: useRef(null),
    examples: useRef(null),
    about: useRef(null),
  };

  // Mock cursor component for demo purposes
  const Cursor = ({ hoverText }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    
    useEffect(() => {
      const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', updatePosition);
      
      return () => {
        window.removeEventListener('mousemove', updatePosition);
      };
    }, []);
    
    useEffect(() => {
      setIsHovering(!!hoverText);
    }, [hoverText]);
    
    return (
      <div className="fixed top-0 left-0 z-50 pointer-events-none">
        <div 
          className={`rounded-full mix-blend-difference transition-all duration-300 ease-out ${isHovering ? 'bg-white w-20 h-20' : 'bg-white w-10 h-10'}`}
          style={{ 
            transform: `translate(${position.x - (isHovering ? 40 : 20)}px, ${position.y - (isHovering ? 40 : 20)}px)`,
            opacity: 0.8
          }}
        >
          {hoverText && (
            <div className="flex items-center justify-center h-full w-full text-black text-xs font-medium">
              {hoverText}
            </div>
          )}
        </div>
        <div 
          className="rounded-full bg-white absolute"
          style={{ 
            width: isHovering ? '10px' : '5px',
            height: isHovering ? '10px' : '5px',
            transform: `translate(${position.x - (isHovering ? 5 : 2.5)}px, ${position.y - (isHovering ? 5 : 2.5)}px)`,
            opacity: 0.5,
            transition: 'width 0.3s ease-out, height 0.3s ease-out'
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
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-white rounded-full" />
            <span className="text-white font-bold text-xl">React Noir Cursor</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {Object.keys(sectionRefs).map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors ${activeSection === section ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
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
        <div className="absolute inset-0 bg-[url('/api/placeholder/1000/1000')] opacity-5 bg-repeat"></div>
        <div className="container mx-auto px-6 py-24 flex flex-col items-center text-center z-10">
          <div className="relative mb-12">
            <div className="w-40 h-40 bg-purple-600 rounded-full blur-3xl absolute -z-10 opacity-20"></div>
            <div className="w-40 h-40 bg-blue-600 rounded-full blur-3xl absolute -z-10 opacity-20 translate-x-8"></div>
            <div className="w-20 h-20 bg-white rounded-full relative z-10"></div>
            <div className="w-6 h-6 bg-white rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">React Noir Cursor</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">A sleek, customizable cursor component that replaces the default browser cursor with a modern, animated alternative.</p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <button 
              onClick={() => scrollToSection('installation')}
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-colors"
              onMouseEnter={() => setHoverItem('Get Started')}
              onMouseLeave={() => setHoverItem(null)}
            >
              Get Started
            </button>
            <a 
              href="https://github.com/Arhaan-Siddiquee/react-noir-cursor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
              onMouseEnter={() => setHoverItem('View on GitHub')}
              onMouseLeave={() => setHoverItem(null)}
            >
              View on GitHub
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>
      
      {/* Installation Section */}
      <section 
        ref={sectionRefs.installation} 
        className="py-24 bg-black"
        id="installation"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12">Installation</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-medium text-white mb-4">Using npm</h3>
              <div className="relative">
                <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto">npm install react-noir-cursor</pre>
                <button 
                  onClick={() => copyToClipboard('npm install react-noir-cursor', 'npm')}
                  className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
                  onMouseEnter={() => setHoverItem('Copy Command')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.npm ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-400" />}
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-medium text-white mb-4">Using yarn</h3>
              <div className="relative">
                <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto">yarn add react-noir-cursor</pre>
                <button 
                  onClick={() => copyToClipboard('yarn add react-noir-cursor', 'yarn')}
                  className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
                  onMouseEnter={() => setHoverItem('Copy Command')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {copied.yarn ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-medium text-white mb-4">Peer Dependencies</h3>
            <p className="text-gray-300 mb-4">This package requires React (16.8+) and styled-components (5.0+) as peer dependencies.</p>
            <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto">npm install react styled-components<br/>yarn add react styled-components</pre>
          </div>
        </div>
      </section>
      
      {/* Usage Section */}
      <section 
        ref={sectionRefs.usage} 
        className="py-24 bg-gradient-to-b from-black to-gray-900"
        id="usage"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12">Usage</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-medium text-white mb-4">Basic Usage</h3>
              <p className="text-gray-300 mb-6">Wrap your component with a React Fragment and add the Cursor component:</p>
              <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto">
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
            
            <div>
              <h3 className="text-2xl font-medium text-white mb-4">With Hover Detection</h3>
              <p className="text-gray-300 mb-6">Add hover text that changes based on user interaction:</p>
              <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto">
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
            
            <div>
              <h3 className="text-2xl font-medium text-white mb-4">Advanced Customization</h3>
              <p className="text-gray-300 mb-6">Customize the appearance and behavior of the cursor:</p>
              <pre className="bg-gray-800 p-4 rounded-lg font-mono text-gray-300 overflow-x-auto">
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
        className="py-24 bg-gray-900"
        id="props"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12">Props Reference</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="px-6 py-4 text-gray-200">Prop</th>
                  <th className="px-6 py-4 text-gray-200">Type</th>
                  <th className="px-6 py-4 text-gray-200">Default</th>
                  <th className="px-6 py-4 text-gray-200">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">size</td>
                  <td className="px-6 py-4 text-gray-300">number</td>
                  <td className="px-6 py-4 text-gray-300">40</td>
                  <td className="px-6 py-4 text-gray-300">Base size of the cursor in pixels</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">color</td>
                  <td className="px-6 py-4 text-gray-300">string</td>
                  <td className="px-6 py-4 text-gray-300">'white'</td>
                  <td className="px-6 py-4 text-gray-300">Color of the cursor circle</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">opacity</td>
                  <td className="px-6 py-4 text-gray-300">number</td>
                  <td className="px-6 py-4 text-gray-300">0.8</td>
                  <td className="px-6 py-4 text-gray-300">Opacity of the cursor (0-1)</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">blendMode</td>
                  <td className="px-6 py-4 text-gray-300">string</td>
                  <td className="px-6 py-4 text-gray-300">'difference'</td>
                  <td className="px-6 py-4 text-gray-300">CSS mix-blend-mode property</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">hoverSize</td>
                  <td className="px-6 py-4 text-gray-300">number</td>
                  <td className="px-6 py-4 text-gray-300">80</td>
                  <td className="px-6 py-4 text-gray-300">Size when hovering over interactive elements</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">hoverText</td>
                  <td className="px-6 py-4 text-gray-300">string</td>
                  <td className="px-6 py-4 text-gray-300">null</td>
                  <td className="px-6 py-4 text-gray-300">Text to display when hovering</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">hoverTextColor</td>
                  <td className="px-6 py-4 text-gray-300">string</td>
                  <td className="px-6 py-4 text-gray-300">'black'</td>
                  <td className="px-6 py-4 text-gray-300">Color of hover text</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">hoverTextSize</td>
                  <td className="px-6 py-4 text-gray-300">number</td>
                  <td className="px-6 py-4 text-gray-300">12</td>
                  <td className="px-6 py-4 text-gray-300">Font size of hover text in pixels</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">innerScale</td>
                  <td className="px-6 py-4 text-gray-300">number</td>
                  <td className="px-6 py-4 text-gray-300">0.5</td>
                  <td className="px-6 py-4 text-gray-300">Scale of inner circle relative to main cursor (0-1)</td>
                </tr>
                <tr className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">transitionDuration</td>
                  <td className="px-6 py-4 text-gray-300">string</td>
                  <td className="px-6 py-4 text-gray-300">'0.3s'</td>
                  <td className="px-6 py-4 text-gray-300">CSS transition duration for animations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Examples Section */}
      <section 
        ref={sectionRefs.examples} 
        className="py-24 bg-gradient-to-b from-gray-900 to-black"
        id="examples"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12">Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">Basic Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={() => setHoverItem('View Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <Copy size={18} />
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 opacity-80"></div>
                  <p className="text-gray-300">Default cursor with basic settings</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto">
{`<Cursor />

// Additional settings:
// - size={40}
// - color="white"
// - opacity={0.8}
// - blendMode="difference"`}
              </pre>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">Interactive Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={() => setHoverItem('View Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <Copy size={18} />
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 opacity-80 flex items-center justify-center">
                    <span className="text-black text-sm">Click Me</span>
                  </div>
                  <p className="text-gray-300">Hover state with custom text</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto">
{`<Cursor 
  hoverText="Click Me"
  hoverSize={80}
  hoverTextColor="black"
  hoverTextSize={14}
/>`}
              </pre>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">Colored Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={() => setHoverItem('View Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <Copy size={18} />
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 opacity-80"></div>
                  <p className="text-gray-300">Custom colored cursor</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto">
{`<Cursor 
  color="#8B5CF6"
  blendMode="normal"
/>`}
              </pre>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">Custom Size Example</h3>
                <button 
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={() => setHoverItem('View Code')}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <Copy size={18} />
                </button>
              </div>
              <div className="h-64 relative bg-gradient-to-br from-gray-900 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 opacity-60"></div>
                  <p className="text-gray-300">Larger cursor with reduced opacity</p>
                </div>
              </div>
              <pre className="bg-gray-900 p-4 font-mono text-gray-300 text-sm overflow-x-auto">
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
        className="py-24 bg-black"
        id="about"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12">About the Author</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-6 overflow-hidden">
                  <img src="/api/placeholder/128/128" alt="Arhaan Siddiquee" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Arhaan Siddiquee</h3>
                <p className="text-gray-300 mb-6">Frontend Developer & UI/UX Enthusiast</p>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://github.com/Arhaan-Siddiquee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    onMouseEnter={() => setHoverItem('GitHub')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="https://x.com/ArhaanSiddique0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    onMouseEnter={() => setHoverItem('Twitter')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Twitter size={24} />
                  </a>
                  <a 
                    href="https://arhaan-dev.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    onMouseEnter={() => setHoverItem('Portfolio')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Globe size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-gray-900 rounded-xl p-8">
                <h3 className="text-2xl font-medium text-white mb-6">About This Project</h3>
                <p className="text-gray-300 mb-6">
                  React Noir Cursor was created to provide developers with an elegant, customizable cursor solution 
                  that enhances user experience with smooth animations and interactive hover states. 
                </p>
                <p className="text-gray-300 mb-6">
                  The goal was to create a performant, lightweight component that works seamlessly with React applications 
                  while offering extensive customization options to match any design system.
                </p>
                <p className="text-gray-300 mb-8">
                  This project is open source and available on GitHub. Contributions, issues, and feature requests 
                  are welcome!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/Arhaan-Siddiquee/react-noir-cursor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                    onMouseEnter={() => setHoverItem('View on GitHub')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Github size={18} />
                    <span>GitHub Repository</span>
                  </a>
                  <a 
                    href="https://arhaan-dev.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white hover:bg-opacity-10 transition-colors flex items-center space-x-2"
                    onMouseEnter={() => setHoverItem('View Portfolio')}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Globe size={18} />
                    <span>My Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-5 h-5 bg-white rounded-full" />
              <span className="text-white font-bold text-lg">React Noir Cursor</span>
            </div>
            
            <div className="flex space-x-8 mb-6 md:mb-0">
              {Object.keys(sectionRefs).map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${activeSection === section ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
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
                className="text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setHoverItem('GitHub')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Github size={20} />
              </a>
              <a 
                href="https://x.com/ArhaanSiddique0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setHoverItem('Twitter')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://arhaan-dev.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                onMouseEnter={() => setHoverItem('Portfolio')}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} React Noir Cursor. Created by Arhaan Siddiquee.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This project is open source under the MIT License.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;