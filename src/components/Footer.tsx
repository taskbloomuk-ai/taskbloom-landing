'use client';

export default function Footer() {
  const links = {
    Platform: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Campaigns', href: '#campaigns' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Global Reach', href: '#global-reach' },
    ],
    Campaigns: [
      { label: 'Website Traffic', href: '#campaigns' },
      { label: 'YouTube Promotion', href: '#campaigns' },
      { label: 'App Downloads', href: '#campaigns' },
      { label: 'Social Engagement', href: '#campaigns' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  };

  return (
    <footer className="relative border-t border-[#1e1e2e] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#7c3aed] flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-white">TaskBloom</span>
            </div>
            <p className="text-sm text-[#64748b] max-w-xs mb-6 leading-relaxed">
              Global human engagement infrastructure. Real users, real results, worldwide reach.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', '📷', '▶️'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] flex items-center justify-center text-xs text-[#64748b] hover:text-white hover:border-[#6366f1]/50 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-[#64748b] hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-[#1e1e2e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748b]">Stay updated with platform news and campaign insights.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full sm:w-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 bg-[#12121a] border border-[#2a2a3e] rounded-l-xl text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#6366f1]/50 w-full sm:w-60"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white text-sm font-semibold rounded-r-xl hover:from-[#4f46e5] hover:to-[#6d28d9] transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <span>© 2026 TaskBloom. All rights reserved.</span>
          <span>Built for UK businesses reaching the world.</span>
        </div>
      </div>
    </footer>
  );
}
