'use client';
import React, { useState, useEffect } from 'react';
import { FolderOpen, Briefcase, PenTool, FileText, User, Mail, Minimize2, Maximize2, X } from 'lucide-react';
import Hero from './Hero';
import Projects from './Projects';
import Work from './Work';
import Blog from './Blog';
import Footer from './Footer';
import Blurb from './Blurb';
import RecentHighlights from './RecentHighlights';
import HackathonWins from './HackathonWins';
import OpenSourceContribution from '../work/OpenSourceContribution';
import BlogWidget from './BlogWidget';
import WeatherWidget from './WeatherWidget';
import NotesWidget from './NotesWidget';

interface AppWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  gridOffset?: number;
  left?: number;
  top?: number;
}

const OSDesktop = () => {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Loading overlay for initial welcome screen
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState<Date>(() => new Date());
  // Progress state for desktop-style loader
  const [progress, setProgress] = useState(6);
  // Whether to show the welcome/loading overlay (kept until progress finishes)
  const [showWelcome, setShowWelcome] = useState(true);
  // Keep a ref snapshot of progress so effects that run on isLoading can read
  // the current value without needing `progress` in their dependency arrays.
  const progressRef = React.useRef(progress);
  React.useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1300);
    const onLoad = () => setIsLoading(false);
    // Also clear loading when the window load event fires (fallback)
    window.addEventListener('load', onLoad);
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', onLoad);
      clearInterval(interval);
    };
  }, []);

  // Manage simulated progress for loader. We increment slowly while still loading
  // and finish to 100% when `isLoading` becomes false. We respect prefers-reduced-motion.
  useEffect(() => {
    let rafId: number | null = null;
    let iv: number | null = null;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Increment function (not used when reduced motion is preferred)
    const increment = () => {
      setProgress((p) => {
        if (p >= 88) return p; // hold near-complete until real load
        // small random bumps for a natural feel
        const next = p + (2 + Math.round(Math.random() * 3));
        return Math.min(88, next);
      });
      // continue
      rafId = requestAnimationFrame(() => setTimeout(increment, 200 + Math.random() * 300));
    };

    if (!prefersReduced) {
      // Start slow increments
      iv = window.setTimeout(() => increment(), 300);
    } else {
      // reduced motion: jump to a mid-value quickly
      setProgress(20);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (iv) clearTimeout(iv);
    };
  }, []);

  // When the real loading finishes, finish the progress to 100 and then hide overlay
  useEffect(() => {
    if (!isLoading) {
      const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setProgress(100);
        // hide quickly
        const t = setTimeout(() => setShowWelcome(false), 220);
        return () => clearTimeout(t);
      }

      // animate progress to 100 smoothly
      let start: number | null = null;
  const startProgress = progressRef.current;
      const duration = 600; // ms
      const step = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const pct = Math.min(1, elapsed / duration);
        const next = Math.round(startProgress + (100 - startProgress) * pct);
        setProgress(next);
        if (pct < 1) requestAnimationFrame(step);
        else {
          // give a small pause before removing overlay so the user sees 100%
          setTimeout(() => setShowWelcome(false), 220);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isLoading]);
  // Check for mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  

  const apps = React.useMemo(() => ([
    {
      id: 'about',
      title: 'About Me',
      icon: <User className="w-5 h-5" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Hero />
          <div className="mt-8">
            <Blurb />
          </div>
        </div>
      ),
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: <FileText className="w-5 h-5" />,
      component: (
        <div className="w-full h-full bg-white">
          <iframe
            src="/AmanPurohitResume2025.pdf"
            className="w-full h-full border-0 bg-white"
            allowFullScreen
            title="Aman Purohit Resume"
          />
        </div>
      ),
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <FolderOpen className="w-5 h-5" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Projects />
        </div>
      ),
    },
    {
      id: 'work',
      title: 'Experience',
      icon: <Briefcase className="w-5 h-5" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Work />
          <div className="mt-8">
            <OpenSourceContribution />
          </div>
        </div>
      ),
    },
    {
      id: 'blog',
      title: 'Blog',
      icon: <PenTool className="w-5 h-5" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Blog />
        </div>
      ),
    },
    {
      id: 'highlights',
      title: 'Highlights',
      icon: <FileText className="w-5 h-5" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <RecentHighlights />
          <div className="mt-8">
            <HackathonWins />
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <Mail className="w-5 h-5" />,
      component: (
        <div className="p-6 overflow-y-auto h-full">
          <Footer className="border-none mt-0" />
        </div>
      ),
    },
  ]), []);

  const openApp = React.useCallback((app: typeof apps[0]) => {
    // Use functional updates to avoid depending on `windows` or `highestZIndex` in the closure
    setWindows((prev) => {
      const existing = prev.find(w => w.id === app.id);
      if (existing) {
        // unminimize / keep existing window; zIndex will be updated below
        return prev.map(w => w.id === app.id ? { ...w, isMinimized: false } : w);
      }

      const windowCount = prev.length;
      const gridOffset = (windowCount % 5) * 40;
      const left = isMobile ? Math.round(window.innerWidth * 0.05) : 50 + gridOffset;
      const top = isMobile ? Math.round(window.innerHeight * 0.05) : 50 + gridOffset;

      return [...prev, {
        ...app,
        isMinimized: false,
        isMaximized: isMobile,
        zIndex: 0, // assigned below when we bump highestZIndex
        gridOffset,
        left,
        top,
      }];
    });

    // bump global z-index and assign to the opened app
    setHighestZIndex((prev) => {
      const newZ = prev + 1;
      setWindows((prevWindows) => prevWindows.map(w => w.id === app.id ? { ...w, zIndex: newZ } : w));
      return newZ;
    });
  }, [isMobile]);

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const bringToFront = (id: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
  };

  // When clicking an item in the dock/taskbar, open the in-app window (openApp).
  // This ensures a consistent windowed experience; desktop icons can still open
  // routes in a new tab if desired (handled separately by DesktopIcons).
  const handleDockClick = (app: typeof apps[0]) => {
    openApp(app);
  };

  // Handle hash navigation (run on mount). apps is memoized and openApp is stable
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const app = apps.find(a => a.id === hash || (a.id === 'about' && hash === 'about'));
      if (app) setTimeout(() => openApp(app), 500);
    }
  }, [apps, openApp]);

  // Dragging state for windows
  const draggingWindowRef = React.useRef<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  React.useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingWindowRef.current) return;
      const { id, offsetX, offsetY } = draggingWindowRef.current;
      const nx = e.clientX - offsetX;
      const ny = e.clientY - offsetY;
      setWindows(prev => prev.map(w => w.id === id ? { ...w, left: nx, top: ny } : w));
    };

    const onPointerUp = () => {
      draggingWindowRef.current = null;
      document.body.style.cursor = '';
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // Ensure resume appears first in the dock regardless of apps array order
  const dockApps = apps.slice().sort((a, b) => {
    if (a.id === 'resume') return -1;
    if (b.id === 'resume') return 1;
    return 0;
  });

  // find resume app for mobile quick access
  const resumeApp = apps.find(a => a.id === 'resume');

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-950 via-sky-800 to-sky-950 relative">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-texture" />
      </div>
      {/* Mobile quick-access resume button (pinned bottom-left) */}
      {isMobile && resumeApp && (
        <div className="absolute left-4 bottom-4 z-60 md:hidden pointer-events-auto">
          <button
            onClick={() => handleDockClick(resumeApp)}
            title="Resume"
            className="p-3 rounded-full bg-background/80 shadow-lg border border-border/40"
          >
            <div className="w-5 h-5 text-foreground">{resumeApp.icon}</div>
          </button>
        </div>
      )}

      {/* Welcome / Loading Overlay (desktop-style solid loader window) */}
      <div
        onClick={() => { setIsLoading(false); setShowWelcome(false); }}
        className={`absolute inset-0 z-[70] flex items-center justify-center bg-background/60 transition-all duration-500 ${
          showWelcome ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!showWelcome}
      >
        {/* Centered solid loader panel that resembles a desktop window */}
        <div
          role="status"
          aria-live="polite"
          className="w-[min(92vw,540px)] mx-4 bg-background/95 text-foreground rounded-lg shadow-2xl ring-1 ring-border/30 overflow-hidden"
        >
          {/* Title bar with control dots */}
          <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden />
                <span className="w-3 h-3 rounded-full bg-amber-400" aria-hidden />
                <span className="w-3 h-3 rounded-full bg-emerald-400" aria-hidden />
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-white/90" />
                {/* <span className="text-sm font-medium">my portfolio</span> */}
              </div>
            </div>
            <div className="text-xs text-white/60">Initializing…</div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Loading OS</h3>
                <p className="text-sm text-muted-foreground"></p>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="w-full h-3 bg-border/10 rounded overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-sky-400 to-sky-500 rounded transition-[width] ease-out"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    aria-label="Loading progress"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{progress < 100 ? `${progress}%` : 'Done'}</span>
                  <span>{isLoading ? 'Loading…' : 'Almost there'}</span>
                </div>
              </div>

              {/* Small hint to dismiss */}
              {/* <div className="text-[11px] text-muted-foreground">Click anywhere to skip</div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {/* Top status bar: time and day
          - On small screens position at top-right and only show time to save space
          - On md+ center it with date visible */}
      <div className="absolute top-3 right-3 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-background/70 backdrop-blur rounded-full px-3 md:px-4 py-1 text-foreground text-sm shadow-md flex items-center gap-3 pointer-events-auto">
          <div className="font-medium text-sm md:text-base">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="hidden md:block text-xs text-muted-foreground">{now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</div>
        </div>
      </div>
      <div className="absolute inset-0 pb-16">
        {/* Desktop icons (shortcuts) - draggable */}
        {/* We'll render icons from state so they can be moved and persisted */}
        <DesktopIcons
          apps={apps}
          openApp={openApp}
          isMobile={isMobile}
        />

        {/* Left widget column (top-left) - only visible when no windows are open */}
        {windows.length === 0 && (
          <div className="hidden md:flex flex-col gap-3 absolute left-6 top-6 z-30 pointer-events-auto">
            <WeatherWidget />
            <NotesWidget />
            {/* <QuickLinksWidget /> */}
          </div>
        )}
        {windows.map((win) => (
          <div
            key={win.id}
            className={`absolute bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-2xl transition-all duration-200 ${
              win.isMinimized ? 'hidden' : ''
            } ${
              win.isMaximized ? 'inset-4 !top-4 !bottom-20' : ''
            }`}
            style={{
              zIndex: win.zIndex,
              left: win.isMaximized ? undefined : (typeof win.left === 'number' ? `${win.left}px` : (isMobile ? '5%' : `${50 + (win.gridOffset || 0)}px`)),
              top: win.isMaximized ? undefined : (typeof win.top === 'number' ? `${win.top}px` : (isMobile ? '5%' : `${50 + (win.gridOffset || 0)}px`)),
              width: win.isMaximized ? undefined : isMobile ? '95%' : 'min(800px, 80vw)',
              height: win.isMaximized ? undefined : isMobile ? '90%' : 'min(600px, 70vh)',
            }}
            onClick={() => bringToFront(win.id)}
          >
            {/* Window Title Bar */}
            <div
              className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/30 rounded-t-lg"
              onPointerDown={(e) => {
                // start dragging from title bar
                if (win.isMaximized || win.isMinimized) return;
                e.stopPropagation();
                // bring to front
                bringToFront(win.id);
                const rectLeft = win.left ?? (isMobile ? Math.round(window.innerWidth * 0.05) : 50 + (win.gridOffset || 0));
                const rectTop = win.top ?? (isMobile ? Math.round(window.innerHeight * 0.05) : 50 + (win.gridOffset || 0));
                // capture pointer
                (e.target as Element).setPointerCapture?.(e.pointerId);
                draggingWindowRef.current = {
                  id: win.id,
                  offsetX: e.clientX - rectLeft,
                  offsetY: e.clientY - rectTop,
                };
                document.body.style.cursor = 'grabbing';
              }}
            >
              <div className="flex items-center gap-2">
                {win.icon}
                <span className="text-sm font-medium">{win.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(win.id);
                  }}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    maximizeWindow(win.id);
                  }}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(win.id);
                  }}
                  className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="h-[calc(100%-40px)] overflow-hidden">
              {win.component}
            </div>
          </div>
        ))}
      </div>

      {/* Floating iOS-like Dock */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 w-[min(96vw,900px)] sm:w-[min(92vw,820px)] pointer-events-auto z-50">
        <div className="mx-auto bg-background/80 backdrop-blur-lg rounded-3xl px-3 py-2 shadow-2xl border border-white/6">
          <div className="overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center justify-center gap-2 w-full px-1">
              {dockApps.map((app) => {
                const isOpen = windows.some(w => w.id === app.id);
                return (
                  <button
                    key={app.id}
                    onClick={() => handleDockClick(app)}
                    className={`flex-shrink-0 inline-flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-transform hover:scale-110 active:scale-95 ${isOpen ? 'scale-110' : ''}`}
                    title={app.title}
                  >
                    <div className="p-2 rounded-full bg-background/60">
                      {app.icon}
                    </div>
                    <span className="text-[11px] sm:text-xs text-muted-foreground truncate max-w-[76px] block mt-1">{app.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      {/* Start Message + Home Widget */}
      {windows.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 text-white/80 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Aman Purohit</h1>
            <p className="text-xs sm:text-base md:text-lg font-thin"> Software Engineer | GenAI Creator | Open Source Contributor</p>
          </div>

          {/* home screen file tiles are rendered by DesktopIcons (draggable) */}

          {/* Blog widget - top-right on desktop, bottom-center on small screens */}
          <div className="absolute top-6 right-6 md:right-12 md:top-8 pointer-events-auto hidden md:block">
            <BlogWidget />
          </div>

          {/* Blog widget hidden on mobile - only show on md+ (top-right) */}
        </div>
      )}
    </div>
  );
};

export default OSDesktop;

// Draggable desktop icons helper component
// Types for DesktopIcons
type DesktopApp = { id: string; title: string; icon: React.ReactElement; component: React.ReactElement };
type IconItem = { id: string; title: string; appId: string; left?: number; top?: number };

function DesktopIcons({ apps, openApp, isMobile }: { apps: DesktopApp[]; openApp: (app: DesktopApp) => void; isMobile?: boolean }) {
  const initial: IconItem[] = [
    {
      id: 'resume',
      title: 'Resume',
      appId: 'resume',
    },
  ];

  // Avoid rendering desktop icons during SSR / before hydration to prevent
  // mismatches between server and client (localStorage and window are client-only).
  const [mounted, setMounted] = useState(false);
  const [icons, setIcons] = useState<IconItem[]>(initial);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem('desktopIcons');
      if (raw) {
        setIcons(JSON.parse(raw));
        return;
      }
    } catch {
      // ignore
    }

    // If no saved positions, compute centered defaults on first mount
    const ICON_W = 80;
    const ICON_H = 120;
    const centerLeft = Math.round((window.innerWidth - ICON_W) / 2);
    const topStart = 160;
    setIcons(prev => prev.map((ic, idx) => ({
      ...ic,
      left: Math.round(centerLeft),
      top: Math.round(topStart + idx * (ICON_H + 16)),
    })));
  }, []);

  const draggingRef = React.useRef<{ id: string; startX: number; startY: number; offsetX: number; offsetY: number } | null>(null);
  const movedRef = React.useRef(false);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('desktopIcons', JSON.stringify(icons));
    } catch {}
  }, [icons, mounted]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const { id, offsetX, offsetY } = draggingRef.current;
      // Compute new position and clamp to viewport bounds
      const rawX = e.clientX - offsetX;
      const rawY = e.clientY - offsetY;
      const ICON_W = 80; // matches w-20
      const ICON_H = 120; // approximate height including label
      const minX = 0;
      const minY = 0;
      const maxX = Math.max(0, window.innerWidth - ICON_W);
      const maxY = Math.max(0, window.innerHeight - ICON_H - 80); // leave some room for taskbar
      const nx = Math.min(maxX, Math.max(minX, Math.round(rawX)));
      const ny = Math.min(maxY, Math.max(minY, Math.round(rawY)));
      setIcons((prev: IconItem[]) => prev.map((ic: IconItem) => (ic.id === id ? { ...ic, left: nx, top: ny } : ic)));
      movedRef.current = true;
    };

    const handlePointerUp = () => {
      if (draggingRef.current) {
        // Snap the dragged icon to grid and clamp to viewport
        const didId = draggingRef.current.id;
        const GRID = 16;
        const ICON_W = 80;
        const ICON_H = 120;
        const minX = 0;
        const minY = 0;
        const maxX = Math.max(0, window.innerWidth - ICON_W);
        const maxY = Math.max(0, window.innerHeight - ICON_H - 80);
        setIcons(prev => prev.map((ic: IconItem) => {
          if (ic.id !== didId) return ic;
          const left = Math.round((ic.left ?? 0) / GRID) * GRID;
          const top = Math.round((ic.top ?? 0) / GRID) * GRID;
          const clampedLeft = Math.min(maxX, Math.max(minX, left));
          const clampedTop = Math.min(maxY, Math.max(minY, top));
          return { ...ic, left: clampedLeft, top: clampedTop };
        }));
        draggingRef.current = null;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent, icon: IconItem) => {
    // prevent text/image drag
    (e.target as Element).setPointerCapture?.(e.pointerId);
    movedRef.current = false;
    const rectX = icon.left ?? 0;
    const rectY = icon.top ?? 0;
    draggingRef.current = {
      id: icon.id,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rectX,
      offsetY: e.clientY - rectY,
    };
  };

  const onClickIcon = (icon: IconItem) => {
    // if it was moved recently, don't open
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    // Prefer opening a dedicated route in a new browser tab for common desktop icons.
    const ROUTES: Record<string, string> = {
      resume: '/resume',
      blog: '/blog',
      projects: '/projects',
      work: '/work',
      about: '/',
    };

    const route = ROUTES[icon.appId];
    if (route) {
      // open in a new tab
      window.open(route, '_blank');
      return;
    }

    const app = apps.find((a) => a.id === icon.appId);
    if (app) openApp(app);
  };

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none ">
      {icons
        .filter((icon) => !(isMobile && icon.id === 'resume'))
        .map((icon: IconItem) => (
        <div
          key={icon.id}
          onPointerDown={(e) => onPointerDown(e, icon)}
          onClick={() => onClickIcon(icon)}
          style={{ left: icon.left, top: icon.top, position: 'fixed' as const, zIndex: 60 }}
          className="w-20 cursor-grab touch-none"
        >
          <div className="flex flex-col items-center gap-2 w-20 p-2 rounded hover:bg-white/5 transition-colors" style={{ pointerEvents: 'auto', userSelect: 'none', touchAction: 'none' }}>
            <div className="p-2 rounded bg-background/60 border border-border/40">
              <FileText className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xs text-muted-foreground text-center">{icon.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
