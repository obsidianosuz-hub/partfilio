import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '700', '800']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500']
});

export const metadata: Metadata = {
  title: 'Shohjaxon Hakimov | Senior Full-Stack Developer',
  description: 'Portfolio of Shohjaxon Hakimov, Senior Full-Stack Developer and Systems Architect building resilient, high-throughput systems that scale.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${outfit.variable} ${jetbrainsMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
