'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { HudLabel } from '@/components/ui/HudLabel';
import { StatusLED } from '@/components/ui/StatusLED';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CURRENT_USER } from '@/lib/mock-data';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Briefcase,
  Users,
  Compass,
  Trophy,
  Bot,
  Clock,
  Shield,
  Search,
  Command,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Plus,
  Flame,
  CheckCircle,
  X,
  Menu,
} from 'lucide-react';
import { toast } from 'sonner';

interface NavItem {
  name: string;
  href: string;
  hud: string;
  icon: React.ReactNode;
  badge?: string;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', hud: '01', icon: <LayoutDashboard className="w-4 h-4" /> },
  { name: 'Study Materials', href: '/materials', hud: '02', icon: <FileText className="w-4 h-4" /> },
  { name: 'Events', href: '/events', hud: '03', icon: <Calendar className="w-4 h-4" /> },
  { name: 'Announcements', href: '/announcements', hud: '04', icon: <Bell className="w-4 h-4" />, badge: '1' },
  { name: 'Opportunities', href: '/opportunities', hud: '05', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Network', href: '/network', hud: '06', icon: <Users className="w-4 h-4" /> },
  { name: 'Skill Match', href: '/match', hud: '07', icon: <Compass className="w-4 h-4" />, badge: 'AI' },
  { name: 'Leaderboard', href: '/leaderboard', hud: '08', icon: <Trophy className="w-4 h-4" /> },
  { name: 'N.O.V.A Assistant', href: '/assistant', hud: '09', icon: <Bot className="w-4 h-4" /> },
  { name: 'Attendance', href: '/attendance', hud: '10', icon: <Clock className="w-4 h-4" /> },
  { name: 'Admin / Moderation', href: '/admin', hud: '11', icon: <Shield className="w-4 h-4" />, adminOnly: true },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  // Global Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickAction = (route: string, label: string) => {
    setCmdOpen(false);
    toast.info(`Navigating to ${label}...`);
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col md:flex-row font-body">
      {/* 1. Desktop Collapsible Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between border-r border-zinc-900 bg-zinc-950/90 backdrop-blur-md transition-all duration-300 z-30 sticky top-0 h-screen ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Logo & Collapse button */}
          <div className="flex items-center justify-between">
            {!collapsed && <Logo className="text-white" />}
            {collapsed && (
              <span className="font-mono text-signal text-xl font-bold mx-auto">✱</span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              title="Toggle Sidebar"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick HUD summary */}
          {!collapsed && (
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-signal">
                <Flame className="w-4 h-4 fill-signal" />
                <span className="font-bold">{CURRENT_USER.streak}d Streak</span>
              </div>
              <span className="text-acid font-bold">LVL {CURRENT_USER.level}</span>
            </div>
          )}

          {/* Nav Items List */}
          <nav className="space-y-1">
            {NAV_ITEMS.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono transition-all group ${
                    active
                      ? 'bg-signal/15 text-signal border border-signal/30 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                  title={item.name}
                >
                  <span className={`${active ? 'text-signal' : 'text-zinc-400 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-signal text-white font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile Card Bottom Footer */}
        <div className="p-4 border-t border-zinc-900">
          <Link
            href={`/u/${CURRENT_USER.username}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={CURRENT_USER.avatarUrl}
              alt={CURRENT_USER.fullName}
              className="w-8 h-8 rounded-full border border-signal object-cover"
            />
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-white truncate">{CURRENT_USER.fullName}</div>
                <div className="text-[10px] font-mono text-zinc-500 truncate">@{CURRENT_USER.username}</div>
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-black/80 backdrop-blur-md border-b border-zinc-900">
          {/* Search Trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono hover:border-zinc-700 transition-colors w-48 sm:w-72 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <span className="truncate">Search notes, events, peers...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-zinc-800 rounded text-zinc-400">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Right actions: Bell, Theme, Profile */}
          <div className="flex items-center gap-3">
            {/* Realtime Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-white transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-signal animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-signal" />
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-4 font-mono text-xs z-50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="font-bold text-white uppercase tracking-wider">REALTIME NOTIFICATIONS</span>
                    <span className="text-[10px] text-acid">1 UNREAD</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 space-y-1">
                      <div className="flex items-center justify-between text-signal text-[11px] font-bold">
                        <span>EXAM TIMETABLE RELEASED</span>
                        <span className="text-[10px] text-zinc-500">2h ago</span>
                      </div>
                      <p className="text-zinc-300 text-[11px]">
                        End-semester examination schedule for Odd 2026 published by Dean.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/50 space-y-1 opacity-70">
                      <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                        <span>EVENT CONFIRMATION</span>
                        <span className="text-[10px] text-zinc-500">1d ago</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">
                        Your ticket for HackGrid 2026 was confirmed. QR code issued.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/announcements"
                    onClick={() => setNotifOpen(false)}
                    className="block text-center text-[11px] text-signal hover:underline pt-1"
                  >
                    View All Broadcasts &rarr;
                  </Link>
                </div>
              )}
            </div>

            <ThemeToggle />

            <Link
              href={`/u/${CURRENT_USER.username}`}
              className="flex items-center gap-2 p-1 pl-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-signal transition-colors"
            >
              <span className="text-xs font-mono font-bold text-acid hidden sm:inline">
                LVL {CURRENT_USER.level}
              </span>
              <img
                src={CURRENT_USER.avatarUrl}
                alt={CURRENT_USER.fullName}
                className="w-6 h-6 rounded-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* 3. Mobile Bottom Tab Bar (Safe Area Aware) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-zinc-800 px-3 py-2 flex items-center justify-around backdrop-blur-md">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-mono ${
            pathname === '/dashboard' ? 'text-signal' : 'text-zinc-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/materials"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-mono ${
            pathname === '/materials' ? 'text-signal' : 'text-zinc-400'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Notes</span>
        </Link>
        <Link
          href="/events"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-mono ${
            pathname === '/events' ? 'text-signal' : 'text-zinc-400'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Events</span>
        </Link>
        <Link
          href="/match"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-mono ${
            pathname === '/match' ? 'text-signal' : 'text-zinc-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Match</span>
        </Link>
        <Link
          href="/attendance"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-mono ${
            pathname === '/attendance' ? 'text-signal' : 'text-zinc-400'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Attend</span>
        </Link>
      </nav>

      {/* 4. Global Command Palette Modal (Ctrl/Cmd+K) */}
      {cmdOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-4 font-mono text-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
              <Search className="w-4 h-4 text-signal" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search all campus entities..."
                value={cmdQuery}
                onChange={e => setCmdQuery(e.target.value)}
                className="w-full bg-transparent text-white font-mono text-sm focus:outline-none"
              />
              <button onClick={() => setCmdOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">QUICK ACTIONS</span>
              <button
                onClick={() => handleQuickAction('/materials', 'Upload Study Notes')}
                className="w-full p-2.5 rounded-xl hover:bg-zinc-900 flex items-center justify-between text-left text-zinc-300"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan" />
                  <span>Upload Study Material / Lecture Notes</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">↵ Jump</span>
              </button>
              <button
                onClick={() => handleQuickAction('/events', 'Browse Hackathons')}
                className="w-full p-2.5 rounded-xl hover:bg-zinc-900 flex items-center justify-between text-left text-zinc-300"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-acid" />
                  <span>Discover Campus Hackathons &amp; Events</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">↵ Jump</span>
              </button>
              <button
                onClick={() => handleQuickAction('/assistant', 'Ask N.O.V.A AI')}
                className="w-full p-2.5 rounded-xl hover:bg-zinc-900 flex items-center justify-between text-left text-zinc-300"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-signal" />
                  <span>Query N.O.V.A Voice &amp; Campus Assistant</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">↵ Jump</span>
              </button>
              <button
                onClick={() => handleQuickAction('/attendance', 'Attendance Guardian')}
                className="w-full p-2.5 rounded-xl hover:bg-zinc-900 flex items-center justify-between text-left text-zinc-300"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ultra" />
                  <span>Calculate Safe Bunks &amp; Recovery Classes</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">↵ Jump</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
