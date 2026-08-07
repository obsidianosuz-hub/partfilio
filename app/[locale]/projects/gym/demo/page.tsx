'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';

export default function GymDemoPage() {
    const [activeTab, setActiveTab] = useState('Bosh Sahifa');
    const [isGated, setIsGated] = useState(true);
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');

    const unlockDemo = (e: React.FormEvent) => {
        e.preventDefault();
        if (guestName && guestEmail) {
            setIsGated(false);
        }
    };

    if (isGated) {
        return (
            <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center font-sans relative overflow-hidden bg-black">
                {/* Floating Glowing Spheres Background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]"></div>
                    <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-700 shadow-[0_0_60px_rgba(168,85,247,0.7)] blur-[3px] opacity-70" style={{bottom: '20%', right: '10%'}}></div>
                    <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-cyan-300 to-blue-600 shadow-[0_0_50px_rgba(6,182,212,0.7)] blur-[4px] opacity-75" style={{top: '-5%', left: '50%'}}></div>
                </div>

                {/* lock screen form */}
                <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md mx-4">
                    <div className="flex flex-col items-center">
                        {/* Guest / Demo Login */}
                        <div className="w-full flex flex-col text-center">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400/20 to-purple-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-4 shadow-inner transform -rotate-3 hover:rotate-0 transition-transform" style={{ width: '4rem', height: '4rem', margin: '0 auto', marginBottom: '1rem' }}>
                                <svg className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </div>
                            
                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">DEMO REJIM</h2>
                            <p className="text-gray-400 mb-8 text-sm">Mehmon sifatida ko'zdan kechirish</p>
                            
                            <form onSubmit={unlockDemo} className="w-full">
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    <input 
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        type="text" 
                                        placeholder="Ismingiz" 
                                        required
                                        style={{ paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '3rem', paddingRight: '1rem', height: '3.5rem' }}
                                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-500" 
                                    />
                                </div>

                                <div className="relative mb-8">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <input 
                                        value={guestEmail}
                                        onChange={(e) => setGuestEmail(e.target.value)}
                                        type="email" 
                                        placeholder="Email manzilingiz" 
                                        required
                                        style={{ paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '3rem', paddingRight: '1rem', height: '3.5rem' }}
                                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white text-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500" 
                                    />
                                </div>

                                <button type="submit" style={{ height: '3.5rem', paddingTop: '1rem', paddingBottom: '1rem' }} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2">
                                    <span>Ko'zdan kechirish</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const navItems = [
        { id: 'Bosh Sahifa', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'Mijozlar', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'Kassa', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
        { id: 'BAR', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
        { id: 'Ombor', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { id: 'NFC Qurilmalari', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
        { id: 'Sozlamalar', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
    ];

    const renderContent = () => {
        if (activeTab === 'Bosh Sahifa') {
            return (
                <div className="p-4 md:p-8 animate-fade-in w-full h-full overflow-y-auto">
                    <h1 className="text-2xl font-bold text-white mb-6">Umumiy Statistika</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        {/* Stat Cards */}
                        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                                <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                            </div>
                            <h3 className="text-slate-400 text-sm font-medium mb-2 relative z-10">Jami Mijozlar</h3>
                            <p className="text-4xl font-bold text-white relative z-10">1,240</p>
                            <p className="text-emerald-400 text-sm mt-2 relative z-10 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                +12% o'tgan oydan
                            </p>
                        </div>
                        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden group">
                            <h3 className="text-slate-400 text-sm font-medium mb-2 relative z-10">Bugungi Tashriflar</h3>
                            <p className="text-4xl font-bold text-white relative z-10">142</p>
                            <p className="text-emerald-400 text-sm mt-2 relative z-10 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                +5% o'tgan oydan
                            </p>
                        </div>
                        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden group">
                            <h3 className="text-slate-400 text-sm font-medium mb-2 relative z-10">BAR Savdosi</h3>
                            <p className="text-4xl font-bold text-white relative z-10">3.4M so'm</p>
                            <p className="text-emerald-400 text-sm mt-2 relative z-10 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                +18% o'tgan oydan
                            </p>
                        </div>
                        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden group">
                            <h3 className="text-slate-400 text-sm font-medium mb-2 relative z-10">Ombor Xarajatlari</h3>
                            <p className="text-4xl font-bold text-white relative z-10">1.2M so'm</p>
                            <p className="text-red-400 text-sm mt-2 relative z-10 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                -4% o'tgan oydan
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-lg">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Oylik O'sish Statistikasi</h3>
                                    <p className="text-slate-400 text-sm">Tashriflar statistikasi va faollik</p>
                                </div>
                                <button className="bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-600/50">Batafsil</button>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                                {/* Fake Bar Chart */}
                                {[40, 60, 50, 80, 65, 85, 95, 95, 75, 90].map((h, i) => (
                                    <div key={i} className="w-full bg-slate-900/50 rounded-t-lg relative group h-full flex flex-col justify-end">
                                        <div 
                                            className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-1000 group-hover:from-emerald-500 group-hover:to-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs font-medium text-slate-500 border-t border-slate-700/50 pt-4 px-2">
                                <span className="hidden md:inline">Yanvar</span><span className="md:hidden">Yan</span>
                                <span className="hidden md:inline">Fevral</span><span className="md:hidden">Fev</span>
                                <span className="hidden md:inline">Mart</span><span className="md:hidden">Mar</span>
                                <span className="hidden md:inline">Aprel</span><span className="md:hidden">Apr</span>
                                <span className="hidden md:inline">May</span><span className="md:hidden">May</span>
                                <span className="hidden md:inline">Iyun</span><span className="md:hidden">Iyn</span>
                                <span className="hidden md:inline">Iyul</span><span className="md:hidden">Iyl</span>
                                <span className="hidden md:inline">Avgust</span><span className="md:hidden">Avg</span>
                                <span className="hidden md:inline">Sentabr</span><span className="md:hidden">Sen</span>
                                <span className="hidden md:inline">Oktabr</span><span className="md:hidden">Okt</span>
                            </div>
                        </div>
                        
                        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-6">Oxirgi Xaridlar (BAR)</h3>
                            <div className="flex flex-col gap-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-700/50 hover:bg-slate-700/40 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-semibold">Protein Cocktail</p>
                                                <p className="text-slate-400 text-xs mt-0.5">{2 * i} daqiqa oldin</p>
                                            </div>
                                        </div>
                                        <div className="text-emerald-400 text-sm font-black">+25,000</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (activeTab === 'Mijozlar') {
            return (
                <div className="p-4 md:p-8 animate-fade-in w-full h-full overflow-y-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-2xl font-bold text-white">Mijozlar va Tashriflar</h1>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]">+ Yangi Mijoz</button>
                    </div>

                    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-lg overflow-hidden flex flex-col h-[calc(100%-80px)]">
                        <div className="p-6 border-b border-slate-700/50 bg-slate-800/50 shrink-0">
                            <div className="relative w-full max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="text" className="w-full bg-slate-900/80 border border-slate-700/50 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 transition-all" placeholder="Ism yoki telefon orqali qidirish..." />
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-900/60 text-slate-400 text-xs uppercase tracking-wider">
                                        <th className="p-5 pl-8 font-semibold">F.I.O</th>
                                        <th className="p-5 font-semibold">Telefon</th>
                                        <th className="p-5 font-semibold">Obuna Turi</th>
                                        <th className="p-5 font-semibold">Obuna Tugashi</th>
                                        <th className="p-5 font-semibold">Treyner</th>
                                        <th className="p-5 pr-8 font-semibold text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 bg-slate-800/20">
                                    {[
                                        { initial: 'a', name: 'asilbek', phone: '+998 99 130 30 33', type: 'VIP', date: '2026-09-07', color: 'from-indigo-500 to-purple-500', pill: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.2)]' },
                                        { initial: 'A', name: 'Asilbek', phone: '+998 98 158 26 25', type: 'VIP', date: '2030-02-05', color: 'from-blue-500 to-indigo-500', pill: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.2)]' },
                                        { initial: 'T', name: 'Test Client', phone: '+998 90 123 45 67', type: 'ODDIY', date: '—', color: 'from-purple-500 to-pink-500', pill: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
                                        { initial: 'J', name: 'Jahongir', phone: '+998 93 456 78 90', type: 'ODDIY', date: '2024-11-20', color: 'from-emerald-500 to-teal-500', pill: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
                                        { initial: 'S', name: 'Shohruh', phone: '+998 97 111 22 33', type: 'VIP', date: '2025-01-10', color: 'from-orange-500 to-red-500', pill: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.2)]' },
                                    ].map((user, i) => (
                                        <tr key={i} className="hover:bg-slate-700/30 transition-colors group">
                                            <td className="p-5 pl-8">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold shadow-lg shadow-black/20`}>{user.initial}</div>
                                                    <span className="text-white font-semibold">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-slate-300 text-sm font-medium">{user.phone}</td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 text-xs font-black rounded-full border ${user.pill}`}>{user.type}</span>
                                            </td>
                                            <td className="p-5 text-slate-300 text-sm">{user.date}</td>
                                            <td className="p-5 text-slate-500 text-sm">—</td>
                                            <td className="p-5 pr-8 text-right">
                                                <button className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] px-4 py-2 rounded-lg text-sm font-bold transition-all mr-2">Tashrif yozish</button>
                                                <button className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 px-3 py-2 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center text-slate-500 bg-slate-800/40 p-10 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
                        <svg className="w-20 h-20 mx-auto mb-6 opacity-40 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        <h2 className="text-xl font-bold text-slate-300 mb-2">Bu qism ishlamaydi</h2>
                        <p className="text-slate-400 max-w-md mx-auto">Demo versiyasida barcha funksiyalar yopiq. Tizim dizaynini ko'rish uchun <strong>Bosh sahifa</strong> yoki <strong>Mijozlar</strong> bo'limiga o'ting.</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="h-screen w-full bg-[#05050B] flex flex-col overflow-hidden font-sans text-slate-300 relative">
            {/* Background ambient lighting */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Top Browser Bar (Portfolio Shell) */}
            <div className="h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 shrink-0 relative z-20">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                    </div>
                </div>
                
                <div className="bg-slate-950 px-32 py-1.5 rounded-lg text-slate-400 text-sm border border-slate-800/80 flex items-center gap-2 shadow-inner">
                    <span className="text-emerald-400">🔒</span>
                    sportzal-app.uz/dashboard
                </div>

                <div>
                    <Link href="/projects/gym" className="bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-300 hover:text-white text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.1)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        Loyihaga qaytish
                    </Link>
                </div>
            </div>

            {/* Fake App Layout */}
            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* SPORT ZAL Sidebar */}
                <div className="w-64 bg-[#0A0B14] border-r border-slate-800/80 p-4 shrink-0 flex flex-col gap-1 shadow-2xl">
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center py-6 mb-2 tracking-wider">
                        SPORT ZAL
                    </div>
                    
                    <div className="mb-6 px-2">
                        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-400 flex justify-between items-center cursor-pointer hover:border-slate-700 transition-colors">
                            <span>Barcha rollar</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${
                                    activeTab === item.id 
                                        ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/5 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                                }`}
                            >
                                <svg className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                                </svg>
                                {item.id}
                            </button>
                        ))}
                    </div>

                    {/* Profile Section */}
                    <div className="mt-auto pt-4 border-t border-slate-800/80">
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]">A</div>
                            <div>
                                <p className="text-white text-sm font-bold">Asosiy Admin</p>
                                <p className="text-blue-400 text-xs font-bold tracking-wider uppercase mt-0.5">Administrator</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-colors text-sm font-bold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Tizimdan chiqish
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-[#05050B] relative overflow-hidden">
                    {renderContent()}
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
