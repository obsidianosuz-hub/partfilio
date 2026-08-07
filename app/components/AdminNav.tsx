'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Visitors (CRM)' },
    { href: '/admin/projects', label: 'Projects (CMS)' },
  ];

  return (
    <nav className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
      {links.map(link => {
        const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
