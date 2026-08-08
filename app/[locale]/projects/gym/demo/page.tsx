'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';

export default function GymDemoPage() {
    const [activeTab, setActiveTab] = useState('Bosh Sahifa');
    const [isGated, setIsGated] = useState(true);
    const [googleFlowStep, setGoogleFlowStep] = useState(0); // 0: button, 1: enter email, 2: connecting
    const [guestEmail, setGuestEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const startGoogleAuth = () => {
        setGoogleFlowStep(1);
    };

    const handleGoogleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        
        // Gmail validation
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
        
        if (!guestEmail.match(gmailRegex)) {
            setEmailError("Kechirasiz, kompyuteringizdagi haqiqiy Google (@gmail.com) hisobingizni kiriting.");
            return;
        }

        setGoogleFlowStep(2);
        
        // Simulate Google Auth Delay
        setTimeout(() => {
            setIsGated(false);
        }, 1500);
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
                <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-10 sm:p-14 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-xl mx-4">
                    <button onClick={() => window.history.back()} className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 group">
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        <span className="text-sm font-medium">Orqaga</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400/20 to-purple-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center mb-6 shadow-inner transform -rotate-3 hover:rotate-0 transition-transform">
                            <svg className="w-12 h-12 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        
                        <h2 className="text-4xl font-black text-white mb-3 tracking-tight">DEMO REJIM</h2>
                        <p className="text-gray-300 mb-10 text-base text-center">Xavfsizlikni ta'minlash uchun tizimga Google orqali kiring</p>
                        
                        <div className="w-full">
                            {googleFlowStep === 0 && (
                                <button onClick={startGoogleAuth} className="w-full py-5 px-6 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xl rounded-md shadow-lg transition-all flex items-center justify-center gap-4">
                                    <svg className="w-8 h-8" viewBox="0 0 48 48">
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"></path>
                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                    </svg>
                                    <span>Google orqali kirish</span>
                                </button>
                            )}

                            {googleFlowStep === 1 && (
                                <form onSubmit={handleGoogleEmailSubmit} className="w-full animate-fade-in text-left">
                                    <div className="bg-white rounded-md p-6 shadow-xl relative">
                                        <div className="flex justify-center mb-4">
                                            <svg className="w-10 h-10" viewBox="0 0 48 48">
                                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"></path>
                                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-center text-xl text-gray-900 mb-1">Kirish</h3>
                                        <p className="text-center text-sm text-gray-600 mb-6">Google hisobingizdan foydalaning</p>
                                        
                                        <div className="relative mb-2 flex justify-center">
                                            <input 
                                                autoFocus
                                                value={guestEmail}
                                                onChange={(e) => { setGuestEmail(e.target.value); setEmailError(''); }}
                                                type="email" 
                                                required
                                                placeholder="Email yoki telefon"
                                                className={`w-3/4 px-4 py-3 bg-white border ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'} rounded-sm text-gray-900 text-md focus:outline-none focus:ring-2 transition-all`} 
                                            />
                                        </div>
                                        {emailError && (
                                            <p className="text-red-600 text-xs mt-1 mb-4 flex justify-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                {emailError}
                                            </p>
                                        )}

                                        <div className="mt-8 flex justify-between items-center px-6">
                                            <button type="button" onClick={() => setGoogleFlowStep(0)} className="text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-sm text-sm font-medium transition-colors">
                                                Orqaga
                                            </button>
                                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm text-sm font-medium transition-colors">
                                                Keyingisi
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {googleFlowStep === 2 && (
                                <div className="w-full bg-white rounded-md p-8 shadow-xl flex flex-col items-center justify-center animate-fade-in min-h-[250px]">
                                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                                    <p className="text-gray-700 font-medium text-lg text-center">Google bilan bog'lanmoqda...</p>
                                    <p className="text-gray-500 text-sm text-center mt-2">Tasdiqlanmoqda: {guestEmail}</p>
                                </div>
                            )}
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
                    <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">Umumiy Statistika</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        {/* Stat Cards */}
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:bg-white/10 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                                <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                            </div>
                            <h3 className="text-slate-300 text-sm font-medium mb-2 relative z-10">Jami Mijozlar</h3>
                            <p className="text-4xl font-bold text-white relative z-10 drop-shadow-sm">1,240</p>
                            <p className="text-emerald-400 text-sm mt-2 relative z-10 flex items-center gap-1 font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                +12% o'tgan oydan
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:bg-white/10 transition-colors">
                            <h3 className="text-slate-300 text-sm font-medium mb-2 relative z-10">Bugungi Tashriflar</h3>
                            <p className="text-4xl font-bold text-white relative z-10 drop-shadow-sm">142</p>
                            <p className="text-emerald-400 text-sm mt-2 relative z-10 flex items-center gap-1 font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                +5% o'tgan oydan
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:bg-white/10 transition-colors">
                            <h3 className="text-slate-300 text-sm font-medium mb-2 relative z-10">BAR Savdosi</h3>
                            <p className="text-4xl font-bold text-white relative z-10 drop-shadow-sm">3.4M so'm</p>
                            <p className="text-emerald-400 text-sm mt-2 relative z-10 flex items-center gap-1 font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                +18% o'tgan oydan
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:bg-white/10 transition-colors">
                            <h3 className="text-slate-300 text-sm font-medium mb-2 relative z-10">Ombor Xarajatlari</h3>
                            <p className="text-4xl font-bold text-white relative z-10 drop-shadow-sm">1.2M so'm</p>
                            <p className="text-red-400 text-sm mt-2 relative z-10 flex items-center gap-1 font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                -4% o'tgan oydan
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Oylik O'sish Statistikasi</h3>
                                    <p className="text-slate-300 text-sm">Tashriflar statistikasi va faollik</p>
                                </div>
                                <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors border border-white/10 shadow-sm">Batafsil</button>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                                {/* Fake Bar Chart */}
                                {[40, 60, 50, 80, 65, 85, 95, 95, 75, 90].map((h, i) => (
                                    <div key={i} className="w-full bg-black/20 rounded-t-xl relative group h-full flex flex-col justify-end overflow-hidden border border-white/5">
                                        <div 
                                            className="w-full bg-gradient-to-t from-cyan-600 to-blue-400 rounded-t-xl transition-all duration-1000 group-hover:from-cyan-500 group-hover:to-blue-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs font-medium text-slate-400 border-t border-white/10 pt-4 px-2">
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
                        
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                            <h3 className="text-xl font-bold text-white mb-6">Oxirgi Xaridlar (BAR)</h3>
                            <div className="flex flex-col gap-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-semibold">Protein Cocktail</p>
                                                <p className="text-slate-400 text-xs mt-1">{2 * i} daqiqa oldin</p>
                                            </div>
                                        </div>
                                        <div className="text-pink-400 text-sm font-black">+25,000</div>
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
                        <h1 className="text-3xl font-bold text-white drop-shadow-md">Mijozlar va Tashriflar</h1>
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] border border-white/10">+ Yangi Mijoz</button>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col h-[calc(100%-80px)]">
                        <div className="p-6 border-b border-white/10 bg-black/20 shrink-0">
                            <div className="relative w-full max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="text" className="w-full bg-black/40 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-slate-400 transition-all shadow-inner" placeholder="Ism yoki telefon orqali qidirish..." />
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-black/40 text-slate-300 text-xs uppercase tracking-wider font-bold">
                                        <th className="p-5 pl-8">F.I.O</th>
                                        <th className="p-5">Telefon</th>
                                        <th className="p-5">Obuna Turi</th>
                                        <th className="p-5">Obuna Tugashi</th>
                                        <th className="p-5">Treyner</th>
                                        <th className="p-5 pr-8 text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 bg-transparent">
                                    {[
                                        { initial: 'A', name: 'Asilbek Rahmonov', phone: '+998 99 130 30 33', type: 'VIP', date: '2026-09-07', color: 'from-indigo-500 to-purple-500', pill: 'text-yellow-300 border-yellow-400/50 bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.3)]' },
                                        { initial: 'S', name: 'Sardor Qodirov', phone: '+998 98 158 26 25', type: 'VIP', date: '2030-02-05', color: 'from-blue-500 to-cyan-500', pill: 'text-yellow-300 border-yellow-400/50 bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.3)]' },
                                        { initial: 'T', name: 'Test Client', phone: '+998 90 123 45 67', type: 'ODDIY', date: '—', color: 'from-purple-500 to-pink-500', pill: 'text-blue-300 border-blue-400/50 bg-blue-400/20' },
                                        { initial: 'J', name: 'Jahongir To\'xtayev', phone: '+998 93 456 78 90', type: 'ODDIY', date: '2024-11-20', color: 'from-emerald-500 to-teal-500', pill: 'text-blue-300 border-blue-400/50 bg-blue-400/20' },
                                        { initial: 'S', name: 'Shohruh M.', phone: '+998 97 111 22 33', type: 'VIP', date: '2025-01-10', color: 'from-orange-500 to-red-500', pill: 'text-yellow-300 border-yellow-400/50 bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.3)]' },
                                    ].map((user, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-5 pl-8">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold text-lg shadow-lg border border-white/20`}>{user.initial}</div>
                                                    <span className="text-white font-bold text-md">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-5 text-slate-300 font-medium">{user.phone}</td>
                                            <td className="p-5">
                                                <span className={`px-4 py-1.5 text-xs font-black rounded-full border ${user.pill}`}>{user.type}</span>
                                            </td>
                                            <td className="p-5 text-slate-300">{user.date}</td>
                                            <td className="p-5 text-slate-500">—</td>
                                            <td className="p-5 pr-8 text-right">
                                                <button className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] px-5 py-2 rounded-xl text-sm font-bold transition-all mr-2">Tashrif yozish</button>
                                                <button className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/30 px-3 py-2 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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
        } else if (activeTab === 'Kassa') {
            return (
                <div className="p-4 md:p-8 animate-fade-in w-full h-full overflow-y-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-white drop-shadow-md">Kassa va To'lovlar</h1>
                        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-white/10">+ Yangi To'lov</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/5 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(16,185,129,0.15)] hover:bg-white/10 transition-colors">
                            <h3 className="text-emerald-300 text-sm font-bold mb-2">Naqd pul tushumi</h3>
                            <p className="text-4xl font-black text-white drop-shadow-sm">4,250,000 <span className="text-xl text-emerald-400">UZS</span></p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:bg-white/10 transition-colors">
                            <h3 className="text-blue-300 text-sm font-bold mb-2">Plastik karta (Click/Payme)</h3>
                            <p className="text-4xl font-black text-white drop-shadow-sm">8,100,000 <span className="text-xl text-blue-400">UZS</span></p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-[0_8px_32px_rgba(168,85,247,0.15)] hover:bg-white/10 transition-colors">
                            <h3 className="text-purple-300 text-sm font-bold mb-2">Jami kunlik tushum</h3>
                            <p className="text-4xl font-black text-white drop-shadow-sm">12,350,000 <span className="text-xl text-purple-400">UZS</span></p>
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
                        <div className="p-6 border-b border-white/10 bg-black/20">
                            <h2 className="text-xl font-bold text-white">Oxirgi To'lovlar</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/40 text-slate-300 text-xs uppercase tracking-wider font-bold">
                                        <th className="p-5 pl-8">Sana / Vaqt</th>
                                        <th className="p-5">To'lovchi</th>
                                        <th className="p-5">To'lov Turi</th>
                                        <th className="p-5">Summa</th>
                                        <th className="p-5 pr-8 text-right">Amal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="p-5 pl-8 text-slate-300 font-medium">Bugun {10 + i}:15</td>
                                            <td className="p-5 text-white font-bold">Mijoz #{1000 + i}</td>
                                            <td className="p-5">
                                                <span className={`px-4 py-1.5 text-xs font-black rounded-full border ${i % 2 === 0 ? 'text-blue-300 border-blue-400/50 bg-blue-400/20' : 'text-emerald-300 border-emerald-400/50 bg-emerald-400/20'}`}>{i % 2 === 0 ? 'Click' : 'Naqd'}</span>
                                            </td>
                                            <td className="p-5 text-white font-black text-lg">{350000 + (i * 50000)} UZS</td>
                                            <td className="p-5 pr-8 text-right">
                                                <button className="text-white hover:text-white bg-white/10 hover:bg-white/20 font-bold border border-white/20 px-4 py-2 rounded-xl transition-all shadow-sm">Chekni ko'rish</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else if (activeTab === 'BAR') {
            return (
                <div className="p-4 md:p-8 animate-fade-in w-full h-full overflow-y-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-white drop-shadow-md">Fit-Bar Mahsulotlari</h1>
                        <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2 border border-white/10">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            Sotish (0)
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                            { name: 'Protein Cocktail', price: '25,000 UZS', stock: 45, color: 'from-blue-500 to-cyan-500' },
                            { name: 'RedBull Energy', price: '18,000 UZS', stock: 24, color: 'from-red-500 to-orange-500' },
                            { name: 'Mineral Suv 0.5', price: '4,000 UZS', stock: 120, color: 'from-cyan-400 to-blue-500' },
                            { name: 'Snickers Batochik', price: '12,000 UZS', stock: 15, color: 'from-orange-500 to-yellow-500' },
                            { name: 'BCAA Drink', price: '20,000 UZS', stock: 8, color: 'from-purple-500 to-pink-500' },
                            { name: 'L-Carnitine', price: '22,000 UZS', stock: 30, color: 'from-pink-500 to-rose-500' },
                            { name: 'Banan', price: '5,000 UZS', stock: 50, color: 'from-yellow-400 to-orange-400' },
                            { name: 'Kofe (Americano)', price: '15,000 UZS', stock: 99, color: 'from-amber-700 to-orange-800' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                                <div className={`w-full h-40 rounded-2xl bg-gradient-to-br ${item.color} opacity-80 flex items-center justify-center mb-6 relative overflow-hidden shadow-inner group-hover:opacity-100 transition-opacity`}>
                                    <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center font-black text-3xl shadow-lg border border-white/30 relative z-10">{item.name.charAt(0)}</div>
                                </div>
                                <h3 className="text-white font-bold mb-1 text-xl drop-shadow-md">{item.name}</h3>
                                <p className="text-white/80 font-black mb-6 text-lg">{item.price}</p>
                                <div className="mt-auto flex justify-between items-center border-t border-white/10 pt-4">
                                    <span className="text-slate-300 font-medium">Qoldiq: <span className="text-white font-bold bg-black/30 px-2 py-1 rounded-md ml-1">{item.stock}</span></span>
                                    <button className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black font-black transition-all border border-white/20 shadow-sm">
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === 'Ombor') {
            return (
                <div className="p-4 md:p-8 animate-fade-in w-full h-full overflow-y-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-white drop-shadow-md">Ombor (Zaxira)</h1>
                        <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 border border-white/10">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            Kirim qilish
                        </button>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-black/40 text-slate-300 text-xs uppercase tracking-wider font-bold">
                                        <th className="p-5 pl-8">Mahsulot nomi</th>
                                        <th className="p-5">Kategoriya</th>
                                        <th className="p-5">Sotuv Narxi</th>
                                        <th className="p-5">Ombordagi qoldiq</th>
                                        <th className="p-5 pr-8 text-right">Holati</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {[
                                        { name: 'Protein (Optimum Nutrition)', cat: 'Sport oziqa', price: '25,000 UZS', stock: 45, status: 'Yaxshi', sColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/50' },
                                        { name: 'BCAA (Xtend)', cat: 'Sport oziqa', price: '20,000 UZS', stock: 8, status: 'Tugamoqda', sColor: 'text-orange-300 bg-orange-500/20 border-orange-400/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]' },
                                        { name: 'Mineral suv (Nestle)', cat: 'Ichimlik', price: '4,000 UZS', stock: 120, status: 'Yaxshi', sColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/50' },
                                        { name: 'L-Carnitine', cat: 'Energetik', price: '22,000 UZS', stock: 0, status: 'Tugagan', sColor: 'text-red-300 bg-red-500/20 border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' },
                                        { name: 'Snickers Batochik', cat: 'Shirinlik', price: '12,000 UZS', stock: 15, status: 'O\'rtacha', sColor: 'text-blue-300 bg-blue-500/20 border-blue-400/50' },
                                    ].map((item, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="p-5 pl-8 text-white font-bold text-lg">{item.name}</td>
                                            <td className="p-5 text-slate-300 font-medium">{item.cat}</td>
                                            <td className="p-5 text-white/90 font-bold">{item.price}</td>
                                            <td className="p-5 text-white font-black text-xl">{item.stock} <span className="text-sm font-medium text-slate-400">ta</span></td>
                                            <td className="p-5 pr-8 text-right">
                                                <span className={`px-4 py-2 text-xs font-black rounded-xl border ${item.sColor}`}>{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else if (activeTab === 'NFC Qurilmalari') {
            return (
                <div className="p-4 md:p-8 animate-fade-in w-full h-full overflow-y-auto">
                    <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">NFC va Turniketlar</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'Asosiy Eshik Turniketi', ip: '192.168.1.101', status: 'Aktiv', color: 'bg-emerald-400' },
                            { name: 'VIP Zona Skaneri', ip: '192.168.1.102', status: 'Aktiv', color: 'bg-emerald-400' },
                            { name: 'Ayollar Kiyinish Xonasi', ip: '192.168.1.103', status: 'Aktiv', color: 'bg-emerald-400' },
                            { name: 'Erkaklar Kiyinish Xonasi', ip: '192.168.1.104', status: 'Oflayn', color: 'bg-red-500' },
                            { name: 'BAR NFC Skaneri', ip: 'USB (COM3)', status: 'Aktiv', color: 'bg-emerald-400' }
                        ].map((dev, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:bg-white/10 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner backdrop-blur-md">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full border text-sm font-black flex items-center gap-2 ${dev.status === 'Aktiv' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-red-500/20 text-red-300 border-red-400/50'}`}>
                                        <div className={`w-3 h-3 rounded-full ${dev.color} ${dev.status === 'Aktiv' ? 'animate-pulse shadow-[0_0_10px_currentColor]' : ''}`}></div>
                                        {dev.status}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 relative z-10 drop-shadow-sm">{dev.name}</h3>
                                <p className="text-white/70 text-sm font-mono bg-black/30 inline-block px-4 py-2 rounded-lg border border-white/10 mb-8 relative z-10 shadow-inner">{dev.ip}</p>
                                <div className="mt-2 flex gap-4 relative z-10">
                                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold transition-colors border border-white/20 shadow-sm">Sozlash</button>
                                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border border-white/10 py-3 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">Qayta yoqish</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (activeTab === 'Sozlamalar') {
            return (
                <div className="p-4 md:p-8 animate-fade-in w-full h-full overflow-y-auto">
                    <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">Tizim Sozlamalari</h1>
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-w-4xl overflow-hidden">
                        <div className="p-8 border-b border-white/10 bg-black/20 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center border border-white/20 shadow-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm">Sport Zal Ma'lumotlari</h2>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-slate-300 text-sm font-bold mb-3">Zal Nomi</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-lg shadow-inner" value="Titan Gym Center" readOnly />
                                </div>
                                <div>
                                    <label className="block text-slate-300 text-sm font-bold mb-3">Telefon Raqam</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-lg shadow-inner" value="+998 90 123 45 67" readOnly />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-slate-300 text-sm font-bold mb-3">Manzil</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all font-bold text-lg shadow-inner" value="Samarqand shahar, Amir Temur ko'chasi 14-uy" readOnly />
                                </div>
                            </div>
                            
                            <div className="pt-8 border-t border-white/10">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-sm">
                                    <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                                        <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                                    </div>
                                    Interfeys Sozlamalari
                                </h3>
                                <div className="flex items-center justify-between p-6 bg-black/30 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer shadow-inner">
                                    <div>
                                        <p className="text-white font-bold text-lg">Tungi rejim (Dark Mode)</p>
                                        <p className="text-slate-400 text-sm mt-1 font-medium">Tizim doimiy qorong'i ranglarda ishlaydi (Ko'zni toliqtirmaydi)</p>
                                    </div>
                                    <div className="w-16 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full relative shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all border border-white/20">
                                        <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-12 py-4 rounded-2xl font-black text-lg transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] border border-white/20">Saqlash</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };



    return (
        <div className="h-screen w-full bg-[#030308] flex flex-col overflow-hidden font-sans text-slate-300 relative">
            {/* Ultra Premium Glassmorphism Ambient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-cyan-900/20 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute top-[40%] left-[40%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
                {/* Noise texture overlay for that premium apple-like glass feel */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            {/* Top Browser Bar (Portfolio Shell) - Glass */}
            <div className="h-16 bg-white/5 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-6 shrink-0 relative z-20 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[0_0_10px_rgba(234,179,8,0.6)]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                    </div>
                </div>
                
                <div className="bg-black/40 backdrop-blur-md px-40 py-2.5 rounded-xl text-slate-300 text-sm font-medium border border-white/10 flex items-center gap-3 shadow-inner">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    sportzal-app.uz/dashboard
                </div>

                <div>
                    <Link href="/projects/gym" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Loyihaga qaytish
                    </Link>
                </div>
            </div>

            {/* Fake App Layout */}
            <div className="flex-1 flex overflow-hidden relative z-10 p-4 gap-4">
                {/* SPORT ZAL Sidebar - Glass */}
                <div className="w-72 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shrink-0 flex flex-col gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
                    {/* Subtle sidebar glow */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-center py-6 mb-4 tracking-widest drop-shadow-md">
                        SPORT ZAL
                    </div>
                    
                    <div className="mb-6">
                        <div className="bg-black/30 border border-white/10 rounded-xl p-3.5 text-sm font-bold text-white flex justify-between items-center cursor-pointer hover:bg-black/50 transition-colors shadow-inner">
                            <span>Barcha rollar</span>
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left px-5 py-4 rounded-2xl text-md font-bold transition-all flex items-center gap-4 ${
                                    activeTab === item.id 
                                        ? 'bg-white/15 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] translate-x-1' 
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                                }`}
                            >
                                <svg className={`w-6 h-6 ${activeTab === item.id ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                                </svg>
                                {item.id}
                            </button>
                        ))}
                    </div>

                    {/* Profile Section */}
                    <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                        <div className="flex items-center gap-4 px-2 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-white/20">A</div>
                            <div>
                                <p className="text-white text-md font-bold drop-shadow-sm">Asosiy Admin</p>
                                <p className="text-cyan-400 text-xs font-black tracking-widest uppercase mt-1">Administrator</p>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/60 transition-all text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Tizimdan chiqish
                        </button>
                    </div>
                </div>

                {/* Main Content Area - Glass Wrapper */}
                <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    {renderContent()}
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
}
