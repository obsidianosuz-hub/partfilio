import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import { Link } from '@/i18n/routing';

export default async function ProjectDetails(props: { params: Promise<{ id: string, locale: string }> }) {
    const params = await props.params;
    
    // Hardcoded project for now (Gym Management System)
    const gymImages = [
        '/projects/gym/media__1785821389171.png',
        '/projects/gym/media__1785821407425.png',
        '/projects/gym/media__1785821417556.png',
        '/projects/gym/media__1785821431159.png',
        '/projects/gym/media__1785821442080.png'
    ];

    return (
        <>
            <nav style={{ background: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' }}>
                <div className="w-full px-6 md:px-12 nav-content">
                    <Link href="/" className="logo" style={{ color: '#ef4444' }}>
                        <div className="logo-dot" style={{ background: '#ef4444', boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)' }}></div>
                        <span>Orqaga</span>
                    </Link>
                    <LanguageSwitcher />
                </div>
            </nav>

            <main className="min-h-screen relative overflow-hidden pt-32 pb-20">
                <div className="global-bg-blobs">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <div className="blob blob-3"></div>
                </div>

                <div className="container relative z-10">
                    <div className="mb-8">
                        <Link href="/" className="text-cyan-600 hover:text-cyan-800 font-bold mb-4 inline-block">&larr; Bosh sahifaga qaytish</Link>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">Sport Zal Boshqaruv Tizimi</h1>
                        <p className="text-xl text-slate-600">Full-Stack Dasturchi</p>
                    </div>

                    <div className="glass-card p-8 mb-12">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Loyiha haqida</h2>
                        <p className="text-slate-600 mb-6">Click integratsiyasi va xodimlar maoshi hisobi bilan to'liq avtomatlashtirilgan sport zal boshqaruv tizimi. Ushbu tizim orqali mijozlarni boshqarish, to'lovlarni qabul qilish va omborni nazorat qilish mumkin.</p>
                        
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Texnologiyalar</h3>
                        <div className="flex gap-2 flex-wrap">
                            {['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Click API'].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium border border-cyan-100">{tech}</span>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Loyiha Rasmlari</h2>
                    <div className="flex flex-col gap-12">
                        {gymImages.map((img, i) => (
                            <div key={i} className="glass-card overflow-hidden rounded-2xl border border-white/60 shadow-xl relative group">
                                <img src={img} alt={`Sport zal skrinshot ${i+1}`} className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
