import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import AdminNav from '@/app/components/AdminNav';
import ProjectForm from '../ProjectForm';

export const metadata = { title: 'Edit Project - Admin' };

export default async function EditProjectPage(context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  if (!adminSession?.value) {
    redirect('/admin/login');
  }

  let project = null;

  try {
    const res = await pool.query('SELECT * FROM projects WHERE id = $1', [params.id]);
    if (res.rows.length > 0) {
      project = res.rows[0];
    }
  } catch (error) {
    console.error('Failed to fetch project:', error);
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <header className="mb-6">
            <AdminNav />
          </header>
          <div className="glass-card p-6 text-center text-slate-400">Project not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">CMS Dashboard</h1>
          <AdminNav />
        </header>

        <ProjectForm initialData={project} isEdit={true} />
      </div>
    </div>
  );
}
