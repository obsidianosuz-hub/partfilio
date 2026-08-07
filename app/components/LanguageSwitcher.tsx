'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-4 text-sm font-semibold items-center bg-slate-900/50 px-3 py-2 rounded-full border border-white/10 shadow-inner">
      {['en', 'ru', 'uz'].map((l) => (
        <button
          key={l}
          onClick={() => handleLanguageChange(l)}
          className={`transition-all uppercase tracking-wider px-2 py-1 rounded-md ${
            locale === l 
              ? 'text-cyan-400 bg-slate-800 shadow-sm font-bold' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
