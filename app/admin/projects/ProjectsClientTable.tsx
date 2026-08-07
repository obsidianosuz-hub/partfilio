'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProjectsClientTable({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const router = useRouter();

  const handleTogglePublish = async (project: any) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, is_published: !project.is_published })
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map(p => p.id === updated.id ? updated : p));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete project');
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === projects.length - 1) return;

    const newProjects = [...projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the display order values
    const tempOrder = newProjects[index].display_order;
    newProjects[index].display_order = newProjects[targetIndex].display_order;
    newProjects[targetIndex].display_order = tempOrder;

    // Swap elements in array for optimistic UI
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    setProjects(newProjects);

    // Call API for both
    await fetch(`/api/admin/projects/${newProjects[index].id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ display_order: newProjects[index].display_order })
    });
    
    await fetch(`/api/admin/projects/${newProjects[targetIndex].id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ display_order: newProjects[targetIndex].display_order })
    });
    
    router.refresh();
  };

  return (
    <div className="glass-card overflow-hidden p-0 border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/50 border-b border-slate-800 text-slate-300">
            <tr>
              <th className="px-6 py-4 font-semibold w-16">Order</th>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project, index) => {
                const titleStr = typeof project.title === 'string' ? project.title : (project.title?.en || 'Untitled');
                const roleStr = typeof project.role === 'string' ? project.role : (project.role?.en || 'Unknown Role');
                
                return (
                <tr key={project.id} className={`hover:bg-slate-800/30 transition-colors ${!project.is_published ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-center justify-center">
                      <button 
                        onClick={() => handleReorder(index, 'up')}
                        disabled={index === 0}
                        className="text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-400"
                      >
                        ▲
                      </button>
                      <button 
                        onClick={() => handleReorder(index, 'down')}
                        disabled={index === projects.length - 1}
                        className="text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-400"
                      >
                        ▼
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-200">{titleStr}</div>
                    <div className="text-xs text-slate-500 mt-1">Last updated: {new Date(project.updated_at).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{roleStr}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleTogglePublish(project)}
                      className={`px-2 py-1 text-xs rounded-full border ${project.is_published ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700/50 text-slate-400 border-slate-600'}`}
                    >
                      {project.is_published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link 
                        href={`/admin/projects/${project.id}`} 
                        className="text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="text-pink-500 hover:text-pink-400 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )})
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
