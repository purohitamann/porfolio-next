'use client';
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Newspaper, Zap, MessageCircle, FileText } from 'lucide-react';
import blogData from '../../data/blog.json';
import Image from 'next/image';
import Hero from './Hero';
import Projects from './Projects';
import Work from './Work';
import Blog from './Blog';
import Footer from './Footer';
import Blurb from './Blurb';
import RecentHighlights from './RecentHighlights';
import HackathonWins from './HackathonWins';
import OpenSourceContribution from '../work/OpenSourceContribution';

interface App {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  color: string;
}

const IOSDesktop = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [battery, setBattery] = useState(100);
  const [openApp, setOpenApp] = useState<App | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const blogPosts = blogData.posts;

useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Get battery level with fallback
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBattery(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBattery(Math.round(battery.level * 100));
        });
      }).catch(() => {
        // Fallback to static 100% if battery API fails
        setBattery(100);
      });
    }

    return () => clearInterval(timer);
  }, []);

  // Auto-advance blog slideshow
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [blogPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const apps: App[] = [
    {
      id: 'about',
      title: 'About',
      icon: <Sparkles className="w-8 h-8" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Hero />
          <div className="mt-8"><Blurb /></div>
        </div>
      ),
      color: 'from-slate-600 to-slate-700',
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <Zap className="w-8 h-8" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Projects />
        </div>
      ),
      color: 'from-indigo-600 to-indigo-700',
    },
    {
      id: 'work',
      title: 'Work',
      icon: <Calendar className="w-8 h-8" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Work />
          <div className="mt-8"><OpenSourceContribution /></div>
        </div>
      ),
      color: 'from-amber-600 to-amber-700',
    },
    {
      id: 'blog',
      title: 'Blog',
      icon: <Newspaper className="w-8 h-8" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Blog />
        </div>
      ),
      color: 'from-rose-600 to-rose-700',
    },
    {
      id: 'highlights',
      title: 'Highlights',
      icon: <Sparkles className="w-8 h-8" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <RecentHighlights />
          <div className="mt-8"><HackathonWins /></div>
        </div>
      ),
      color: 'from-emerald-600 to-emerald-700',
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <MessageCircle className="w-8 h-8" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Footer className="border-none mt-0" />
        </div>
      ),
      color: 'from-cyan-600 to-cyan-700',
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: <FileText className="w-8 h-8" />,
      component: (
        <div className="w-full h-full">
          <iframe 
            src="/AmanPurohitResume2025.pdf"
            className="w-full h-full border-0"
            title="Aman Purohit Resume"
          />
        </div>
      ),
      color: 'from-teal-600 to-teal-700',
    },
  ];

  const handleAppClick = (app: App) => {
    setOpenApp(app);
  };

  const handleCloseApp = () => {
    setOpenApp(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* iOS Wallpaper - Dark Theme with Animation */}
      <div className="absolute inset-0">
        {/* Pixelated pattern background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f46e5' fill-opacity='0.4'%3E%3Cpath d='M0 0h10v10H0V0zm20 0h10v10H20V0zm20 0h10v10H40V0zm0 20h10v10H40V20zm20-20h10v10H60V0zm0 20h10v10H60V20zM0 20h10v10H0V20zm20 20h10v10H20V40zm-20 0h10v10H0V40zm40 0h10v10H40V40zM20 60h10v10H20V60zm20 0h10v10H40V60z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
            imageRendering: 'pixelated'
          }}
        />
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-gradient-shift" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.25) 0%, transparent 50%)'
          }} />
        </div>
        
        {/* Depth layers with shadows */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl" />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '139, 92, 246'}, ${Math.random() * 0.3 + 0.1})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-xl z-50">
        <div className="h-full flex items-center justify-between px-6 text-white text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Aman's OS</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{battery}%</span>
            <div className="w-6 h-3 border-2 border-white rounded-sm relative">
              <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-1 h-2 bg-white rounded-r" />
              <div 
                className="h-full bg-white rounded-sm transition-all"
                style={{ width: `${battery}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Home Screen */}
      {!openApp && (
        <div className="absolute inset-0 pt-12 pb-32 px-6">
          {/* Date Widget */}
          <div className="text-center text-white mb-8 mt-16">
            <div className="text-xl font-medium opacity-90">{currentDate}</div>
          </div>

          {/* Blog Slideshow Widget */}
          <div className="mb-8 mx-auto max-w-lg px-4">
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 relative">
              <div className="h-72 bg-black relative">
                {blogPosts.map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    className={`absolute inset-0 transition-all duration-500 cursor-pointer group ${
                      index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    {/* Blog Image */}
                    {post.featuredImages && post.featuredImages[0] && (
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src={post.featuredImages[0]}
                          alt={post.title}
                          fill
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      </div>
                    )}
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <span className="text-white/90 text-xs font-medium px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full w-fit mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-white text-lg font-bold line-clamp-1 drop-shadow-lg text-left">
                        {post.title}
                      </h3>
                      <p className="text-white/90 text-xs mt-1 line-clamp-1 drop-shadow-md text-left">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-white/70 text-xs mt-2">
                        <span>{post.readTime}</span>
                        <span>{post.timePosted}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-2 py-4 bg-gray-900/40">
                {blogPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* App Icons Grid */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-2xl mx-auto px-2">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[22%] bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-xl transform transition-all duration-200 group-hover:scale-110 group-active:scale-95`}>
                  {app.icon}
                </div>
                <span className="text-white text-xs font-medium text-center drop-shadow-lg">
                  {app.title}
                </span>
              </button>
            ))}
          </div>

          {/* Portfolio Name */}
          <div className="absolute bottom-40 left-0 right-0 text-center">
            {/* <div className="text-white/80 text-sm font-medium">Aman Purohit's Portfolio</div> */}
          </div>
        </div>
      )}

      {/* Backdrop Blur Overlay */}
      {openApp && (
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in z-40"
          onClick={handleCloseApp}
        />
      )}

      {/* Opened App Window */}
      {openApp && (
        <div className="absolute inset-0 pt-12 pb-4 px-4 flex items-center justify-center z-50 pointer-events-none">
          <div 
            className="w-full max-w-4xl h-full bg-background/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-scale-up pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* App Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-border/20 bg-gradient-to-b from-background/80 to-background/60">
              <button
                onClick={handleCloseApp}
                className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
              >
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
              </button>
              <h1 className="text-lg font-semibold">{openApp.title}</h1>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>

            {/* App Content */}
            <div className="h-[calc(100%-4rem)] overflow-y-auto">
              {openApp.component}
            </div>
          </div>
        </div>
      )}

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
    </div>
  );
};

export default IOSDesktop;
