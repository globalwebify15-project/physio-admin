'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  PhoneCall, 
  Info, 
  Truck, 
  AlertTriangle, 
  UserX,
  ChevronUp,
  X,
  Compass,
  Download,
  Phone
} from 'lucide-react';

interface NavItem {
  slug: string;
  label: string;
  iconName: string;
  desc: string;
}

const ITEMS: NavItem[] = [
  { slug: 'privacy', label: 'Privacy Policy', iconName: 'ShieldCheck', desc: 'HIPAA & DISHA compliance & data safety' },
  { slug: 'terms', label: 'Terms & Conditions', iconName: 'FileText', desc: 'Patient agreement & clinical rules' },
  { slug: 'refund-policy', label: 'Refund & Cancellation', iconName: 'RotateCcw', desc: '7-day 100% money-back guarantee' },
  { slug: 'contact-us', label: 'Contact Us', iconName: 'PhoneCall', desc: 'Synergy Hospital helpline & location' },
  { slug: 'about-us', label: 'About Us', iconName: 'Info', desc: 'Clinical leadership & therapists' },
  { slug: 'shipping-delivery-policy', label: 'Service Delivery', iconName: 'Truck', desc: 'Clinic & home session timelines' },
  { slug: 'medical-disclaimer', label: 'Medical Disclaimer', iconName: 'AlertTriangle', desc: 'Clinical advice & treatment scope' },
  { slug: 'delete-account', label: 'Delete Account', iconName: 'UserX', desc: 'Permanent record removal request' },
];

function getIcon(name: string, size = 16) {
  switch (name) {
    case 'ShieldCheck': return <ShieldCheck size={size} />;
    case 'FileText': return <FileText size={size} />;
    case 'RotateCcw': return <RotateCcw size={size} />;
    case 'PhoneCall': return <PhoneCall size={size} />;
    case 'Info': return <Info size={size} />;
    case 'Truck': return <Truck size={size} />;
    case 'AlertTriangle': return <AlertTriangle size={size} />;
    case 'UserX': return <UserX size={size} />;
    default: return <Compass size={size} />;
  }
}

export default function MobileComplianceCapsule({ activeSlug }: { activeSlug: string }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const currentItem = ITEMS.find(
    (i) => i.slug === activeSlug || (i.slug === 'privacy' && activeSlug === 'privacy-policy')
  ) || ITEMS[0];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;

      // Always show when near the very top of the page
      if (currentScrollY < 80) {
        setIsVisible(true);
      } 
      // Scrolling down -> smoothly hide
      else if (scrollDiff > 8 && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Scrolling up -> smoothly reveal
      else if (scrollDiff < -8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Clear existing timer and ensure capsule shows if user stops scrolling for a moment
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        // Keep visible when user is actively pausing reading
        setIsVisible(true);
      }, 1200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Floating Bottom Capsule Dock (Mobile Only) */}
      <div 
        className={`fixed bottom-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none lg:hidden transition-all duration-300 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 pl-3.5 pr-2 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-teal-950/60 text-white">
          {/* Active Policy Trigger */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-left focus:outline-none"
            aria-label="Open policies menu"
          >
            <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center shrink-0">
              {getIcon(currentItem.iconName, 15)}
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider leading-none">
                Compliance
              </span>
              <span className="text-xs font-extrabold text-white leading-tight truncate max-w-[140px]">
                {currentItem.label}
              </span>
            </div>
          </button>

          <div className="w-px h-5 bg-white/20 mx-0.5" />

          {/* Quick Browse Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold shadow-sm transition-colors cursor-pointer"
          >
            <span>All Pages</span>
            <ChevronUp size={13} className="text-teal-200" />
          </button>
        </div>
      </div>

      {/* Capsule Bottom Sheet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setIsModalOpen(false)} 
          />

          {/* Modal Sheet */}
          <div className="relative bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl p-5 pb-8 max-h-[85vh] overflow-y-auto animate-slide-up z-10">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Mandatory Policies & Info
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Official QuickPhysio24.com Healthcare Disclosures
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Policy Items List */}
            <div className="mt-3 space-y-1.5">
              {ITEMS.map((item) => {
                const isActive = item.slug === activeSlug || (item.slug === 'privacy' && activeSlug === 'privacy-policy');
                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    onClick={() => setIsModalOpen(false)}
                    className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-teal-50 border border-teal-200 text-teal-900 shadow-xs'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getIcon(item.iconName, 16)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isActive ? 'text-teal-900' : 'text-slate-900'}`}>
                          {item.label}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <a
                href="tel:9110912544"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                <Phone size={14} className="text-teal-600" />
                <span>Call Helpline</span>
              </a>
              <Link
                href="/apk"
                onClick={() => setIsModalOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs"
              >
                <Download size={14} />
                <span>Download App</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

