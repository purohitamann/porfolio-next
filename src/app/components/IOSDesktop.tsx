'use client';
import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Newspaper, Zap, MessageCircle, FileText } from 'lucide-react';
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

    // Get battery level with fallback (use BatteryManager shape)
    try {
      const nav = navigator as unknown as {
        getBattery?: () => Promise<{ level: number; addEventListener: (type: string, cb: () => void) => void }>;
      };
      if (nav.getBattery) {
        nav.getBattery()
          .then((bat) => {
            setBattery(Math.round(bat.level * 100));
            bat.addEventListener('levelchange', () => {
              setBattery(Math.round(bat.level * 100));
            });
          })
          .catch(() => setBattery(100));
      }
    } catch {
      // If anything fails, default to 100
      setBattery(100);
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
      {/* iOS Wallpaper Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black">
        {/* Mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 10% 20%, rgba(75, 85, 99, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(55, 65, 81, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(31, 41, 55, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 10%, rgba(75, 85, 99, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 20% 90%, rgba(55, 65, 81, 0.15) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Animated gradient layer */}
        <div className="absolute inset-0 opacity-30 animate-gradient-shift">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 30% 40%, rgba(75, 85, 99, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 60%, rgba(55, 65, 81, 0.12) 0%, transparent 60%)
              `
            }}
          />
        </div>
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-xl z-50">
        <div className="h-full flex items-center justify-between px-6 text-white text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Aman&apos;s OS</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{battery}%</span>
            <span className="hidden sm:inline">{currentTime}</span>
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
