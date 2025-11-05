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
  // Check for mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle hash navigation on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const app = apps.find(a => a.id === hash || a.id === 'about' && hash === 'about');
      if (app) {
        setTimeout(() => openApp(app), 500);
      }
    }
  }, []);

  const apps = [
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
  ];

  const openApp = (app: typeof apps[0]) => {
    const existingWindow = windows.find(w => w.id === app.id);
    
    if (existingWindow) {
      // Bring to front and unminimize
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      setWindows(windows.map(w => 
        w.id === app.id 
          ? { ...w, isMinimized: false, zIndex: newZIndex }
          : w
      ));
    } else {
      // Create new window
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      
      // Calculate position in a grid pattern to avoid off-screen
      const windowCount = windows.length;
      const gridOffset = (windowCount % 5) * 40; // Cycle through 5 positions
      
      // Compute pixel positions (fallback to px offsets)
      const left = isMobile ? Math.round(window.innerWidth * 0.05) : 50 + gridOffset;
      const top = isMobile ? Math.round(window.innerHeight * 0.05) : 50 + gridOffset;

      setWindows([...windows, {
        ...app,
        isMinimized: false,
        isMaximized: isMobile, // Auto-maximize on mobile
        zIndex: newZIndex,
        gridOffset,
        left,
        top,
      }]);
    }
  };

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

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-black-900 to-black-900 relative">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-texture" />
      </div>

      {/* Welcome / Loading Overlay */}
      <div
        onClick={() => setIsLoading(false)}
        className={`absolute inset-0 z-[70] flex items-center justify-center bg-black/80 text-white transition-all duration-700 ${
          isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="text-center space-y-2 px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Loading Aman&#39;s OS...</h2>
          <p className="text-sm text-white/80">Preparing your desktop…</p>
        </div>
      </div>

      {/* Windows */}
      {/* Top status bar: time and day */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-background/70 backdrop-blur rounded-full px-4 py-1 text-white/90 text-sm shadow-md flex items-center gap-3 pointer-events-auto">
          <div className="font-medium">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-xs text-white/80">{now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</div>
        </div>
      </div>
      <div className="absolute inset-0 pb-16">
        {/* Desktop icons (shortcuts) - draggable */}
        {/* We'll render icons from state so they can be moved and persisted */}
        <DesktopIcons
          apps={apps}
          openApp={openApp}
        />
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

function DesktopIcons({ apps, openApp }: { apps: DesktopApp[]; openApp: (app: DesktopApp) => void }) {
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
      {icons.map((icon: IconItem) => (
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
