import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import AdminNav from '@/app/components/AdminNav';
import Link from 'next/link';
import ProjectsClientTable from './ProjectsClientTable';

export const metadata = {
  title: 'Manage Projects - Admin',
  robots: {
    index: false,
    follow: false,
  }
};

export default async function AdminProjects() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  if (!adminSession?.value) {
    redirect('/admin/login');
  }

  let projects = [];

  try {
    const res = await pool.query('SELECT * FROM projects ORDER BY display_order ASC, created_at DESC');
    projects = res.rows;
  } catch (error) {
    console.error('Failed to fetch projects data:', error);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-100">Monitoring Dashboard</h1>
          <Link href="/admin/projects/new" className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
            + Add New Project
          </Link>
        </header>

        <AdminNav />

        {/* Client table component for handling interactivity (delete, reorder, toggle publish) */}
        <ProjectsClientTable initialProjects={projects} />
      </div>
    </div>
  );
}
