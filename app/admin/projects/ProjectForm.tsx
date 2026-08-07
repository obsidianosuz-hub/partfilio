'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LANGUAGES = ['en', 'ru', 'uz'] as const;
type Lang = typeof LANGUAGES[number];

const initMulti = (val: any) => {
  if (typeof val === 'string') return { en: val, ru: '', uz: '' };
  if (val && typeof val === 'object') return { en: val.en || '', ru: val.ru || '', uz: val.uz || '' };
  return { en: '', ru: '', uz: '' };
};

const initMultiList = (val: any) => {
  if (Array.isArray(val)) {
    if (val.length > 0 && typeof val[0] === 'string') return { en: val, ru: [], uz: [] };
    return { en: [], ru: [], uz: [] };
  }
  if (val && typeof val === 'object') {
    return { en: val.en || [], ru: val.ru || [], uz: val.uz || [] };
  }
  return { en: [], ru: [], uz: [] };
};

export default function ProjectForm({ initialData = {}, isEdit = false }: { initialData?: any, isEdit?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Lang>('en');

  const [formData, setFormData] = useState({
    title: initMulti(initialData.title),
    role: initMulti(initialData.role),
    context: initMulti(initialData.context),
    start_date: initialData.start_date || '',
    duration: initialData.duration || '',
    status: initialData.status || '',
    team_size: initialData.team_size || '',
    responsibilities: initMulti(initialData.responsibilities),
    problem_statement: initMulti(initialData.problem_statement),
    solution_overview: initMulti(initialData.solution_overview),
    architecture_decisions: initMulti(initialData.architecture_decisions),
    business_impact: initMulti(initialData.business_impact),
    live_url: initialData.live_url || '',
    repo_url: initialData.repo_url || '',
    is_published: initialData.is_published !== undefined ? initialData.is_published : true,
    display_order: initialData.display_order || 0
  });

  const [metricsKeys, setMetricsKeys] = useState<string[]>(
    initialData.metrics ? Object.keys(initialData.metrics) : []
  );
  const [metricsValues, setMetricsValues] = useState<string[]>(
    initialData.metrics ? Object.values(initialData.metrics) : []
  );

  const [achievements, setAchievements] = useState(initMultiList(initialData.key_achievements));

  const [techStack, setTechStack] = useState<string[]>(
    initialData.tech_stack || []
  );
  const [techInput, setTechInput] = useState('');

  const [images, setImages] = useState<string[]>(
    initialData.images || []
  );
  const [imageInput, setImageInput] = useState('');

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMultiChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...(prev as any)[name],
        [activeTab]: value
      }
    }));
  };

  const handleAddMetric = () => {
    setMetricsKeys([...metricsKeys, '']);
    setMetricsValues([...metricsValues, '']);
  };
  
  const handleMetricChange = (index: number, key: string, val: string) => {
    const newKeys = [...metricsKeys];
    const newVals = [...metricsValues];
    newKeys[index] = key;
    newVals[index] = val;
    setMetricsKeys(newKeys);
    setMetricsValues(newVals);
  };

  const handleRemoveMetric = (index: number) => {
    setMetricsKeys(metricsKeys.filter((_, i) => i !== index));
    setMetricsValues(metricsValues.filter((_, i) => i !== index));
  };

  const handleAddAchievement = () => {
    setAchievements(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], '']
    }));
  };

  const handleAchievementChange = (index: number, val: string) => {
    const newArr = [...achievements[activeTab]];
    newArr[index] = val;
    setAchievements(prev => ({ ...prev, [activeTab]: newArr }));
  };

  const handleRemoveAchievement = (index: number) => {
    setAchievements(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleTechKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (techInput.trim() && !techStack.includes(techInput.trim())) {
        setTechStack([...techStack, techInput.trim()]);
        setTechInput('');
      }
    }
  };

  const handleRemoveTech = (tag: string) => {
    setTechStack(techStack.filter(t => t !== tag));
  };

  const handleImageKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (imageInput.trim() && !images.includes(imageInput.trim())) {
        setImages([...images, imageInput.trim()]);
        setImageInput('');
      }
    }
  };

  const handleRemoveImage = (img: string) => {
    setImages(images.filter(i => i !== img));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const metricsObj: Record<string, string> = {};
    metricsKeys.forEach((key, index) => {
      if (key.trim() && metricsValues[index].trim()) {
        metricsObj[key.trim()] = metricsValues[index].trim();
      }
    });

    const cleanAchievements = {
      en: achievements.en.filter((a: string) => a.trim() !== ''),
      ru: achievements.ru.filter((a: string) => a.trim() !== ''),
      uz: achievements.uz.filter((a: string) => a.trim() !== ''),
    };

    const payload = {
      ...formData,
      metrics: metricsObj,
      key_achievements: cleanAchievements,
      tech_stack: techStack,
      images: images
    };

    try {
      const url = isEdit ? `/api/admin/projects/${initialData.id}` : '/api/admin/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save project');
      
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error saving project');
      setLoading(false);
    }
  };

  const LabelIndicator = ({ field }: { field: keyof typeof formData }) => {
    const data = formData[field] as any;
    if (typeof data !== 'object') return null;
    const isEn = !!data.en;
    const isRu = !!data.ru;
    const isUz = !!data.uz;
    const allFilled = isEn && isRu && isUz;
    
    return (
      <span className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${allFilled ? 'bg-green-500' : 'bg-amber-500'}`} title={allFilled ? "All translations present" : "Missing translations"} />
      </span>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg sticky top-0 z-10 border-b border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold">{isEdit ? 'Edit Project' : 'New Project'}</h2>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="is_published" 
              checked={formData.is_published}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-500 bg-slate-900 border-slate-700 rounded"
            />
            <span className="text-sm">Published</span>
          </label>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-6 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-700">
        {LANGUAGES.map(l => (
          <button
            key={l}
            type="button"
            onClick={() => setActiveTab(l)}
            className={`px-6 py-3 uppercase font-medium transition-colors ${
              activeTab === l 
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-800/50' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 flex items-center justify-between">
            Title
            <LabelIndicator field="title" />
          </label>
          <input 
            type="text" 
            name="title" 
            value={formData.title[activeTab]} 
            onChange={handleMultiChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
            required={activeTab === 'en'}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 flex items-center justify-between">
            Role
            <LabelIndicator field="role" />
          </label>
          <input 
            type="text" 
            name="role" 
            value={formData.role[activeTab]} 
            onChange={handleMultiChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
            required={activeTab === 'en'}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 flex items-center justify-between">
            Context
            <LabelIndicator field="context" />
          </label>
          <input 
            type="text" 
            name="context" 
            value={formData.context[activeTab]} 
            onChange={handleMultiChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Status (Non-localized)</label>
          <input 
            type="text" 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
            placeholder="e.g. 50M+ Daily Requests"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Team Size (Non-localized)</label>
          <input 
            type="text" 
            name="team_size" 
            value={formData.team_size} 
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
            placeholder="e.g. Team of 12"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Display Order</label>
          <input 
            type="number" 
            name="display_order" 
            value={formData.display_order} 
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-700/50">
        <h3 className="text-lg font-semibold text-cyan-400">Detailed Descriptions</h3>
        
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 flex items-center justify-between">
            Solution Overview
            <LabelIndicator field="solution_overview" />
          </label>
          <textarea 
            name="solution_overview" 
            value={formData.solution_overview[activeTab]} 
            onChange={handleMultiChange}
            rows={4}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 flex items-center justify-between">
            Problem Statement
            <LabelIndicator field="problem_statement" />
          </label>
          <textarea 
            name="problem_statement" 
            value={formData.problem_statement[activeTab]} 
            onChange={handleMultiChange}
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 flex items-center justify-between">
            Architecture Decisions
            <LabelIndicator field="architecture_decisions" />
          </label>
          <textarea 
            name="architecture_decisions" 
            value={formData.architecture_decisions[activeTab]} 
            onChange={handleMultiChange}
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-700/50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-cyan-400">Key Achievements</h3>
          <button 
            type="button" 
            onClick={handleAddAchievement}
            className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
          >
            + Add Achievement
          </button>
        </div>
        {achievements[activeTab].map((ach: string, idx: number) => (
          <div key={idx} className="flex gap-2">
            <input 
              type="text" 
              value={ach}
              onChange={(e) => handleAchievementChange(idx, e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
              placeholder="e.g. Increased throughput from 10K to 50M requests/day"
            />
            <button 
              type="button" 
              onClick={() => handleRemoveAchievement(idx)}
              className="text-pink-500 hover:text-pink-400 p-2"
            >
              ✕
            </button>
          </div>
        ))}
        {achievements[activeTab].length === 0 && (
          <p className="text-slate-500 text-sm italic">No achievements added for this language yet.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-700/50">
        {/* URLs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400">Links</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Live URL (Non-localized)</label>
            <input 
              type="url" 
              name="live_url" 
              value={formData.live_url} 
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Repository URL (Non-localized)</label>
            <input 
              type="url" 
              name="repo_url" 
              value={formData.repo_url} 
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400">Tech Stack (Non-localized)</h3>
          <div>
            <input 
              type="text" 
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
              placeholder="Type technology and press Enter"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map(tag => (
              <span key={tag} className="bg-slate-700 text-cyan-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {tag}
                <button type="button" onClick={() => handleRemoveTech(tag)} className="text-slate-400 hover:text-white">✕</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700/50">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Project Gallery Images (URLs)</h3>
        <div>
          <input 
            type="text" 
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            onKeyDown={handleImageKeyDown}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 mb-4"
            placeholder="Paste image URL and press Enter (e.g. /projects/gym/1.png)"
          />
        </div>
        <div className="flex flex-col gap-2">
          {images.map(img => (
            <div key={img} className="bg-slate-700 px-4 py-2 rounded-lg text-sm flex items-center justify-between">
              <span className="text-slate-300 break-all">{img}</span>
              <button type="button" onClick={() => handleRemoveImage(img)} className="text-pink-500 hover:text-pink-400 font-bold px-2">✕</button>
            </div>
          ))}
          {images.length === 0 && (
            <p className="text-slate-500 text-sm italic">No images added. Public page will only show text.</p>
          )}
        </div>
      </div>
    </form>
  );
}
