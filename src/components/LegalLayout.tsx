import React from 'react';
import Link from 'next/link';

export default function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="border-b border-[#1e1e2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#7c3aed] flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="text-base font-bold text-white">TaskBloom</span>
          </Link>
          <Link href="/" className="text-sm text-[#64748b] hover:text-white transition-colors">
            ← Back
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-sm text-[#64748b]">Last updated: {updated}</p>
        </div>

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4 prose-p:text-[#cbd5e1] prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-strong:text-white prose-ul:text-[#cbd5e1] prose-li:text-sm sm:prose-li:text-base prose-li:leading-relaxed prose-a:text-[#6366f1] prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <span>© {new Date().getFullYear()} TaskBloom. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/gdpr" className="hover:text-white transition-colors">GDPR</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
