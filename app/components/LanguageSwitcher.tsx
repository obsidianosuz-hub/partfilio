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
    <div className="lang-switcher">
      {['en', 'ru', 'uz'].map((l) => (
        <button
          key={l}
          onClick={() => handleLanguageChange(l)}
          className={`lang-btn ${locale === l ? 'active' : ''}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
