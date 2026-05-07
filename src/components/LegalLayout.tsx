'use client';
import React from 'react';
import Link from 'next/link';

export default function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="border-b border-[#1e1e2e] bg-[#0f0f1a]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#6366f1]/20 group-hover:shadow-[#6366f1]/40 transition-shadow">
              <span className="text-white font-bold text-xs tracking-tight">T</span>
            </div>
            <span className="text-base font-bold text-white tracking-tight">TaskBloom</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#64748b] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-[#1a1a2e]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        {/* Title block */}
        <div className="mb-12 sm:mb-16 pb-8 sm:pb-10 border-b border-[#1e1e2e]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-xs text-[#6366f1] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[#64748b]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>Last updated: <span className="text-[#94a3b8] font-medium">{updated}</span></span>
          </div>
        </div>

        {/* Content with enterprise typography */}
        <div className="space-y-6 text-[#cbd5e1] text-[15px] sm:text-base leading-[1.8] sm:leading-[1.85]">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#64748b]">© {new Date().getFullYear()} TaskBloom. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <Link href="/terms" className="px-3 py-1.5 text-xs text-[#64748b] hover:text-white hover:bg-[#1a1a2e] rounded-lg transition-all">Terms</Link>
              <Link href="/privacy" className="px-3 py-1.5 text-xs text-[#64748b] hover:text-white hover:bg-[#1a1a2e] rounded-lg transition-all">Privacy</Link>
              <Link href="/cookies" className="px-3 py-1.5 text-xs text-[#64748b] hover:text-white hover:bg-[#1a1a2e] rounded-lg transition-all">Cookies</Link>
              <Link href="/gdpr" className="px-3 py-1.5 text-xs text-[#64748b] hover:text-white hover:bg-[#1a1a2e] rounded-lg transition-all">GDPR</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom prose styles */}
      <style jsx global>{`
        .legal-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f8fafc;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #1e1e2e;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .legal-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .legal-content p {
          margin-bottom: 1.25rem;
          color: #cbd5e1;
        }
        .legal-content strong {
          color: #f1f5f9;
          font-weight: 600;
        }
        .legal-content a {
          color: #818cf8;
          text-decoration: none;
          transition: color 0.15s;
          border-bottom: 1px solid rgba(129,140,248,0.15);
        }
        .legal-content a:hover {
          color: #a5b4fc;
          border-bottom-color: rgba(165,180,252,0.3);
        }
        .legal-content ul {
          margin: 1rem 0 1.5rem;
          padding: 0;
          list-style: none;
        }
        .legal-content ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.6rem;
          color: #cbd5e1;
          line-height: 1.7;
        }
        .legal-content ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6366f1;
          opacity: 0.6;
        }
        .legal-content .intro-highlight {
          font-size: 1.05rem;
          color: #e2e8f0;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, rgba(99,102,241,0.06), rgba(124,58,237,0.04));
          border-left: 3px solid #6366f1;
          border-radius: 0 12px 12px 0;
          margin-bottom: 2rem;
          line-height: 1.7;
        }
        .legal-content .note-box {
          background: rgba(99,102,241,0.04);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          color: #94a3b8;
        }
        .legal-content .note-box strong {
          color: #cbd5e1;
        }
        .legal-content .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent);
          margin: 2.5rem 0;
        }

        @media (max-width: 640px) {
          .legal-content h2 { font-size: 1.3rem; margin-top: 2rem; }
          .legal-content h3 { font-size: 1rem; }
          .legal-content ul li { padding-left: 1.25rem; }
          .legal-content .intro-highlight { padding: 1rem 1.25rem; font-size: 0.95rem; }
        }
      `}</style>
    </main>
  );
}
